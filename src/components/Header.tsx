import { Container, Title, ActionIcon, Group } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import { useMantineColorScheme } from '@mantine/core';

function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Container size="sm" py="md">
      <Group justify="space-between">
        <Title order={2}>Quiz Tracker</Title>

        <ActionIcon variant="subtle" onClick={toggleTheme}>
          {colorScheme === 'light' ? (
            <Moon color="black" />
          ) : (
            <Sun color="white" />
          )}
        </ActionIcon>
      </Group>
    </Container>
  );
}

export default Header;