import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function QuoteStatus({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': !isActive,
          'bg-green-500 text-white': isActive,
        },
      )}
    >
      {isActive ? (
        <>
          Active
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {!isActive ? (
        <>
          Inactive
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
