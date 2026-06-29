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
import { updateSession } from '../services/sessions';
import { X } from 'lucide-react';
import type { SessionParticipant, AnswerType, Answer } from '../type';
import { useMediaQuery } from "@mantine/hooks";

function Track() {
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const {
    sessionId,
    sessionName,
    sessionParticipants,
    sessionQuestionCount,
    sessionEnded,
    setSessionAnswers,
    setSessionEnded,
    sessionAnswers,
  } = useSession();

  const [answers, setAnswers] = useState<Record<number, AnswerType>>({});
  const [modal, setModal] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answer, setAnswer] = useState<AnswerType>("correct");
  const [selectedParticipant, setSelectedParticipant] = useState<SessionParticipant | null>(
    sessionParticipants[0] || null
  );

  const isLargeScreen = useMediaQuery('(min-width: 768px)');

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
    if (sessionEnded) return;
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

      const currentIndex = sessionParticipants.findIndex(
        (participant) => participant.id === selectedParticipant.id,
      );

      if (currentIndex !== -1 && sessionParticipants.length > 0) {
        const nextIndex = (currentIndex + 1) % sessionParticipants.length;
        setSelectedParticipant(sessionParticipants[nextIndex]);
      }
    }
  }

  const handleEndSession = async () => {
    if (sessionId) {
      await updateSession(sessionId, { ended: true });
      setSessionEnded(true);
    }
    navigate('/participants');
  };

  const questionCount = sessionQuestionCount;

  return (
    <Container>
      <Group justify="space-between">
        <Stack gap="xs">
          <Text size="sm" fw={700} c="dimmed">PROGRESS</Text>
          <Text size="lg" fw={700}>
            Answered: {Object.keys(answers).length}/{questionCount}
          </Text>
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
          {Array.from({ length: questionCount }).map((_, i) => (
            <ActionIcon
              key={i}
              variant={"light"}
              radius="md"
              onClick={() => {
                if (sessionEnded) return;
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
            ...(isLargeScreen ? {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              height: "auto",
              borderRadius: '20px',
            } : {
              bottom: "60px",
              left: 0,
              width: "100%",
              padding: '16px',
              borderTopRadius: '20px',
            }),
            padding: isLargeScreen ? '24px' : '16px',
            zIndex: 20,
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

      <Stack mt="xl">
        <Text c={sessionEnded ? 'red' : 'dimmed'}>
          {sessionEnded ? 'Session ended. Answers are locked.' : 'Session active. You can leave and continue later.'}
        </Text>
        <Group justify="right">
          {sessionEnded ? null : (
            <>
              <Button
                color="blue"
                size="lg"
                onClick={() => navigate('/participants')}
              >
                Pause Session
              </Button>
              <Button
                color="red"
                size="lg"
                onClick={handleEndSession}
              >
                End Session
              </Button>
            </>
          )}
        </Group>
      </Stack>
    </Container>
  )
}

export default Track