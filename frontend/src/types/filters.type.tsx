export interface IFilterInputs {
  allData: any;
  filterContainerIsOpen: boolean;
  setFilterContainerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterFieldsType?: any[];
  overlayOnly?: boolean;
}
