import { useState, ChangeEvent } from "react";
import {
  Container,
  Stack,
  Title,
  Text,
  Input,
  Group,
  Badge,
  Paper,
  Button,
  Box
} from "@mantine/core";
import { Edit, X, PlusCircle, CirclePlay } from "lucide-react";
import { useMantineColorScheme } from "@mantine/core";
import { useHeader } from '../context/HeaderContext';

function Home(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const { colorScheme } = useMantineColorScheme();
  const { setTitle } = useHeader();

  useState(() => {
    setTitle("Quiz Tracker");
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Container>
      <Stack
        p="20px"
        style={{
          borderRadius: "10px",
          backgroundColor: "#3b82f6",
          color: "white",
        }}
      >
        <Title order={3}>New Session</Title>
        <Text>
          Prepare your competition environment and track participant progress
        </Text>
      </Stack>

      <Stack pt="md" gap={8}>
        <Text size="sm" fw={700} c="dimmed">
          SESSION TITLE
        </Text>

        <Input
          placeholder="Session Name"
          value={value}
          onChange={handleChange}
          rightSection={!value ? <Edit size={18} /> : null}
        />
      </Stack>

      <Stack pt="md">
        <Group justify="space-between" align="center">
          <Title order={4}>Current Participants</Title>

          <Badge color="blue" variant="light" size="sm">
            2 JOINED
          </Badge>
        </Group>
      </Stack>

      {Array.from({ length: 2 }).map((_, i) => (
        <Paper
          key={i}
          mt="sm"
          p="md"
          radius="md"
          withBorder
          style={{
            backgroundColor:
              colorScheme === "dark" ? "#1e293b" : "#ffffff",
          }}
        >
          <Group justify="space-between">
            <Text>John Doe</Text>
            <X size={18} style={{ cursor: "pointer" }} />
          </Group>
        </Paper>
      ))}

      <Paper
        mt="sm"
        p="md"
        radius="md"
        withBorder
        style={{
          borderStyle: "dashed",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor:
            colorScheme === "dark" ? "#1e293b" : "#ffffff",
        }}
      >
        <Group justify="center" gap={6}>
          <PlusCircle size={18} />
          <Text size="sm" fw={500} c="dimmed">
            ADD PARTICIPANT
          </Text>
        </Group>
      </Paper>

      <Box
        style={{
          position: "fixed",
          bottom: "80px",
          left: 0,
          width: "100%",
          padding: '16px',
          zIndex: 20,
        }}
      >
        <Button
          fullWidth
          color="blue"
          size="lg"
          leftSection={<CirclePlay size={18} />}
        >
          Start New Session
        </Button>
      </Box>
    </Container>
  );
}

export default Home;