import os
import cv2
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import os
import gc
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, UpSampling2D, BatchNormalization, Input
import torch
import torch.nn as nn
import torchvision.transforms as torchvision_T
from torchvision.models.segmentation import deeplabv3_resnet50
from torchvision.models.segmentation import deeplabv3_mobilenet_v3_large
app = FastAPI()

# Use the function we refactored earlier
def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    pts = np.array(pts)
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]  # Top-left point
    rect[2] = pts[np.argmax(s)]  # Bottom-right point

    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]  # Top-right point
    rect[3] = pts[np.argmax(diff)]  # Bottom-left point

    return rect.astype("int").tolist()

def find_dest(pts):
    (tl, tr, br, bl) = pts

    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))

    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))

    destination_corners = [[0, 0], [maxWidth, 0], [maxWidth, maxHeight], [0, maxHeight]]
    return order_points(destination_corners)

def image_preproces_transforms(mean=(0.4611, 0.4359, 0.3905), std=(0.2193, 0.2150, 0.2109)):
    common_transforms = torchvision_T.Compose(
        [torchvision_T.ToTensor(), torchvision_T.Normalize(mean, std)]
    )
    return common_transforms

def load_model(num_classes=1, checkpoint_path=None, device=None):
    model = deeplabv3_resnet50(num_classes=num_classes)
    model.to(device)
    checkpoints = torch.load(checkpoint_path, map_location=device)
    model.load_state_dict(checkpoints, strict=False)
    model.eval()

    _ = model(torch.randn((2, 3, 384, 384)).to(device))

    return model

