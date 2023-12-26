import {
  EyeIcon,
  EyeSlashIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState
} from 'react';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

export function Input({
  id,
  label,
  name,
  row = false,
  tooltip,
  type = 'text',
  error,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id?: string;
  label?: string;
  name?: string;
  tooltip?: { text: string; place?: 'top' | 'bottom' | 'left' | 'right' };
  row?: boolean;
  type?: HTMLInputTypeAttribute;
  error?: string;
}) {
  if (type === 'password') {
    return (
      <PasswordInput
        id={id}
        label={label}
        name={name}
        tooltip={tooltip?.text}
        error={error}
        {...props}
      />
    );
  }
  if (row) {
    return (
      <div className="flex flex-col w-full sm:flex-row sm:items-center">
        {label && (
          <label htmlFor={id} className="sm:flex-1 input-label">
            {label}
          </label>
        )}
        <div className="sm:flex-1">
          <input id={id} name={name} type={type} {...props} />
        </div>
      </div>
    );
  }
  if (type === 'checkbox' || type === 'radio')
    return (
      <div className="flex items-center gap-2 p-1">
        <input id={id} name={name} type={type} {...props} />
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      </div>
    );
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="input-label flex gap-1">
          {label}
          {tooltip && (
            <Tooltip message={tooltip.text} place={tooltip.place}>
              <QuestionMarkCircleIcon className="w-4" />
            </Tooltip>
          )}
        </label>
      )}
      <input id={id} name={name} type={type} {...props} />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

const PasswordInput = ({
  id,
  label,
  name,
  tooltip,
  error,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id?: string;
  label?: string;
  name?: string;
  tooltip?: string;
  error?: string;
}) => {
  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(value => !value);
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="input-label flex gap-2">
        {label}
        {tooltip && (
          <Tooltip message={tooltip}>
            <QuestionMarkCircleIcon className="w-4" />
          </Tooltip>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPass ? 'text' : 'password'}
          className="pr-12"
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
          onClick={togglePasswordVisibility}
        >
          <input
            className="hidden js-password-toggle"
            id="toggle"
            type="checkbox"
          />
          {showPass ? <Icon icon={EyeSlashIcon} /> : <Icon icon={EyeIcon} />}
        </button>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
