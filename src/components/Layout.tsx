import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import { useMantineColorScheme } from '@mantine/core';

function Layout() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background:
            colorScheme === 'dark' ? '#020617' : '#ffffff',
        }}
      >
        <Header />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          paddingBottom: '80px',
          backgroundColor:
            colorScheme === 'dark' ? '#0f172a' : '#f1f5f9',
        }}
      >
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}

export default Layout;