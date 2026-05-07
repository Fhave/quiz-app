import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
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
  Box,
  Modal
} from "@mantine/core";
import { Edit, X, PlusCircle, CirclePlay } from "lucide-react";
import { useMantineColorScheme } from "@mantine/core";
import { useHeader } from '../context/HeaderContext';
import { useSession } from '../context/SessionContext';
import { useDisclosure } from '@mantine/hooks';
import { createSession, getSessions } from "../services/sessions";
import { createParticipants } from "../services/participants";
import { notifications } from '@mantine/notifications';

function Home(): JSX.Element {
  const [sessionName, setSessionName] = useState<string>("");
  const [participant, setParticipant] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const { colorScheme } = useMantineColorScheme();
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const { setSessionId, setSessionParticipants } = useSession();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const loadSessions = async (): Promise<void> => {
      const data = await getSessions();
      setSessions(data);
    };

    loadSessions();
  }, []);

  useEffect(() => {
    setTitle("Quiz Tracker");
  }, [setTitle]);

  const handleSessionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSessionName(event.target.value);
  };

  const handleParticipantChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setParticipant(event.target.value);
  };

  const handleAddParticipant = (): void => {
    if (!participant.trim()) return;
    setParticipants((prev) => [...prev, participant.trim()]);
    setParticipant("");
    close();
  };

  const handleRemoveParticipant = (index: number): void => {
    setParticipants((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleStartSession = async (): Promise<void> => {
    if (!sessionName.trim()) {
      notifications.show({
        title: 'Error',
        message: 'Please add a session name',
        color: 'red',
      });
      return;
    };

    if (participants.length === 0) {
      notifications.show({
        title: 'Error',
        message: 'Please add at least one participant',
        color: 'red',
      });
      return;
    };

    try {
      const session = await createSession(sessionName);
      await createParticipants(participants, session);
      setSessionId(session);
      setSessionParticipants(participants);
      setSessionName("");
      setParticipants([]);
      notifications.show({
        title: 'Success',
        message: 'Session created',
        color: 'green',
      });
      return;

      navigate('/track')
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
      return;
    }
  };

  return (
    <Container pb="60px">
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

      <Stack pt="lg" gap={8}>
        <Text size="sm" fw={700} c="dimmed">
          SESSION TITLE
        </Text>

        <Input
          placeholder="Session Name"
          value={sessionName}
          onChange={handleSessionChange}
          rightSection={!sessionName ? <Edit size={18} /> : null}
        />
      </Stack>

      <Stack pt="md">
        <Group justify="space-between" align="center">
          <Title order={4}>Current Participants</Title>

          <Badge color="blue" variant="light" size="sm">
            {participants.length} ADDED
          </Badge>
        </Group>
      </Stack>

      {participants.map((name, i) => (
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
            <Text>{name}</Text>
            <X size={18} style={{ cursor: "pointer" }} onClick={() => { handleRemoveParticipant(i) }} />
          </Group>
        </Paper>
      ))}

      <Modal opened={opened} onClose={close} title="Add Participant" centered>
        <Input placeholder="Participant Name" mb="20px" value={participant} onChange={handleParticipantChange} />
        <Button onClick={handleAddParticipant}>ADD</Button>
      </Modal>

      <Paper
        mt="sm"
        p="md"
        radius="md"
        withBorder
        onClick={open}
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

      <Stack pt="lg">
        <Title order={4}>Session History</Title>

        {sessions.map((session) => (
          <Paper
            key={session.id}
            p="md"
            radius="md"
            withBorder
            style={{
              backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff"
            }}
          >
            <Group justify="space-between" align="center">
              <Stack gap={4}>
                <Text fw={600}>{session.title}</Text>
                <Text size="xs" c="dimmed">
                  {new Date(session.createdAt).toLocaleDateString()}
                </Text>
              </Stack>

              <Badge color="blue" variant="light" style={{
                cursor: "pointer"
              }}
              >
                VIEW
              </Badge>
            </Group>
          </Paper>
        ))}
      </Stack>

      <Box
        style={{
          position: "fixed",
          bottom: "80px",
          left: "-10px",
          width: "100%",
          padding: '0 40px',
          zIndex: 20,
        }}
      >
        <Button
          fullWidth
          color="blue"
          size="lg"
          leftSection={<CirclePlay size={18} />}
          onClick={handleStartSession}
        >
          Start New Session
        </Button>
      </Box>
    </Container>
  );
}

export default Home;