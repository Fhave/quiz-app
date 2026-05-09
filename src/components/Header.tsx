import { Container, Title, Group, ActionIcon } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import { useMantineColorScheme } from '@mantine/core';
import { useHeader } from '../context/HeaderContext';

function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { title } = useHeader();

  const toggleTheme = (): void => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Container size="sm" py="md">
      <Group justify="space-between">
        <Title order={3}>{title}</Title>

        <ActionIcon variant="subtle" onClick={toggleTheme}>
          {colorScheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </ActionIcon>
      </Group>
    </Container>
  );
}

export default Header;