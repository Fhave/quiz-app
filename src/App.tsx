import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;