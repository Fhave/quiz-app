import { useState, useEffect } from 'react';
import { useHeader } from '../context/HeaderContext';
import {
  Container,
  Title,
  Group,
  Badge,
  Paper,
  Text,
  Stack,
} from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';

function Participants(): JSX.Element {
  const { setTitle } = useHeader();
  const { colorScheme } = useMantineColorScheme();

  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null);

  useEffect(() => {
    setTitle('Session Name');
  }, [setTitle]);

  const participants = Array.from({ length: 3 });

  return (
    <Container>
      <Group justify="space-between" align="center">
        <Title order={4}>Participants</Title>
        <Badge color="blue" variant="light" size="sm">
          {participants.length} TOTAL
        </Badge>
      </Group>

      {participants.map((_, i) => {
        const isOpen = selectedParticipant === i;
        return (
          <Paper
            key={i}
            mt="sm"
            p="md"
            radius="md"
            withBorder
            onClick={() =>
              setSelectedParticipant(isOpen ? null : i)
            }
            style={{
              cursor: 'pointer',
              backgroundColor:
                colorScheme === 'dark' ? '#1e293b' : '#ffffff',
            }}
          >
            <Stack gap={6}>
              <Group justify="space-between">
                <Text>John Doe</Text>
                <Text>40 points</Text>
              </Group>

              {isOpen && (
                <Stack mt="xs">
                  <Text size="sm" c="dimmed">
                    Questions Answered
                  </Text>
                  <Text size="sm">1, 2, 5, 7</Text>
                </Stack>
              )}
            </Stack>
          </Paper>
        );
      })}
    </Container>
  );
}

export default Participants;