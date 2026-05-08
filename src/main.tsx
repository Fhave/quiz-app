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
import { SessionProvider } from './context/SessionProvider.tsx';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ColorSchemeScript />
      <MantineProvider defaultColorScheme="light">
        <Notifications position="top-right" containerWidth={320}/>
        <HeaderProvider>
          <SessionProvider>
            <App />
          </SessionProvider>
        </HeaderProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
