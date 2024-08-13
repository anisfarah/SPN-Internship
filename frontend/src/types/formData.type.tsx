export interface FormDataObject {
  gallery?: File[];
  galleryImages?: string;
  image?: File | null;
  [key: string]: any;
}
