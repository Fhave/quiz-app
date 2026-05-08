import { useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useHeader } from '../context/HeaderContext';

import {
  Container,
  Text,
  Stack,
  Group,
  Paper,
  Badge,
  Title,
  Progress
} from '@mantine/core';

import { Trophy } from 'lucide-react';

import { useMantineColorScheme } from '@mantine/core';
import { useSession } from '../context/SessionContext';

function Summary(): JSX.Element {
  const { setTitle } = useHeader();

  const navigate = useNavigate();

  const { colorScheme } = useMantineColorScheme();

  const {
    sessionName,
    sessionParticipants,
    sessionAnswers,
  } = useSession();

  useEffect(() => {
    if (!sessionName) {
      navigate('/');
      return;
    }

    setTitle(`${sessionName} Results`);
  }, [setTitle, sessionName, navigate]);

  const groupedAnswers = useMemo(() => {
    return Object.values(
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
    ).sort((a, b) => b.score - a.score);
  }, [sessionAnswers, sessionParticipants]);

  const totalAnswers = sessionAnswers.length;

  const totalCorrectAnswers = sessionAnswers.filter(
    (answer) => answer.answer === 'correct'
  ).length;

  const averageAccuracy =
    totalAnswers > 0
      ? Math.round(
        (totalCorrectAnswers / totalAnswers) * 100
      )
      : 0;

  return (
    <Container pb="80px">

      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          backgroundColor:
            colorScheme === 'dark'
              ? '#1e293b'
              : '#ffffff',
        }}
      >
        <Stack gap={10}>
          <Text size="xs" fw={700} c="dimmed">
            SESSION OVERVIEW
          </Text>

          <Group align="flex-end" gap="xs">
            <Text size="30px" fw={700} c="blue">
              {averageAccuracy}%
            </Text>

            <Text size="xs" c="dimmed">
              Average Accuracy
            </Text>
          </Group>

          <Progress
            value={averageAccuracy}
            radius="xl"
          />

          <Group>
            <Badge
              color="blue"
              variant="light"
              size="sm"
            >
              {sessionParticipants.length} Participants
            </Badge>

            <Badge
              color="green"
              variant="light"
              size="sm"
            >
              {totalAnswers} Answers
            </Badge>
          </Group>
        </Stack>
      </Paper>

      <Stack mt="lg" gap="sm">
        <Title order={4}>Rankings</Title>

        {groupedAnswers.map((participant, index) => (
          <Paper
            key={participant.participantId}
            p="md"
            radius="md"
            withBorder
            style={{
              backgroundColor:
                colorScheme === "dark"
                  ? "#1e293b"
                  : "#ffffff",
            }}
          >
            <Group justify="space-between">
              <Group gap="sm">
                {index === 0 && (
                  <Trophy
                    size={18}
                    color="#eab308"
                  />
                )}

                <Stack gap={0}>
                  <Text fw={600}>
                    {participant.participantName}
                  </Text>

                  <Text
                    size="xs"
                    c="dimmed"
                  >
                    {
                      participant.answers.length
                    }{" "}
                    Questions Answered
                  </Text>
                </Stack>
              </Group>

              <Stack
                gap={0}
                align="flex-end"
              >
                <Text fw={700}>
                  {participant.score} pts
                </Text>

                <Text
                  size="xs"
                  c="dimmed"
                >
                  #{index + 1}
                </Text>
              </Stack>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default Summary;