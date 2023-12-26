import { PropsWithChildren } from 'react';
import { classNames } from '../../utils/helpers';

export default function Tooltip({
  message,
  children,
  place = 'top'
}: PropsWithChildren & {
  message: string;
  place?: 'top' | 'bottom' | 'left' | 'right';
}) {
  return (
    <div className="group relative flex justify-center items-center ">
      {children}
      <span
        className={classNames(
          place === 'top'
            ? "bottom-[120%] after:content-[''] after:absolute after:left-1/2 after:top-[95%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-800"
            : '',
          place === 'bottom'
            ? "top-[120%] after:content-[''] after:absolute after:left-1/2 after:bottom-[95%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-800"
            : '',
          place === 'left'
            ? "right-[110%] after:content-[''] after:absolute after:left-[100%] after:bottom-1/2 after:translate-y-1/2 after:border-8 after:border-y-transparent after:border-r-transparent after:border-l-gray-800"
            : '',
          place === 'right'
            ? "left-[110%] after:content-[''] after:absolute after:right-[100%] after:bottom-1/2 after:translate-y-1/2 after:border-8 after:border-y-transparent after:border-l-transparent after:border-r-gray-800"
            : '',
          'absolute max-w-[14rem] w-max overflow-visible z-40 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100'
        )}
      >
        {message}
      </span>
    </div>
  );
}
