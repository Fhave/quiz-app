import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  MantineProvider,
  ColorSchemeScript,
} from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ColorSchemeScript />
      <MantineProvider defaultColorScheme="light">
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
