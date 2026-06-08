
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import PropertiesManager from './pages/PropertiesManager';
import BuyRequests from './pages/BuyRequests';
import ReviewsManager from './pages/ReviewsManager';
import UsersManager from './pages/UsersManager';
import VisitsManager from './pages/VisitsManager';
import AdminAccount from './pages/AdminAccount';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertiesManager />} />
          <Route path="buy-requests" element={<BuyRequests />} />
          <Route path="reviews" element={<ReviewsManager />} />
          <Route path="users" element={<UsersManager />} />
          <Route path="visits" element={<VisitsManager />} />
          <Route path="account" element={<AdminAccount />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
