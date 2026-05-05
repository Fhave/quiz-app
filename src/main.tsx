import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  MantineProvider,
  ColorSchemeScript,
} from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { HeaderProvider } from './context/HeaderProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ColorSchemeScript />
      <MantineProvider defaultColorScheme="light">
        <HeaderProvider>
        <App />
        </HeaderProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
