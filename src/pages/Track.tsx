import { useState, useEffect } from 'react';
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

type AnswerType = "correct" | "wrong";

function Track(): JSX.Element {
  const { setTitle } = useHeader();

  const [modal, setModal] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answer, setAnswer] = useState<AnswerType>("correct");
  const [selectedParticipant, setSelectedParticipant] = useState<string>('Mary');

  useEffect(() => {
    setTitle('New Session');
  }, [setTitle]);

  return (
    <Container>
      <Group justify="space-between">
        <Stack gap="xs">
          <Text size="sm" fw={700} c="dimmed">PROGRESS</Text>
          <Text size="lg" fw={700}>Answered: 12/50</Text>
        </Stack>
        <NativeSelect
          value={selectedParticipant}
          onChange={(event) => setSelectedParticipant(event.currentTarget.value)}
          data={['Mary', 'Dick', 'Susan', 'Vance']}
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
          {Array.from({ length: 50 }).map((_, i) => (
            <ActionIcon
              key={i}
              variant={i < 12 ? "filled" : "light"}
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
                },
              }}
            >
              {i + 1}
            </ActionIcon>
          ))}
        </Flex>
      </Box>

      {modal && (
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
          <Text size='md' fw={700}>Question {selectedQuestion}</Text>
          <Text mb="15px">{selectedParticipant}</Text>
          <SegmentedControl
            fullWidth
            value={answer}
            onChange={(val) => setAnswer(val as "correct" | "wrong")}
            data={[
              { label: "Correct", value: "correct" },
              { label: "Wrong", value: "wrong" },
            ]}
          />
          <Button fullWidth color="blue" mt="md" onClick={() => setModal(false)}>
            Submit & Lock
          </Button>
        </Paper>
      )}
    </Container>
  )
}

export default Track