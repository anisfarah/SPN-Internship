import { ColumnProps, RowProps, TableProps } from '@/types/tables.type';
import cn from '@/utils/tailwindClassNameMerge';

import { Text, Category } from './texts';

function Table(props: TableProps) {
  return (
    <table className="w-full table-auto text-left">
      <thead className="sticky left-0 top-0 w-full bg-bgColor">
        <tr>
          {props.categories.map((cat) => (
            <th key={cat} className="py-5 pl-3 text-left">
              <Category>{cat}</Category>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="py-2">{props.children}</tbody>
    </table>
  );
}

function Row(props: RowProps) {
  return <tr className={cn(`border-t-2`, props.className)}>{props.children}</tr>;
}

function Column(props: ColumnProps) {
  return (
    <td className={`cursor-default px-3 py-4 ${props.fitted ? 'w-5' : 'min-w-40'}`}>
      <Text withWhiteSpace={props.withWhiteSpace}>{props.children}</Text>
    </td>
  );
}

export { Row, Column };
export default Table;
