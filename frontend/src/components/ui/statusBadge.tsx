// StatusBadge.jsx
import React from 'react';

import { formatStatusText } from './formatStatusText';

const statusColorClasses = {
  ACTIVE: 'bg-greenAccent text-green',
  INACTIVE: 'bg-redAccent text-red',
  PRIVATE: 'bg-yellowAccent text-yellow',
  NEW: 'bg-blueAccent text-blue',
  PENDING: 'bg-yellowAccent text-yellow',
  UNDER_REVIEW: 'bg-purpleAccent text-purple',
  ACCEPTED: 'bg-greenAccent text-green',
  CONFIRMED: 'bg-blueAccent text-blue',
  PARTIALLY_BOOKED: 'bg-orangeAccent text-orange',
  ON_HOLD: 'bg-greyAccent text-grey',
  DENIED: 'bg-redAccent text-red',
  CANCELLED: 'bg-pinkAccent text-pink',
  EXPIRED: 'bg-grayAccent text-gray',
  DRAFT: 'bg-orangeAccent text-orange',
  PAID: 'bg-greenAccent text-green',
  UNPAID: 'bg-redAccent text-red',
  IN_PROGRESS: 'bg-yellowAccent text-yellow'
};

const StatusBadge = ({
  status
}: {
  status:
    | 'ACTIVE'
    | 'INACTIVE'
    | 'PRIVATE'
    | 'NEW'
    | 'PENDING'
    | 'UNDER_REVIEW'
    | 'ACCEPTED'
    | 'CONFIRMED'
    | 'PARTIALLY_BOOKED'
    | 'ON_HOLD'
    | 'DENIED'
    | 'CANCELLED'
    | 'EXPIRED'
    | 'PENDING' |
    'PAID' | 'UNPAID' | 'IN_PROGRESS';
}) => {
  const colorClass = statusColorClasses[status] || 'bg-grayAccent text-gray';
  const formattedStatus = formatStatusText(status);

  return (
    <span
      className={`inline-block rounded-full p-1 text-base ${colorClass} w-fit min-w-20 px-4 text-center`}
    >
      {formattedStatus}
    </span>
  );
};

export default StatusBadge;
