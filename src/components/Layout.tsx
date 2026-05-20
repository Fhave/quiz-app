import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function Layout() {
  const { colorScheme } = useMantineColorScheme();
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#f1f5f9',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          // zIndex: 5,
          background: colorScheme === 'dark' ? '#020617' : '#ffffff',
        }}
      >
        <Header />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {isLargeScreen ? (
          <>
            <Sidebar
              style={{
                width: 250,
                backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#f1f5f9',
                borderRight: colorScheme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
              }}
            />
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                paddingBottom: '64px', // Reduced from 80px to account for button
                backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#f1f5f9',
              }}
            >
              <Outlet />
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              paddingBottom: '80px',
              backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#f1f5f9',
            }}
          >
            <Outlet />
          </div>
        )}
      </div>
      {isLargeScreen ? null : (
        <Navbar
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 900,
            backgroundColor: colorScheme === 'dark' ? '#020617' : '#ffffff',
          }}
        />
      )}
    </div>
  );
}

export default Layout;