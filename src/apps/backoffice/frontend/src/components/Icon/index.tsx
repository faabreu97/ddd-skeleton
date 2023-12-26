import { ElementType } from 'react';
import { classNames } from '../../utils/helpers';

type Props = {
  icon: ElementType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
};

export default function Icon({
  icon: RenderIcon,
  size = 'md',
  className
}: Props) {
  const getIconSize = () => {
    switch (size) {
      case 'xs':
        return 'w-4';
      case 'sm':
        return 'w-5';
      case 'md':
        return 'w-6';
      case 'lg':
        return 'w-7';
      case 'xl':
        return 'w-8';
      case '2xl':
        return 'w-10';

      default:
        return 'w-5';
    }
  };

  return <RenderIcon className={classNames(getIconSize(), className || '')} />;
}
