import os
from uuid import uuid4
import cv2
from fastapi import APIRouter, FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse,JSONResponse
import os,io
import gc
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, UpSampling2D, BatchNormalization, Input
import requests
import json
import torch
import torch.nn as nn
import torchvision.transforms as torchvision_T
from torchvision.models.segmentation import deeplabv3_resnet50
from torchvision.models.segmentation import deeplabv3_mobilenet_v3_large
# --- OCR Function ---
import requests
import json
import uvicorn
from config import collection
from database.schemas import allPenalties
from database.models import Penalty
from bson.objectid import ObjectId
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
router = APIRouter()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],  # You can allow specific origins or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # You can restrict methods if needed, e.g., ["GET", "POST"]
    allow_headers=["*"],  # You can restrict headers if needed
)

#Get Penalties
@router.get("/AllPenalties")
async def get_all_penalties():
    data= collection.find( )
    return allPenalties(data)

#Add Penalty
@router.post("/AddPenalty")
async def create_penalty(new_penalty: Penalty):
    try:
        print("Received penalty data:", new_penalty)  # Debug print
        resp = collection.insert_one(dict(new_penalty))
        return {"Status_code": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

#Update Penalty
@router.put("/{penalty_id}")
async def update_penalty(penalty_id:str,updated_penalty:Penalty):
    try:
        id= ObjectId(penalty_id)
        penalty_exist=collection.find_one({"_id":id})
        if not penalty_exist:
            return HTTPException(status_code=404, detail=f"Penalty does not exist")
        resp=collection.update_one({"_id":id}, {"$set":dict(updated_penalty)})
        return {"status code":200, "message":"penalty updated successfully"}
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some erroe occured {e}")

#Delete Penalty
@router.delete("/{penalty_id}")
async def delete_penalty(penalty_id:str):
    try:
        id= ObjectId(penalty_id)
        penalty_exist=collection.find_one({"_id":id})
        if not penalty_exist:
            return HTTPException(status_code=404, detail=f"Penalty does not exist")
        resp=collection.delete_one({"_id":id})
        return {"status code":200, "message":"penalty updated successfully"}
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some erroe occured {e}")
    
    
# Get Penalty by ID
@router.get("/penalty/{penalty_id}")
async def get_penalty_by_id(penalty_id: str):
    try:
        # Convert the string ID to an ObjectId
        id = ObjectId(penalty_id)
        penalty = collection.find_one({"_id": id})
        if not penalty:
            return HTTPException(status_code=404, detail=f"Penalty does not exist")
        penalty["_id"] = str(penalty["_id"])
        # If the penalty does not exist, return a 404 error
        return {"status code":200, "message":"penalty detail successfully","penalty":penalty}
       
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some erroe occured {e}")

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


def ocr_space_file(image_data, overlay=False, api_key='K86107864288957', language='fre'):
    payload = {
        'isOverlayRequired': overlay,
        'apikey': api_key,
        'language': language,
        'detectOrientation': True,
        'scale': True,
        'OCREngine': 2
    }
    files = {'image': ('image.jpg', image_data, 'image/jpeg')}
    
    r = requests.post(
        'https://api.ocr.space/parse/image',
        files=files,
        data=payload,
    )
    result = json.loads(r.content.decode())  # Convert JSON response to Python object
    
    if 'ParsedResults' in result and len(result['ParsedResults']) > 0:
        extracted_text = result['ParsedResults'][0]['ParsedText']  # Extract parsed text
        return extracted_text
    else:
        return "No text extracted or error occurred"

# Function to preprocess a new image while keeping the original size
def preprocess_image(image_path):
    img = cv2.imread(image_path, 0)  # Load the image in grayscale
    img = img / 255.  # Normalize the pixel values
    img = np.expand_dims(img, axis=-1)  # Expand dimensions to fit the model input shape
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img


# Endpoint to handle file uploads and document extraction
# @app.post("/extract-document/")
# async def extract_document_endpoint(file: UploadFile = File(...)):
#     contents = await file.read()
#     nparr = np.frombuffer(contents, np.uint8)
#     image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)[:, :, ::-1]

#     model_path = "../car-penalties/modeling/model_r50_iou_mix_2C020.pth"  # Update this path to your model
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     trained_model = load_model(num_classes=2, checkpoint_path=model_path, device=device)

#     # Perform the document extraction
#     extracted_image = extract_document(image, trained_model)

#     output_path = "extractedImages/extracted_document.jpg"
#     cv2.imwrite(output_path, extracted_image.astype('uint8'))

#     return FileResponse(output_path, media_type="image/jpeg")

# @app.post("/extractAndDenoise-document/")
# async def extract_denoise_document_endpoint(file: UploadFile = File(...)):
#     contents = await file.read()
#     nparr = np.frombuffer(contents, np.uint8)
#     image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)[:, :, ::-1]

#     # Load the document extraction model
#     model_path = "../car-penalties/modeling/model_r50_iou_mix_2C020.pth"  # Update this path to your model
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     trained_model = load_model(num_classes=2, checkpoint_path=model_path, device=device)

#     # Perform the document extraction
#     extracted_image = extract_document(image, trained_model)
#     output_path = "extractedImages/extracted_document.jpg"
#     cv2.imwrite(output_path, extracted_image.astype('uint8'))
    
#     # Rebuild and load the denoising model using functional API
#     input_shape = (None, None, 1)
#     inputs = Input(shape=input_shape)

#     # Encoder
#     x = Conv2D(filters=128, kernel_size=(3, 3), activation='relu', padding='same', name='Conv1')(inputs)
#     x = BatchNormalization(name='BN1')(x)
#     x = MaxPooling2D((2, 2), padding='same', name='pool1')(x)

#     # Decoder
#     x = Conv2D(filters=128, kernel_size=(3, 3), activation='relu', padding='same', name='Conv2')(x)
#     x = UpSampling2D((2, 2), name='upsample1')(x)
#     outputs = Conv2D(filters=1, kernel_size=(3, 3), activation='sigmoid', padding='same', name='Conv3')(x)

#     model = Model(inputs, outputs)
#     model.load_weights('../models/denoising_autoencoder_80.h5')  # Ensure this path is correct

#     # Preprocess the extracted image
#     preprocessed_image = preprocess_image(output_path)

#     # Denoise the image
#     denoised_image = model.predict(preprocessed_image)

#     # Remove the batch dimension and channel dimension
#     denoised_image = np.squeeze(denoised_image)

#     # Save the denoised image
#     denoised_image_path = "denoisedImages/denoised_document.jpg"
#     cv2.imwrite(denoised_image_path, denoised_image * 255)  # Convert back to 0-255 range and save

#     return FileResponse(denoised_image_path, media_type="image/jpeg")

# @app.post("/extract-text/")
# async def extract_text(file: UploadFile = File(...)):
#     # Read the image file into memory
#     image_data = await file.read()

#     # Use the OCR function to extract text
#     extracted_text = ocr_space_file(image_data)

#     # Return the extracted text as a JSON response
#     return JSONResponse(content={"extracted_text": extracted_text})


import base64

# @app.post("/pipeline-document/")
# async def pipeline_endpoint(file: UploadFile = File(...)):
#     try:
#         # Generate a unique ID for the image
#         unique_id = str(uuid4())

#         # Read and decode the image
#         contents = await file.read()
#         nparr = np.frombuffer(contents, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         # Load the document extraction model
#         model_path = "../car-penalties/modeling/model_r50_iou_mix_2C020.pth"  # Update this path to your model
#         device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#         trained_model = load_model(num_classes=2, checkpoint_path=model_path, device=device)

#         # Perform the document extraction
#         extracted_image = extract_document(image, trained_model)
#         output_path = f"extractedImages/extracted_document_{unique_id}.jpg"
#         cv2.imwrite(output_path, extracted_image.astype('uint8'))

#         # Rebuild and load the denoising model using functional API
#         input_shape = (None, None, 1)
#         inputs = Input(shape=input_shape)

#         # Encoder
#         x = Conv2D(filters=128, kernel_size=(3, 3), activation='relu', padding='same', name='Conv1')(inputs)
#         x = BatchNormalization(name='BN1')(x)
#         x = MaxPooling2D((2, 2), padding='same', name='pool1')(x)

#         # Decoder
#         x = Conv2D(filters=128, kernel_size=(3, 3), activation='relu', padding='same', name='Conv2')(x)
#         x = UpSampling2D((2, 2), name='upsample1')(x)
#         outputs = Conv2D(filters=1, kernel_size=(3, 3), activation='sigmoid', padding='same', name='Conv3')(x)

#         model = Model(inputs, outputs)
#         model.load_weights('../models/denoising_autoencoder_80.h5')  # Ensure this path is correct

#         # Preprocess the extracted image
#         preprocessed_image = preprocess_image(output_path)

#         # Denoise the image
#         denoised_image = model.predict(preprocessed_image)

#         # Remove the batch dimension and channel dimension
#         denoised_image = np.squeeze(denoised_image)

#         # Save the denoised image with the unique ID (optional)
#         denoised_image_path = f"denoisedImages/denoised_document_{unique_id}.jpg"
#         cv2.imwrite(denoised_image_path, denoised_image * 255)  # Convert back to 0-255 range and save

#         # Convert the denoised image to binary (JPEG format)
#         _, buffer = cv2.imencode('.jpg', denoised_image * 255)
#         denoised_image_binary = buffer.tobytes()

#         # Convert the binary image data to a base64 string
#         denoised_image_base64 = base64.b64encode(denoised_image_binary).decode('utf-8')

#         # Use OCR to extract text from the denoised image
#         with open(denoised_image_path, "rb") as image_file:
#             extracted_text = ocr_space_file(image_file)

#         # Return the denoised image (base64 encoded) and the extracted text as JSON
#         return JSONResponse(content={
#             "denoised_image": denoised_image_base64,
#             "extracted_text": extracted_text
#         })

#     except Exception as e:
#         import traceback
#         print(traceback.format_exc())  # Print the full traceback to the console for debugging
#         return JSONResponse(content={"error": str(e)}, status_code=500)




"""this endpoint is for extracting the document from any background then extracting the text from the document """
# Directory to save images
IMAGE_DIR = "static/images/"
os.makedirs(IMAGE_DIR, exist_ok=True)
@app.post("/pipeline-document/")
async def pipeline_endpoint(file: UploadFile = File(...)):
    try:
        # Generate a unique filename
        unique_filename = f"{uuid4()}.jpg"
        file_path = os.path.join(IMAGE_DIR, unique_filename)

        # Read and decode the image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Load the document extraction model
        model_path = "../car-penalties/modeling/model_r50_iou_mix_2C020.pth"  # Update this path to your model
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        trained_model = load_model(num_classes=2, checkpoint_path=model_path, device=device)

        # Perform the document extraction
        extracted_image = extract_document(image, trained_model)

        # Save the extracted image to the server
        cv2.imwrite(file_path, extracted_image.astype('uint8'))

        # Construct the URL for the saved image
        image_url = f"http://localhost:8000/{file_path}"

        # Use OCR to extract text from the denoised image
        with open(file_path, "rb") as image_file:
            extracted_text = ocr_space_file(image_file)

        # Return the image URL and extracted text
        return {
            "image_url": image_url,
            "extracted_text": extracted_text
        }

    except Exception as e:
        import traceback
        traceback.print_exc()  # Print the full traceback to the console for debugging
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
# @app.post("/pipeline-document/")
# async def pipeline_endpoint(file: UploadFile = File(...)):
#     try:
#         # Generate a unique ID for the image
#         unique_id = str(uuid4())

#         # Read and decode the image
#         contents = await file.read()
#         nparr = np.frombuffer(contents, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         # Load the document extraction model
#         model_path = "../car-penalties/modeling/model_r50_iou_mix_2C020.pth"  # Update this path to your model
#         device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#         trained_model = load_model(num_classes=2, checkpoint_path=model_path, device=device)

#         # Perform the document extraction
#         extracted_image = extract_document(image, trained_model)
#         output_path = f"extractedImages/extracted_document_{unique_id}.jpg"
#         cv2.imwrite(output_path, extracted_image.astype('uint8'))


#         # Convert the denoised image to binary (JPEG format)
#         _, buffer = cv2.imencode('.jpg', extracted_image * 255)
#         denoised_image_binary = buffer.tobytes()

#         # Convert the binary image data to a base64 string
#         extracted_image_base64 = base64.b64encode(denoised_image_binary).decode('utf-8')

#         # Use OCR to extract text from the denoised image
#         with open(output_path, "rb") as image_file:
#             extracted_text = ocr_space_file(image_file)

#         # Return the denoised image (base64 encoded) and the extracted text as JSON
#         return JSONResponse(content={
#             "extracted_image": extracted_image_base64,
#             "extracted_text": extracted_text
#         })

#     except Exception as e:
#         import traceback
#         print(traceback.format_exc())  # Print the full traceback to the console for debugging
#         return JSONResponse(content={"error": str(e)}, status_code=500)
app.include_router(router)
# To run the FastAPI app, use Uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
