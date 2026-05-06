import { useEffect } from 'react';
import { useHeader } from '../context/HeaderContext';
import {
  Container,
  Text,
  Stack,
  Group,
  Paper,
  Badge,
  Title
} from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';

function Summary(): JSX.Element {
  const { setTitle } = useHeader();
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    setTitle('Session Results');
  }, [setTitle]);

  return (
    <Container>
      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          backgroundColor:
            colorScheme === 'dark' ? '#1e293b' : '#ffffff',
        }}
      >
        <Stack gap={10}>
          <Text size="xs" fw={700} c="dimmed">
            SESSION OVERVIEW
          </Text>

          <Group align="flex-end" gap="xs">
            <Text size="30px" fw={700} c="blue">
              82%
            </Text>
            <Text size="xs" c="dimmed">
              Average Accuracy
            </Text>
          </Group>

          <Group>
            <Badge color="blue" variant="light" size="sm">45m Duration</Badge><Badge color="blue" variant="light" size="sm">12 Participants</Badge>
          </Group>
        </Stack>
      </Paper>

      <Stack mt="lg">
        <Title order={4}>Rankings</Title>

        {Array.from({ length: 4 }).map((_, i) => (
          <Paper
            key={i}
            p="md"
            radius="md"
            withBorder
            style={{
              backgroundColor:
                colorScheme === "dark" ? "#1e293b" : "#ffffff",
              marginTop: "-5px"
            }}
          >
            <Group justify="space-between">
              <Text>John Doe</Text>
              <Text>1st</Text>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default Summary;