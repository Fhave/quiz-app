import { Group, ActionIcon, Text, Stack, Paper } from '@mantine/core';
import { Home, Users, BarChart, Activity } from 'lucide-react';

function Navbar() {
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
      }}
    >
      <Group justify="space-around">

        <Stack align="center" gap={2}>
          <ActionIcon variant="subtle">
            <Home size={20} />
          </ActionIcon>
          <Text size="xs">Sessions</Text>
        </Stack>

        <Stack align="center" gap={2}>
          <ActionIcon variant="subtle">
            <Activity size={20} />
          </ActionIcon>
          <Text size="xs">Track</Text>
        </Stack>

        <Stack align="center" gap={2}>
          <ActionIcon variant="subtle">
            <Users size={20} />
          </ActionIcon>
          <Text size="xs">Participants</Text>
        </Stack>

        <Stack align="center" gap={2}>
          <ActionIcon variant="subtle">
            <BarChart size={20} />
          </ActionIcon>
          <Text size="xs">Summary</Text>
        </Stack>

      </Group>
    </Paper>
  );
}

export default Navbar;