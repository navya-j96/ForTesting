import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { CampaignList } from './pages/CampaignList';
import { CampaignCreate } from './pages/CampaignCreate';
import { CampaignDetail } from './pages/CampaignDetail';
import { KeyVisualCreate } from './pages/KeyVisualCreate';
import { SpecificationList } from './pages/SpecificationList';
import { BrandComplianceSettings } from './pages/BrandComplianceSettings';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaigns/new" element={<CampaignCreate />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/campaigns/:campaignId/key-visuals/new" element={<KeyVisualCreate />} />
          <Route path="/specifications" element={<SpecificationList />} />
          <Route path="/settings" element={<BrandComplianceSettings />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}


export default App;
