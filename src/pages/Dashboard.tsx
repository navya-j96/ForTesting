import { Link } from 'react-router-dom';
import { PlusCircle, FileStack, Image, Layers, Shield, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { bayerSansClasses } from '../lib/bayer-sans';
import { useCampaignStore } from '../store/campaignStore';

export const Dashboard = () => {
  const { campaigns } = useCampaignStore();
  
  const recentCampaigns = campaigns.slice(0, 3);
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className={bayerSansClasses.heading.h2}>Dashboard</h1>
        <Link to="/campaigns/new">
          <Button icon={<PlusCircle size={18} />}>
            New Campaign 1
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <FileStack size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Active Campaigns</h3>
              <p className="text-3xl font-bold mt-1">{campaigns.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Image size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Key Visuals</h3>
              <p className="text-3xl font-bold mt-1">
                {campaigns.reduce((total, campaign) => total + campaign.keyVisuals.length, 0)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Layers size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Channels</h3>
              <p className="text-3xl font-bold mt-1">
                {campaigns.reduce((total, campaign) => total + campaign.channels.length, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Recent Campaigns">
            {recentCampaigns.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {campaign.objectives.primary} Ã¢ÂÂ¢ {campaign.timeline.startDate} to {campaign.timeline.endDate}
                        </p>
                      </div>
                      <Link to={`/campaigns/${campaign.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Image size={16} className="mr-1" />
                        <span>{campaign.keyVisuals.length} visuals</span>
                      </div>
                      <div className="flex items-center">
                        <Layers size={16} className="mr-1" />
                        <span>{campaign.channels.length} channels</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileStack size={48} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No campaigns yet</h3>
                <p className="text-gray-500 mb-4">Create your first campaign to get started</p>
                <Link to="/campaigns/new">
                  <Button>Create Campaign</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
        
        <div>
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Link to="/campaigns/new" className="block">
                <Button variant="outline" fullWidth icon={<FileStack size={18} />}>
                  New Campaign
                </Button>
              </Link>
              <Link to="/key-visuals" className="block">
                <Button variant="outline" fullWidth icon={<Image size={18} />}>
                  Manage Key Visuals
                </Button>
              </Link>
              <Link to="/specifications" className="block">
                <Button variant="outline" fullWidth icon={<Layers size={18} />}>
                  Edit Specifications
                </Button>
              </Link>
              <Link to="/settings" className="block">
                <Button variant="outline" fullWidth icon={<Shield size={18} />}>
                  Brand Compliance
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card title="System Status" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Brand Rules</span>
                </div>
                <span className="text-sm text-gray-500">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Specifications</span>
                </div>
                <span className="text-sm text-gray-500">7 Available</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">AI Generation</span>
                </div>
                <span className="text-sm text-gray-500">Ready</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
