import {
  Button,
  Container,
  Title,
  Stack,
} from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';

function App() {
  const { setColorScheme, colorScheme } =
    useMantineColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Container size="sm" py="md">
      <Stack>
        <Title order={2}>Quiz Tracker</Title>

        <Button fullWidth>Save and continue</Button>

        <Button variant="outline" fullWidth onClick={toggleTheme}>
          Toggle {colorScheme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Stack>
    </Container>
  );
}

export default App;