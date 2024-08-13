import { ListPicturesProps, ProfilePictureProps } from '@/types/profilePicture.type';
import Image from 'next/image';

import cn from '../../utils/tailwindClassNameMerge';
import AddCollaboratorIcon from '../icons/addCollaboratorIcon';

function ProfilePicture(props: ProfilePictureProps) {
  let name = '--';
  if (props.firstname || props.lastname) name = `${props.firstname[0]} ${props.lastname[0]}`;

  return (
    <div
      className={cn(
        `relative aspect-square h-full rounded-full ${!props.withShadow && 'shadow-outer'}`,
        props.className
      )}
      style={props.style}
      title={`${props.firstname} ${props.lastname}`}
    >
      {props.image && name !== '--' ? (
        <Image
          className="size-full rounded-full object-cover object-center p-1"
          alt="test"
          fill
          src={props.image}
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALcAAAAf/9k="
          placeholder="blur"
        />
      ) : (
        <div className={`size-full object-cover object-center p-1 capitalize`}>
          <span className="flex size-full items-center justify-center whitespace-nowrap rounded-full bg-grayBgProfile font-semibold">
            <span className="font-text text-sm font-semibold md:text-base">{name}</span>
          </span>
        </div>
      )}
    </div>
  );
}

function ListPictures(props: ListPicturesProps) {
  return (
    <div className="flex w-full items-center">
      {props.list.map((p: any, idx: any) =>
        idx < 5 ? (
          <div
            style={{
              transform: `translateX(${-idx * 0.5}rem)`
            }}
            className="relative aspect-square size-12 rounded-full"
            key={idx}
          >
            <ProfilePicture
              firstname={p.user.firstname}
              lastname={p.user.lastname}
              image={p.user.image}
            />
          </div>
        ) : null
      )}
      <div
        style={{
          transform:
            props.list.length > 0 ? `translateX(${-0.5 * (props.list.length - 3)}rem)` : undefined
        }}
        className="flex aspect-square size-6 cursor-pointer items-center justify-center"
        onClick={props.handleClick}
      >
        <AddCollaboratorIcon className="size-6 hover:fill-primary" />
      </div>
    </div>
  );
}
export default ProfilePicture;
export { ListPictures };
