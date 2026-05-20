import { ActionIcon, Text, Stack, Paper } from '@mantine/core';
import { Home, Users, BarChart, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { type NavItem } from '../type';
import { useMantineColorScheme } from '@mantine/core';

function Sidebar() {
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();

  const navItems: NavItem[] = [
    { label: 'Sessions', icon: <Home size={20} />, path: '/' },
    { label: 'Track', icon: <Activity size={20} />, path: '/track' },
    { label: 'Participants', icon: <Users size={20} />, path: '/participants' },
    { label: 'Summary', icon: <BarChart size={20} />, path: '/summary' },
  ];

  return (
     <Paper
       shadow="md"
       p="xs"
       style={{
         width: 250,
         height: '100%',
         borderRadius: 0,
         backgroundColor: colorScheme === 'dark' ? '#2b2b2b' : '#faf9f6',
       }}
    >
      <Stack gap={2}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Stack
                align="center"
                gap={3}
                p="xs"
                radius="md"
                style={{
                  backgroundColor: isActive ? (colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent',
                }}
              >
                <ActionIcon
                  variant={isActive ? 'filled' : 'subtle'}
                  size="lg"
                  c={isActive ? (colorScheme === 'dark' ? 'white' : 'black') : undefined}
                >
                  {item.icon}
                </ActionIcon>

                <Text size="sm" c={isActive ? (colorScheme === 'dark' ? 'white' : 'black') : undefined}>
                  {item.label}
                </Text>
              </Stack>
            </Link>
          );
        })}
      </Stack>
    </Paper>
  );
}

export default Sidebar;