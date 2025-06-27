import { Outlet, useLocation } from 'react-router-dom';
import {Navbar} from '../components';

const AppLayout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/signup', '/login'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default AppLayout;
