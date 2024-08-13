export type ApiResponse<T = any> = {
  error?: string;
  message?: string;
  data?: T;
};

export type AddRequestResponseData = {
  reference: string;
};
export type IHistory = {
  modifiedBy: string;
  modifiedAt: Date;
  old: Record<string, any>;
  new: Record<string, any>;
};

export type AddRequestApiResponse = ApiResponse<AddRequestResponseData>;

export type FilterOption = {
  title: string;
  value: string;
};

export type FilterData = {
  title: string;
  valueKey: string;
  values: FilterOption[];
}[];

export type ImageType = {
  url: string;
  alt?: string;
  blur?: `data:image/${string}`;
};
