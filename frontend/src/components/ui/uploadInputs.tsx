'use client';
import { DraggableItemProps, UploadInputProps, UploadMultiInputProp } from '@/types/inputs.type';
import { arrayRemove, isImage } from '@/utils/inputHelpers';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import AddPictureIcon from '../icons/addPictureIcon';
import EditPictureIcon from '../icons/editPictureIcon';
import XIcon from '../icons/xIcon';
import { DraggableImage, ImageContainer } from './containers';
import { LabelText } from './texts';

// FIXME: AHMED SGAHIER to fix edit overlay and upload input in general
/**
 * Renders an upload input component.
 *
 * @param {Object} props The component props.
 * @param {Object} props.value The value of the input.
 * @param {Function} props.setAlert The function to set the alert.
 * @param {string} props.name The name of the input.
 * @param {boolean} props.required Whether the input is required.
 * @param {string} props.extension The expected file extension.
 * @param {string} props.label The label for the input.
 * @param {boolean} props.isClicked Whether the form is submitted at least once.
 * @return {JSX.Element} The rendered upload input component.
 */
function UploadInput(props: UploadInputProps): JSX.Element {
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
  // const [disabled, setDisabled] = useState(false);
  //   const [archiveAction, setArchiveAction] = useState(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(props.required);

  //   useEffect(() => {
  //     if (props.onArchiveAction) {
  //       props.onArchiveAction(archiveAction);
  //     }
  //   }, [archiveAction, props]);

  return (
    <div className="relative flex w-full flex-col">
      <LabelText
        required={props.required}
        label={props.label}
        isClicked={props.isClicked}
        invalid={isInvalid}
      />
      <label
        className={`relative flex aspect-video w-full items-center justify-center rounded-2xl bg-bgColor ${
          props.isClicked && isInvalid && props.required ? 'border border-red' : ''
        } cursor-pointer font-text text-sm font-light shadow-inner outline-none focus:outline-none md:text-base`}
      >
        {props.value && !createObjectURL ? (
          <div
            // onClick={() => setDisabled(false)}
            className="group relative aspect-video w-full py-2"
          >
            {!props.disabled && (
              <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center rounded-2xl bg-black/60 opacity-0 duration-300 ease-in-out group-hover:opacity-100">
                <EditPictureIcon className="size-10 fill-white" />
              </div>
            )}
            <Image
              src={props.value?.url || ''}
              alt={props.value?.alt || ''}
              fill
              // priority
              className="rounded-2xl object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            />
          </div>
        ) : createObjectURL ? (
          <div className="group relative aspect-video w-full py-2">
            <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center rounded-2xl bg-black/60 opacity-0 duration-300 ease-in-out group-hover:opacity-100">
              <EditPictureIcon className="size-10 fill-white" />
            </div>
            <Image
              src={createObjectURL || ''}
              alt=""
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            />
          </div>
        ) : (
          <AddPictureIcon className="size-10" />
        )}
        <input
          name={props.name}
          required={props.required}
          disabled={props.disabled}
          className="peer hidden"
          type="file"
          onChange={(e) => {
            if (e.target.files?.length) {
              const file = e.target.files[0];
              if (!isImage(file.name)) {
                props.setAlert({ status: 400, alert: 'Please select an image!' });

                return;
              }
              setCreateObjectURL(URL.createObjectURL(file));
              setIsInvalid(false);
            }
          }}
          // accept={`application/${props.extensions}`}
          // onInput={(e: any) => {
          //   const ext = e.target.files?.[0]?.name.split('.').pop() || '';
          //   if (ext.toLowerCase() !== props.extensions)
          //     e.target.setCustomValidity('Error with file type');
          //   else e.target.setCustomValidity('');
          // }}
        />
      </label>
      {/* <EditOverlayContainer
        archive
        title="Archive brand"
        isOpen={disabled}
        setConfirm={setArchiveAction}
        setIsOpen={setDisabled}
      >
        <div className="flex size-full justify-center">
          Are you sure you want to archive {props.slug} ?
        </div>
      </EditOverlayContainer> */}
    </div>
  );
}
function UploadMultiInput(props: UploadMultiInputProp) {
  // Contains the final image selection either files or urls
  const [imageFiles, setImageFiles] = useState<any>(props?.value || []);
  // contains the image url if it is a file or a blob
  const [imageUrls, setImageUrls] = useState(props?.value?.map((img: any) => img?.url) || []);
  //   The index of the images from imageUrls array ordered
  const [imageIndexes, setImageIndexes] = useState(
    Array.from({ length: imageFiles.length }, (_, index) => index.toString()) || []
  );
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [clickLength, setClickLength] = useState(1);
  const [isInvalid, setIsInvalid] = useState<boolean>(props.required);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveImage(event.active.id as string);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveImage(null);
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      let activeIndex = -1;
      let overIndex = -1;
      setImageIndexes((items: any) => {
        const oldIndex = items.indexOf(active.id);
        activeIndex = oldIndex;
        const newIndex = items.indexOf(over?.id);
        overIndex = newIndex;

        return arrayMove(items, oldIndex, newIndex);
      });
      setImageFiles((items: any) => {
        return arrayMove(items, activeIndex, overIndex);
      });
    }

    setActiveImage(null);
  }, []);

  return (
    <>
      <LabelText
        required={props.required}
        label={props.label}
        isClicked={props.isClicked}
        invalid={isInvalid}
        className="pb-0"
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={imageIndexes} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-4">
            {imageIndexes.map((val: string, idx: number) => {
              return (
                <div className="relative" key={idx}>
                  <DraggableItem id={val} activeImage={imageUrls[parseInt(val, 10)]} />
                  <div
                    className="absolute -right-2 -top-2 flex aspect-square size-7 cursor-pointer items-center justify-center rounded-full bg-bgColor shadow-threeD hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      const deletedImageIndex = imageIndexes.indexOf(val);
                      setImageIndexes(arrayRemove(imageIndexes, val));
                      setImageFiles(arrayRemove(imageFiles, imageFiles[deletedImageIndex]));
                    }}
                  >
                    <XIcon className="flex size-3 shrink-0 grow-0 fill-black" />
                  </div>
                </div>
              );
            })}
            {Array(clickLength)
              .fill(0)
              .map((val, idx) => (
                <label
                  key={idx}
                  className={`aspect-[1.2] w-full sm:aspect-video ${clickLength - 1 === idx ? 'flex' : 'hidden'} ${
                    props.isClicked && isInvalid && props.required ? 'border border-red' : ''
                  } cursor-pointer items-center justify-center rounded-2xl bg-bgColor shadow-inner outline-none focus:outline-none`}
                >
                  <AddPictureIcon className="size-8" />
                  <input
                    title="Gallery"
                    name={props.name}
                    required={props.required}
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        const { files } = e.target;
                        const selectedFiles = Array.from(files);

                        const selectedFilesBlobs = selectedFiles.map((file: File) => {
                          return URL.createObjectURL(file);
                        });
                        const newIndexes = Array.from(
                          { length: selectedFiles.length },
                          (_, index) => (index + imageFiles.length).toString()
                        );
                        setImageFiles((prevFiles: any) => [...prevFiles, ...selectedFiles]);
                        setImageUrls((prev: string[]) => [...prev, ...selectedFilesBlobs]);
                        setImageIndexes((prev: any) => [...prev, ...newIndexes]);
                        setClickLength((prev) => prev + 1);
                        setIsInvalid(false);
                      }
                    }}
                  />
                </label>
              ))}
            <input
              hidden
              readOnly
              name={'orderedGallery'}
              value={JSON.stringify(
                imageFiles.map((img: any) => {
                  if (img instanceof File) {
                    return 'File';
                  } else return img;
                })
              )}
            />
          </div>
        </SortableContext>
        <DragOverlay>
          {activeImage ? <ImageContainer image={imageUrls[parseInt(activeImage, 10)]} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

/**
 * Renders a draggable item component.
 *
 * @param {DraggableItemProps} props - The component props.
 * @param {string} props.id - The id of the item.
 * @param {Array<{id: string, url: string, alt: string}>} props.imageArray - The array of images.
 * @param {Function} props.setImageArray - The function to set the array of images.
 * @param {{id: string, url: string, alt: string}} props.activeImage - The active image.
 */
function DraggableItem(props: DraggableItemProps) {
  const sortable = useSortable({ id: props.id });
  const { attributes, listeners, isDragging, setNodeRef, transform } = sortable;
  //   const { attributes, listeners, isDragging, setNodeRef, transform, transition } = sortable;
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    // transition: transition,
    zIndex: isDragging ? '1' : '0',
    opacity: isDragging ? '0.6' : '1'
  };

  return (
    <DraggableImage ref={setNodeRef} id={props.id} style={style} {...attributes} {...listeners}>
      <ImageContainer image={props.activeImage} />
    </DraggableImage>
  );
}

export { UploadInput, UploadMultiInput };
