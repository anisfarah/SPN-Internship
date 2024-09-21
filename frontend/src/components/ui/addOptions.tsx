'use client';

import Button from './buttons';

export default function AddOptions({
  isActive,
  handleClick,
  label
}: {
  item: string;
  isActive: boolean;
  slug: string;
  label: string;
  initialValue: boolean;
}) {
  return (
    isActive !== null && (
      <div className="relative size-36">
        <Button onClick={() => handleClick()} type={'button'} label={label} />
      </div>
    )
  );
}
