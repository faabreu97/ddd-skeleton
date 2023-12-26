import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export function Select({
  id,
  label,
  name,
  children,
  row = false,

  ...props
}: DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  id?: string;
  label?: string;
  row?: boolean;
  name?: string;
}) {
  if (row) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center w-full">
        {label && (
          <label htmlFor={id} className="sm:flex-1 input-label">
            {label}
          </label>
        )}
        <div className="sm:flex-1 ">
          <select name={name} {...props}>
            {children}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="input-label ">
          {label}
        </label>
      )}
      <select name={name} {...props}>
        {children}
      </select>
    </div>
  );
}
