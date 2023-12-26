import { Outlet } from 'react-router-dom';
import LayoutMobileNavbar from './LayoutMobileNavbar';
import LayoutSidebar from './LayoutSidebar';

export default function Layout() {
  return (
    <div className="flex h-screen w-screen">
      <LayoutSidebar />
      <div className="flex flex-col flex-1 h-screen w-full">
        <LayoutMobileNavbar />
        <div className="overflow-y-scroll overflow-x-hidden w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
