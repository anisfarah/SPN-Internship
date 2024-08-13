import React from 'react';

//TODO: remove optional from searchParams
export type FilterNavProps = {
  filterData?: any;
  addData?: string | React.JSX.Element;
  withSearch?: boolean;
  filterFieldsType?: any[];
  overlayInDesktop?: boolean;
  searchData?: any[];
  filterFields?: string[];
  displayFields?: string[];
};
