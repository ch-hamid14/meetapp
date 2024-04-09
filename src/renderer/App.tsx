import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { SocketProvider, PeerProvider } from './providers';
import { MeetingScreen } from './pages/meeting';

export default function App() {
  return (
    <SocketProvider>
      <PeerProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path=
            // "/room/:roomId"
            "/"
             element={<MeetingScreen />} />
          </Routes>
        </Router>
      </PeerProvider>
    </SocketProvider>
  );
}
