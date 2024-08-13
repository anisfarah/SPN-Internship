import { CardProps, CardTableProps } from '@/types/cards.type';
import cn from '@/utils/tailwindClassNameMerge';
import Image from 'next/image';
import Link from 'next/link';

function Card(props: CardProps) {
  return (
    <div
      className={cn(
        `relative size-full overflow-hidden rounded-[1.8rem] bg-bgColor p-6 shadow-outer ${
          props.link && 'lg:hover:scale-105'
        } duration-300 ease-in-out`,
        props.className
      )}
    >
      {props.link ? (
        <Link href={props.link}>
          {props.data?.image ? (
            <div className="relative mx-auto aspect-video w-full">
              <Image
                className="h-auto w-full rounded-t-[1.8rem] object-cover object-center"
                alt={props.data.altImage || ''}
                fill
                src={props.data.image.url}
                // src={`${data.image}?t=${Date.now()}`}
                // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALcAAAAf/9k="
                placeholder={
                  props.data.image?.blur ||
                  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALcAAAAf/9k='
                }
                sizes="(max-width: 768px) 80vw,40vw"
              />
              {!props.withRounded ? null : (
                <span className="absolute right-2 top-2 flex items-center">
                  <span className="size-6 rounded-full">{props.withRounded}</span>
                </span>
              )}
            </div>
          ) : null}
          <div className="relative size-full px-6 py-4">
            <h3 className="my-4 text-lg font-semibold uppercase">{props.data.title}</h3>
            {props.children}
          </div>
        </Link>
      ) : props.data?.image ? (
        <div className="relative mx-auto aspect-video w-full">
          <Image
            className="h-auto w-full rounded-xl object-cover object-center"
            alt={props.data.altImage}
            fill
            src={props.data.image}
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALcAAAAf/9k="
            placeholder="blur"
            quality={100}
            sizes="(max-width: 768px) 100vw,100vw"
          />
          {!props.withRounded ? null : (
            <span className="absolute right-2 top-2 flex items-center">
              <span className="size-6 rounded-full">{props.withRounded}</span>
            </span>
          )}
        </div>
      ) : null}
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-lg font-semibold uppercase">{props.data.title}</h3>
        {props.children}
      </div>
    </div>
  );
}

function CardTable(props: CardTableProps) {
  return (
    <div
      className={`my-1 size-full rounded-3xl bg-bgColor p-6 ${
        props.fullWidth ? 'max-w-none' : 'max-w-3xl'
      } mx-auto ${props.isInner ? 'shadow-inner' : 'shadow-outer'}`}
    >
      {props.title ? (
        <div className="mx-auto mb-6 flex w-full items-center justify-between">
          <div className="my-auto flex size-fit items-center gap-2 font-text text-lg font-semibold uppercase">
            {props.title}
          </div>
          <span className="flex size-fit gap-3">
            {props.Status && (
              <div className="mr-2 flex size-fit" onClick={props.handleStatusChange}>
                {props.Status}
              </div>
            )}
            {props.IconFour && (
              <span className={`flex cursor-pointer ${props.isMobile ? 'p-1.5' : 'p-3'} m-auto`}>
                {props.IconFour}
              </span>
            )}
            {props.IconThree && (
              <span className={`flex cursor-pointer ${props.isMobile ? 'p-1.5' : 'p-3'} m-auto`}>
                {props.IconThree}
              </span>
            )}

            {props.IconOne && (
              <span
                className={`relative flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full bg-bgColor shadow-outer`}
                // onClick={props.handleIconOneChange}
              >
                {props.IconOne}
              </span>
            )}
            {props.IconTwo && (
              <span
                className={`flex cursor-pointer rounded-full ${
                  props.isMobile ? 'p-1.5' : 'p-3'
                } my-auto bg-bgColor shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)]`}
                onClick={props.handleIconTwoChange}
              >
                {props.IconTwo}
              </span>
            )}
          </span>
        </div>
      ) : (
        <div className="relative w-full">
          <div className="flex-rowe absolute right-0 top-0 flex gap-2">
            {props.Status && (
              <div className="mr-2 size-fit" onClick={props.handleStatusChange}>
                {props.Status}
              </div>
            )}
            {props.IconFour && (
              <span className={`cursor-pointer ${props.isMobile ? 'p-1.5' : 'p-3'} m-auto`}>
                {props.IconFour}
              </span>
            )}
            {props.IconThree && (
              <span className={`cursor-pointer ${props.isMobile ? 'p-1.5' : 'p-3'} m-auto`}>
                {props.IconThree}
              </span>
            )}

            {props.IconOne && (
              <span
                className={`cursor-pointer rounded-full ${
                  props.isMobile ? 'p-1.5' : 'p-3'
                } bg-bgColor shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)]`}
                onClick={props.handleIconOneChange}
              >
                {props.IconOne}
              </span>
            )}
            {props.IconTwo && (
              <span
                className={`cursor-pointer rounded-full ${
                  props.isMobile ? 'p-1.5' : 'p-3'
                } my-auto bg-bgColor shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)]`}
                onClick={props.handleIconTwoChange}
              >
                {props.IconTwo}
              </span>
            )}
          </div>
        </div>
      )}
      <div className="w-full">{props.children}</div>
    </div>
  );
}
export { Card };
export { CardTable };
