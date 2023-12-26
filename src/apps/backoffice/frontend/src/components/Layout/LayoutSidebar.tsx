import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logo_white from '../../assets/white-logo.png';
import useDarkModeDetector from '../../hooks/useDarkModeDetector';
import { useSignOut, useUser } from '../../hooks/user';
import { AppRoutes } from '../../utils/constants';
import { classNames } from '../../utils/helpers';
import { IconButton } from '../Button';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

export default function LayoutSidebar() {
  return (
    <div className="surface hidden md:flex h-screen w-60">
      <SidebarLinks />
    </div>
  );
}

export const SidebarLinks = ({
  onClickCallback
}: {
  onClickCallback?: () => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDarkMode = useDarkModeDetector();
  const { data: user } = useUser();

  const { mutate } = useSignOut();

  const sideBarItems = useMemo(() => {
    const items = [
      {
        icon: HomeIcon,
        title: 'Home',
        to: AppRoutes.dashboard
      }
    ];
    if (user?.role === 'owner') {
      items.push({
        icon: UserIcon,
        title: 'Users',
        to: AppRoutes.users
      });
    }
    return items;
  }, [user]);

  return (
    <div className="flex flex-col">
      <div className="lg:flex py-4 px-2">
        <img
          className=""
          src={isDarkMode ? logo_white : logo}
          alt="sidebar_logo"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <ul className="mt-2 flex flex-col gap-5">
          {sideBarItems.map((e, index) => {
            const isSelected = location.pathname === e.to;
            return (
              <Link
                key={index}
                onClick={() => {
                  onClickCallback && onClickCallback();
                }}
                className={classNames(
                  isSelected
                    ? 'text-secondary'
                    : 'text-gray-600 dark:text-gray-200'
                )}
                to={e.to}
              >
                <li
                  className={classNames(
                    'flex flex-row items-center',
                    isSelected ? 'border-l-secondary border-l-4' : 'ml-1'
                  )}
                >
                  <e.icon
                    className={classNames(
                      'h-5 ml-3 mr-3',
                      isSelected ? 'stroke-secondary' : ''
                    )}
                  />
                  {/* {isSelected ? e.iconActive : e.icon} */}

                  {e.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className={`flex items-center gap-1 p-3 w-full justify-between`}>
        <div className={`flex items-center gap-2 select-none`}>
          <div className="flex-1">
            <div className="bg-primary-light rounded-xl p-2">
              <UserIcon className="w-6 text-white" />
            </div>
          </div>
          <div className="md:w-32">
            <h6 className="text-base block truncate">{user?.name}</h6>
            <span className="text-xs block truncate">{user?.email}</span>
          </div>
        </div>
        <div>
          <Tooltip message="Log out" place="right">
            <IconButton
              onClick={() => {
                mutate(undefined, {
                  onSuccess: () => {
                    navigate(AppRoutes.root, { replace: true });
                  }
                });
              }}
              icon={<Icon icon={ArrowRightOnRectangleIcon} />}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
