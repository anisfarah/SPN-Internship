export type SingleGMapProps = GMapProps & {
  marker?: any;
  key?: string;
};
export type MultiGMapProps = GMapProps & {
  markers?: any;
};

type GMapProps = {
  center: any;
  disableDefaultUI: boolean;
  mapId: string;
  zoom: number;
  handleChange: (x: any) => any;
};
