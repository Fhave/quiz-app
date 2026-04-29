import { Container, Title, Group, ActionIcon } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import { useMantineColorScheme } from '@mantine/core';

function Header(): JSX.Element {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleTheme = (): void => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Container size="sm" py="md">
      <Group justify="space-between">
        <Title order={3}>Quiz Tracker</Title>

        <ActionIcon variant="subtle" onClick={toggleTheme}>
          {colorScheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </ActionIcon>
      </Group>
    </Container>
  );
}

export default Header;