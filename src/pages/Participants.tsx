import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../context/HeaderContext";
import {
  Container,
  Title,
  Group,
  Badge,
  Paper,
  Text,
  Stack,
} from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { CheckCircle, XCircle } from "lucide-react";
import { useSession } from "../context/SessionContext";
import { getParticipantsBySession } from "../services/participants";
import { getSessionAnswersList } from "../services/answer";
import { notifications } from "@mantine/notifications";

function Participants(): JSX.Element {
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const { sessionId, sessionName, sessionParticipants, setSessionParticipants, sessionAnswers, setSessionAnswers } = useSession();
  const { colorScheme } = useMantineColorScheme();
  console.log(sessionId)

  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!sessionName) {
      navigate('/');
      return;
    }

    setTitle(sessionName);


    const fetchParticipants = async () => {
      try {
        const participants = await getParticipantsBySession(sessionId);
        const dbAnswers = await getSessionAnswersList(sessionId);
        console.log(dbAnswers)
        setSessionParticipants(participants);
        setSessionAnswers(dbAnswers)
      } catch (error) {
        notifications.show({
          title: "Error",
          message: error.message,
          color: "red",
        });
      }
    };

    fetchParticipants();
  }, [setTitle, sessionName, navigate, sessionId, setSessionParticipants, sessionParticipants, setSessionAnswers]);

  const groupedAnswers = Object.values(
    sessionAnswers.reduce((acc, current) => {
      const {
        participantId,
        questionNumber,
        answer,
      } = current;

      const participant = sessionParticipants.find(
        (p) => p.id === participantId
      );

      const participantName =
        participant?.name || 'Unknown Participant';

      if (!acc[participantId]) {
        acc[participantId] = {
          participantId,
          participantName,
          answers: [],
          score: 0,
        };
      }

      acc[participantId].answers.push({
        number: questionNumber,
        answer,
      });

      if (answer === 'correct') {
        acc[participantId].score += 1;
      }

      return acc;
    }, {} as Record<
      number,
      {
        participantId: number;
        participantName: string;
        answers: {
          number: number;
          answer: 'correct' | 'wrong';
        }[];
        score: number;
      }
    >)
  );

  return (
    <Container>
      <Group justify="space-between" align="center">
        <Title order={4}>Participants</Title>
        <Badge color="blue" variant="light" size="sm">
          {groupedAnswers.length} TOTAL
        </Badge>
      </Group>

      {groupedAnswers.map((_, i) => {
        const isOpen = selectedParticipant === i;
        return (
          <Paper
            key={i}
            mt="sm"
            p="md"
            radius="md"
            withBorder
            onClick={() => setSelectedParticipant(isOpen ? null : i)}
            style={{
              cursor: "pointer",
              backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
            }}
          >
            <Stack gap={6}>
              <Group justify="space-between">
                <Text>{groupedAnswers[i].participantName}</Text>
                <Text>{groupedAnswers[i].score} points</Text>
              </Group>

              {isOpen && (
                <Stack mt="xs">
                  <Text size="sm" c="dimmed">
                    Questions Answered
                  </Text>

                  <Group gap="xs" wrap="wrap">
                    {groupedAnswers[i].answers.map((q) => (
                      <Paper
                        key={q.number}
                        px="sm"
                        py={4}
                        radius="md"
                        withBorder
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          backgroundColor:
                            colorScheme === "dark" ? "#334155" : "#f1f5f9",
                        }}
                      >
                        <Text size="xs" fw={600}>
                          {q.number}
                        </Text>

                        {q.answer === "correct" ? (
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
