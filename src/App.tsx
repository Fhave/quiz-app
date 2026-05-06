import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Track from './pages/Track';
import Participants from './pages/Participants';
import Summary from './pages/Summary';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/summary" element={<Summary />} />
      </Route>
    </Routes>
  );
}

export default App;