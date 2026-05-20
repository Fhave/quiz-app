import { useState, useEffect, type ChangeEvent } from "react";
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
  Modal,
} from "@mantine/core";
import { Edit, X, PlusCircle, CirclePlay } from "lucide-react";
import { useMantineColorScheme } from "@mantine/core";
import { useHeader } from "../context/HeaderContext";
import { useSession } from "../context/SessionContext";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { createSession, getSessions } from "../services/sessions";
import { createParticipants } from "../services/participants";
import { getParticipants } from "../services/participants";
import { notifications } from "@mantine/notifications";
import { type Session } from "../type";

function Home() {
  const [name, setName] = useState<string>("");
  const [participant, setParticipant] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const { colorScheme } = useMantineColorScheme();
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const { setSessionId, setSessionName, setSessionParticipants } = useSession();
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

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

  const handleSessionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleParticipantChange = (
    event: ChangeEvent<HTMLInputElement>,
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
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartSession = async (): Promise<void> => {
    localStorage.clear();

    if (!name.trim()) {
      notifications.show({
        title: "Error",
        message: "Please add a session name",
        color: "red",
      });
      return;
    }

    if (participants.length === 0) {
      notifications.show({
        title: "Error",
        message: "Please add at least one participant",
        color: "red",
      });
      return;
    }

    try {
      const sessionId = await createSession(name);
      const createdParticipants = await createParticipants(
        participants,
        sessionId,
      );

      setSessionId(sessionId);
      setSessionName(name);
      setSessionParticipants(createdParticipants);

      setName("");
      setParticipants([]);

      notifications.show({
        title: "Success",
        message: "Session created",
        color: "green",
      });

      navigate("/track");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: (error as Error).message,
        color: "red",
      });
    }
  };

  const handleViewSession = async (session: Session) => {
    localStorage.clear();
    try {
      const participants = await getParticipants(session.id);
      setSessionId(session.id);
      setSessionName(session.title);
      setSessionParticipants(participants);

      navigate("/track");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: (error as Error).message,
        color: "red",
      });
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
          value={name}
          onChange={handleSessionChange}
          rightSection={!name ? <Edit size={18} /> : null}
        />
      </Stack>

      <Stack pt="md">
        <Group justify="space-between" align="center">
          <Title order={4}>Current Participants</Title>

          <Badge color="blue" variant="light">
            {participants.length} ADDED
          </Badge>
        </Group>
      </Stack>

      {participants.map((p, i) => (
        <Paper
          key={i}
          mt="sm"
          p="md"
          radius="md"
          withBorder
          style={{
            backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
          }}
        >
          <Group justify="space-between">
            <Text>{p}</Text>
            <X
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => handleRemoveParticipant(i)}
            />
          </Group>
        </Paper>
      ))}

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
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
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

        {sessions.length > 0 ? (
          sessions.map((session) => (
            <Paper
              key={session.id}
              p="md"
              radius="md"
              withBorder
              style={{
                backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
              }}
            >
              <Group justify="space-between">
                <Stack gap={4}>
                  <Text fw={600}>{session.title}</Text>
                  <Text size="xs" c="dimmed">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </Text>
                </Stack>

                <Badge
                  color="blue"
                  variant="light"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewSession(session)}
                >
                  VIEW
                </Badge>
              </Group>
            </Paper>
          ))
        ) : (
          <Paper p="md" radius="md" withBorder>
            <Text size="xs" fw={500} c="dimmed">
              No sessions found
            </Text>
          </Paper>
        )}
      </Stack>

       {isLargeScreen ? (
         <Box
           style={{
             position: "absolute",
             bottom: "24px",
             left: "274px", // 250px sidebar + 24px margin
             right: "24px",
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
       ) : (
         <Box
           style={{
             position: "fixed",
             bottom: "80px",
             left: "-10px",
             width: "100%",
             padding: "0 40px",
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
       )}

      <Modal opened={opened} onClose={close} title="Add Participant" centered>
        <Input
          placeholder="Participant Name"
          mb="20px"
          value={participant}
          onChange={handleParticipantChange}
        />
        <Button onClick={handleAddParticipant}>ADD</Button>
      </Modal>
    </Container>
  );
}

export default Home;
