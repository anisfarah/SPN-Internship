import { ChildrenProps } from './children.type';

export type TableProps = ChildrenProps & {
  categories: string[];
};
export type RowProps = ChildrenProps & {
  className?: string;
};
export type ColumnProps = ChildrenProps & {
  withWhiteSpace?: boolean;
  fitted?: boolean;
};
