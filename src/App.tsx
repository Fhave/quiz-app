import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
const Track = lazy(() => import('./pages/Track'));
const Participants = lazy(() => import('./pages/Participants'));
const Summary = lazy(() => import('./pages/Summary'));
import { Loader} from '@mantine/core';

export default function App() {
  return (
    <Suspense fallback={
       <Loader size={200} type="dots" style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 10, transform: 'translate(-50%, -50%)'}} />
    }>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </Suspense>
  );
}