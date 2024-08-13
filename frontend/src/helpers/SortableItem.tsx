import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

/**
 * A wrapper component to make an element sortable.
 *
 * @param {Props} props - The properties of the component.
 * @param {React.ReactNode} props.children - The children of the component.
 * @param {string} props.id - The id of the component.
 * @returns {JSX.Element} The JSX element representing the sortable item.
 */
export function SortableItem({
  children,
  id
}: {
  children: React.ReactNode;
  id: string;
}): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform)
    // transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-full ${isDragging && 'rounded-md bg-greyAccent/30'}`}
    >
      {children}
    </div>
  );
}
