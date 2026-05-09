import { Group, ActionIcon, Text, Stack, Paper } from '@mantine/core';
import { Home, Users, BarChart, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { type NavItem } from '../type';

function Navbar() {
  const location = useLocation();

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
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        borderRadius: 0,
      }}
    >
      <Group justify="space-around">
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
                gap={2}
              >
                <ActionIcon
                  variant={isActive ? 'filled' : 'subtle'}
                >
                  {item.icon}
                </ActionIcon>

                <Text size="xs">
                  {item.label}
                </Text>
              </Stack>
            </Link>
          );
        })}
      </Group>
    </Paper>
  );
}

export default Navbar;