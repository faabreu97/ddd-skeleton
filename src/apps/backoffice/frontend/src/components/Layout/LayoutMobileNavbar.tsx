import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import logo_white from '../../assets/white-logo.png';
import useDarkModeDetector from '../../hooks/useDarkModeDetector';
import { IconButton } from '../Button';
import Drawer from '../Drawer';
import Icon from '../Icon';
import { SidebarLinks } from './LayoutSidebar';

export default function LayoutMobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isDarkMode = useDarkModeDetector();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 py-2 md:hidden">
        <img
          className="h-8 w-auto"
          src={isDarkMode ? logo_white : logo}
          alt="ABA Toolkit"
          // width={100}
          // height={100}
        />
        <div>
          <IconButton
            onClick={() => setIsOpen(true)}
            icon={<Icon icon={Bars3Icon} />}
          />
        </div>
        {/* <Icon icon={Bars3Icon} /> */}
        {/* <Bars3Icon className="w-5" /> */}
        {/* </IconButton> */}
      </div>
      <Drawer isOpen={isOpen} handleClose={handleClose}>
        <div className="flex surface h-screen ">
          <SidebarLinks
            onClickCallback={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </Drawer>
    </>
  );
}
