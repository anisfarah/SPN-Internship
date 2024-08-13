import { CSSProperties, MouseEventHandler } from 'react';

export type ListPicturesProps = { list: any; handleClick: MouseEventHandler<HTMLDivElement> };
export type ProfilePictureProps = {
  firstname: string;
  lastname: string;
  style?: CSSProperties;
  image?: string;
  withShadow?: boolean;
  className?: string;
};