def extract_document(image_true, trained_model, image_size=384, buffer=10):
    preprocess_transforms = image_preproces_transforms()
    IMAGE_SIZE = image_size
    half = IMAGE_SIZE // 2
    imH, imW, C = image_true.shape

    image_model = cv2.resize(image_true, (IMAGE_SIZE, IMAGE_SIZE), interpolation=cv2.INTER_NEAREST)
    scale_x = imW / IMAGE_SIZE
    scale_y = imH / IMAGE_SIZE
    image_model = preprocess_transforms(image_model)
    image_model = torch.unsqueeze(image_model, dim=0).to(next(trained_model.parameters()).device)

    with torch.no_grad():
        out = trained_model(image_model)["out"].cpu()

    out = torch.argmax(out, dim=1, keepdims=True).permute(0, 2, 3, 1)[0].numpy().squeeze().astype(np.int32)
    r_H, r_W = out.shape

    _out_extended = np.zeros((IMAGE_SIZE + r_H, IMAGE_SIZE + r_W), dtype=out.dtype)
    _out_extended[half : half + IMAGE_SIZE, half : half + IMAGE_SIZE] = out * 255
    out = _out_extended.copy()

    canny = cv2.Canny(out.astype(np.uint8), 225, 255)
    canny = cv2.dilate(canny, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    contours, _ = cv2.findContours(canny, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
    page = sorted(contours, key=cv2.contourArea, reverse=True)[0]

    epsilon = 0.02 * cv2.arcLength(page, True)
    corners = cv2.approxPolyDP(page, epsilon, True).reshape(-1, 2).astype(np.float32)

    corners[:, 0] -= half
    corners[:, 1] -= half
    corners[:, 0] *= scale_x
    corners[:, 1] *= scale_y

    if not (np.all(corners.min(axis=0) >= (0, 0)) and np.all(corners.max(axis=0) <= (imW, imH))):
        left_pad, top_pad, right_pad, bottom_pad = 0, 0, 0, 0
        rect = cv2.minAreaRect(corners.reshape((-1, 1, 2)))
        box_corners = np.int32(cv2.boxPoints(rect))

        box_x_min = np.min(box_corners[:, 0])
        box_x_max = np.max(box_corners[:, 0])
        box_y_min = np.min(box_corners[:, 1])
        box_y_max = np.max(box_corners[:, 1])

        if box_x_min <= 0:
            left_pad = abs(box_x_min) + buffer
        if box_x_max >= imW:
            right_pad = (box_x_max - imW) + buffer
        if box_y_min <= 0:
            top_pad = abs(box_y_min) + buffer
        if box_y_max >= imH:
            bottom_pad = (box_y_max - imH) + buffer

        image_extended = np.zeros((top_pad + bottom_pad + imH, left_pad + right_pad + imW, C), dtype=image_true.dtype)
        image_extended[top_pad : top_pad + imH, left_pad : left_pad + imW, :] = image_true.astype(np.float32)

        box_corners[:, 0] += left_pad
        box_corners[:, 1] += top_pad

        corners = box_corners
        image_true = image_extended

    corners = sorted(corners.tolist())
    corners = order_points(corners)
    destination_corners = find_dest(corners)
    M = cv2.getPerspectiveTransform(np.float32(corners), np.float32(destination_corners))

    final = cv2.warpPerspective(image_true, M, (destination_corners[2][0], destination_corners[2][1]), flags=cv2.INTER_LANCZOS4)
    final = np.clip(final, a_min=0., a_max=255.)

    return final


# Endpoint to handle file uploads and document extraction
@app.post("/extract-document/")
async def extract_document_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)[:, :, ::-1]

    model_path = "../car-penalties/modeling/model_r50_iou_mix_2C020.pth"  # Update this path to your model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    trained_model = load_model(num_classes=2, checkpoint_path=model_path, device=device)

    # Perform the document extraction
    extracted_image = extract_document(image, trained_model)

    output_path = "extractedImages/extracted_document.jpg"
    cv2.imwrite(output_path, extracted_image.astype('uint8'))

    return FileResponse(output_path, media_type="image/jpeg")
# def preprocess_image(image):
#     # Check if the image is in float64 format and convert it to uint8
#     if image.dtype == np.float64:
#         image = (image * 255).astype(np.uint8)  # Scale to 0-255 and convert to uint8

#     # Ensure the image is in uint8 format before converting to grayscale
#     if image.dtype != np.uint8:
#         image = image.astype(np.uint8)

#     img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
#     img = img / 255.0  # Normalize pixel values to the range [0, 1]
#     img = np.expand_dims(img, axis=-1)  # Add channel dimension
#     img = np.expand_dims(img, axis=0)  # Add batch dimension
#     return img

# Function to preprocess a new image while keeping the original size
def preprocess_image(image_path):
    img = cv2.imread(image_path, 0)  # Load the image in grayscale
    img = img / 255.  # Normalize the pixel values
    img = np.expand_dims(img, axis=-1)  # Expand dimensions to fit the model input shape
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@app.post("/extractAndDenoise-document/")
async def extract_denoise_document_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)[:, :, ::-1]

    # Load the document extraction model
    model_path = "../car-penalties/modeling/model_r50_iou_mix_2C020.pth"  # Update this path to your model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    trained_model = load_model(num_classes=2, checkpoint_path=model_path, device=device)

    # Perform the document extraction
    extracted_image = extract_document(image, trained_model)
    output_path = "extractedImages/extracted_document.jpg"
    #cv2.imwrite(output_path, extracted_image.astype('uint8'))
    
    # Rebuild and load the denoising model using functional API
    input_shape = (None, None, 1)
    inputs = Input(shape=input_shape)

    # Encoder
    x = Conv2D(filters=128, kernel_size=(3, 3), activation='relu', padding='same', name='Conv1')(inputs)
    x = BatchNormalization(name='BN1')(x)
    x = MaxPooling2D((2, 2), padding='same', name='pool1')(x)

    # Decoder
    x = Conv2D(filters=128, kernel_size=(3, 3), activation='relu', padding='same', name='Conv2')(x)
    x = UpSampling2D((2, 2), name='upsample1')(x)
    outputs = Conv2D(filters=1, kernel_size=(3, 3), activation='sigmoid', padding='same', name='Conv3')(x)

    model = Model(inputs, outputs)
    model.load_weights('../models/denoising_autoencoder_80.h5')  # Ensure this path is correct

    # Preprocess the extracted image
    preprocessed_image = preprocess_image(output_path)

    # Denoise the image
    denoised_image = model.predict(preprocessed_image)

    # Remove the batch dimension and channel dimension
    denoised_image = np.squeeze(denoised_image)

    # Save the denoised image
    denoised_image_path = "denoisedImages/denoised_document.jpg"
    cv2.imwrite(denoised_image_path, denoised_image * 255)  # Convert back to 0-255 range and save

    return FileResponse(denoised_image_path, media_type="image/jpeg")



# To run the FastAPI app, use Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
