import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export function TextArea({
  id,
  label,
  name,
  ...props
}: DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  id?: string;
  label?: string;
  name?: string;
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="input-label ">
          {label}
        </label>
      )}
      <textarea
        name={name}
        // className={
        // 	"block w-full p-2 text-gray-900 border border-gray-300 rounded-lg " +
        // 	"bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 " +
        // 	"dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        // 	"dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
        // }
        {...props}
      />
    </div>
  );
}
