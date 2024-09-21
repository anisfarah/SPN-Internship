export type PaginationProps = {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
};
