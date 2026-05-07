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
import { Notifications } from '@mantine/notifications';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ColorSchemeScript />
      <MantineProvider defaultColorScheme="light">
        <Notifications position="top-right" containerWidth={320}/>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
