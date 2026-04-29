import { Outlet } from 'react-router-dom';
import { useMantineColorScheme } from '@mantine/core';
import Header from './Header';
import Navbar from './Navbar';

function Layout(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();

  const backgroundColor =
    colorScheme === 'light' ? '#f3f4f6' : '#0b1220';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <div style={{ flexDirection: 'row' }}>
        <Header />
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor,
          padding: '16px',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </div>

      <Navbar />
    </div>
  );
}

export default Layout;