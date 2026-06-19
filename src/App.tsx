import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { Member } from './pages/Member';
import { Store } from './pages/Store';
import { Events } from './pages/Events';
import { Profile } from './pages/Profile';
import { BottomNav } from './components/BottomNav';
import { PageTransition } from './components/PageTransition';

function AppContent() {
  const location = useLocation();
  
  const showBottomNav = !['/store'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-cream-50">
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/member" element={<Member />} />
          <Route path="/store" element={<Store />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </PageTransition>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
