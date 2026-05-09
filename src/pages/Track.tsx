import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Flex,
  Text,
  Group,
  Paper,
  Button,
  Box,
  NativeSelect,
  ActionIcon,
  SegmentedControl
} from "@mantine/core";
import { useHeader } from '../context/HeaderContext';
import { useSession } from '../context/SessionContext';
import { getAnswers, createAnswer } from '../services/answer';
import { X } from 'lucide-react';
import type { SessionParticipant, AnswerType, Answer } from '../type';

function Track() {
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const { sessionId, sessionName, sessionParticipants, setSessionAnswers, sessionAnswers } = useSession();

  const [answers, setAnswers] = useState<Record<number, AnswerType>>({});
  const [modal, setModal] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answer, setAnswer] = useState<AnswerType>("correct");
  const [selectedParticipant, setSelectedParticipant] = useState<SessionParticipant | null>(
    sessionParticipants[0] || null
  );

  useEffect(() => {
    if (!sessionName) {
      navigate('/');
    }
    setTitle(sessionName);
  }, [setTitle, sessionName, navigate]);

  useEffect(() => {
    const loadAnswers = async (): Promise<void> => {
      if (!sessionId) return;

      const dbAnswers = await getAnswers(sessionId);

      const answerMap: Record<number, AnswerType> = {};

      dbAnswers.forEach((answer) => {
        answerMap[answer.questionNumber] =
          answer.answer === 'correct' ? 'correct' : 'wrong';
      });

      setAnswers(answerMap);
    };

    loadAnswers();
  }, [sessionId]);

  const saveAnswer = async () => {
    if (selectedQuestion !== null && selectedParticipant && sessionId !== null && selectedParticipant.id !== undefined) {
      const answerData: Answer = {
        sessionId,
        participantId: selectedParticipant.id,
        questionNumber: selectedQuestion,
        answer,
        createdAt: Date.now()
      };
      await createAnswer(answerData as Answer);
      setSessionAnswers([...sessionAnswers, {
        participantId: selectedParticipant.id,
        questionNumber: selectedQuestion,
        answer,
      }]);
      setAnswers(prev => ({
        ...prev,
        [selectedQuestion]: answer
      }));
    }
  }

  const handleEndSession = async () => {
    navigate('/participants');
  }

  return (
    <Container>
      <Group justify="space-between">
        <Stack gap="xs">
          <Text size="sm" fw={700} c="dimmed">PROGRESS</Text>
          <Text size="lg" fw={700}>Answered: {Object.keys(answers).length}/25</Text>
        </Stack>
        <NativeSelect
          value={selectedParticipant?.id?.toString() ?? ''}
          onChange={(event) => {
            const participant = sessionParticipants.find(
              (p) => p.id?.toString() === event.currentTarget.value
            );
            if (participant) {
              setSelectedParticipant(participant);
            }
          }}
          data={sessionParticipants.map((participant) => ({
            value: participant.id?.toString() ?? '',
            label: participant.name,
          }))}
        />
      </Group>

      <Box mt="20px">
        <Flex
          gap="xs"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <ActionIcon
              key={i}
              variant={"light"}
              radius="md"
              onClick={() => {
                setSelectedQuestion(i + 1);
                setModal(true);
              }}
              styles={{
                root: {
                  flex: '0 0 calc(20% - var(--mantine-spacing-xs) * 0.8)',
                  aspectRatio: '1 / 1',
                  height: 'auto',
                  backgroundColor:
                    answers[i + 1] === 'correct'
                      ? 'green'
                      : answers[i + 1] === 'wrong'
                        ? 'red'
                        : undefined,
                  color:
                    answers[i + 1] ? 'white' : undefined,
                },
              }}
            >
              {i + 1}
            </ActionIcon>
          ))}
        </Flex>
      </Box>

      {(modal && selectedQuestion !== null && !Object.prototype.hasOwnProperty.call(answers, selectedQuestion)) && (
        <Paper
          style={{
            position: "fixed",
            bottom: "60px",
            left: 0,
            width: "100%",
            padding: '16px',
            zIndex: 20,
            borderTopRadius: '20px',
          }}
        >
          <Group justify="space-between">
            <Text size='md' fw={700}>Question {selectedQuestion}</Text>
            <X size={20} onClick={() => setModal(false)} style={{
              cursor: "pointer"
            }} />
          </Group>
          <Text mb="15px">{selectedParticipant?.name}</Text>
          <SegmentedControl
            fullWidth
            value={answer}
            onChange={(val) => setAnswer(val as "correct" | "wrong")}
            data={[
              { label: "Correct", value: "correct" },
              { label: "Wrong", value: "wrong" },
            ]}
          />
          <Button fullWidth color="blue" mt="md" onClick={() => {
            setModal(false);
            saveAnswer();
          }}>
            Submit & Lock
          </Button>
        </Paper>
      )}

      <Group mt="md" justify="right">
        <Button
          color="blue"
          size="lg"
          onClick={handleEndSession}
        >
          End Session
        </Button>
      </Group>
    </Container>
  )
}

export default Track