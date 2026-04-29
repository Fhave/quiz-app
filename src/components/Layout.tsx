import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

function Layout() {
  return (
    <div
      style={{ minHeight: '100vh' }}
    >
      <Header />

      <div style={{ flex: 1, paddingBottom: '70px', marginLeft: '20px', marginRight: '20px' }}>
        <Outlet />
      </div>

      <Navbar />
    </div>
  );
}

export default Layout;