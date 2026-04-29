import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  MantineProvider,
  ColorSchemeScript,
} from '@mantine/core';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorSchemeScript />
    <MantineProvider defaultColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
)
