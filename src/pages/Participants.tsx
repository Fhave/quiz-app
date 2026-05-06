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
import { CheckCircle, XCircle } from 'lucide-react';

type QuestionResult = {
  number: number;
  correct: boolean;
};

function Participants(): JSX.Element {
  const { setTitle } = useHeader();
  const { colorScheme } = useMantineColorScheme();

  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null);

  useEffect(() => {
    setTitle('Session Name');
  }, [setTitle]);

  const participants = Array.from({ length: 3 });

  const results: QuestionResult = [
    { number: 1, correct: true },
    { number: 2, correct: false },
    { number: 5, correct: true },
    { number: 7, correct: false },
  ];

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

                  <Group gap="xs" wrap="wrap">
                    {results.map((q) => (
                      <Paper
                        key={q.number}
                        px="sm"
                        py={4}
                        radius="md"
                        withBorder
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor:
                            colorScheme === 'dark' ? '#334155' : '#f1f5f9',
                        }}
                      >
                        <Text size="xs" fw={600}>
                          {q.number}
                        </Text>

                        {q.correct ? (
                          <CheckCircle size={14} color="green" />
                        ) : (
                          <XCircle size={14} color="red" />
                        )}
                      </Paper>
                    ))}
                  </Group>
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