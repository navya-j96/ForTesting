import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CampaignForm } from '../components/campaign/CampaignForm';
import { bayerSansClasses } from '../lib/bayer-sans';
import { useCampaignStore } from '../store/campaignStore';

export const CampaignCreate = () => {
  const navigate = useNavigate();
  const { createCampaign } = useCampaignStore();
  
  const handleSubmit = (data: any) => {
    const campaignId = createCampaign(data);
    navigate(`/campaigns/${campaignId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate('/campaigns')}
        >
          Back to Campaigns
        </Button>
      </div>
      
      <h1 className={bayerSansClasses.heading.h2}>Create New Campaign</h1>
      
      <CampaignForm onSubmit={handleSubmit} />
    </div>
  );
};
