import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, FileStack, Calendar, Globe, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { bayerSansClasses } from '../lib/bayer-sans';
import { useCampaignStore } from '../store/campaignStore';
import { CampaignObjective } from '../types';

const objectiveColors: Record<CampaignObjective, string> = {
  awareness: 'bg-blue-100 text-blue-800',
  consideration: 'bg-purple-100 text-purple-800',
  conversion: 'bg-green-100 text-green-800',
  loyalty: 'bg-yellow-100 text-yellow-800',
  advocacy: 'bg-orange-100 text-orange-800',
};

export const CampaignList = () => {
  const { campaigns } = useCampaignStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [objectiveFilter, setObjectiveFilter] = useState<string>('');
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesObjective = objectiveFilter === '' || 
      campaign.objectives.primary === objectiveFilter || 
      campaign.objectives.secondary === objectiveFilter;
    
    return matchesSearch && matchesObjective;
  });
  
  const objectiveOptions = [
    { value: '', label: 'All Objectives' },
    { value: 'awareness', label: 'Awareness' },
    { value: 'consideration', label: 'Consideration' },
    { value: 'conversion', label: 'Conversion' },
    { value: 'loyalty', label: 'Loyalty' },
    { value: 'advocacy', label: 'Advocacy' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={bayerSansClasses.heading.h2}>Campaigns</h1>
        <Link to="/campaigns/new">
          <Button icon={<PlusCircle size={18} />}>
            New Campaign
          </Button>
        </Link>
      </div>
      
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <Input
              placeholder="Search campaigns..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <Select
              options={objectiveOptions}
              value={objectiveFilter}
              onChange={(e) => setObjectiveFilter(e.target.value)}
              className="w-48"
            />
          </div>
        </div>
        
        <div className="mt-6">
          {filteredCampaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objective
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Geography
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assets
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <FileStack size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">
                              {campaign.languages.length} languages
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant="info"
                          className={objectiveColors[campaign.objectives.primary as CampaignObjective]}
                        >
                          {campaign.objectives.primary}
                        </Badge>
                        {campaign.objectives.secondary && (
                          <Badge
                            variant="default"
                            className="ml-2"
                          >
                            {campaign.objectives.secondary}
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={16} className="mr-1" />
                          <span>
                            {new Date(campaign.timeline.startDate).toLocaleDateString()} - {new Date(campaign.timeline.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Globe size={16} className="mr-1" />
                          <span>
                            {campaign.geography.countries.length > 1 
                              ? `${campaign.geography.countries[0]} +${campaign.geography.countries.length - 1}`
                              : campaign.geography.countries[0] || 'Global'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {campaign.keyVisuals.length} visuals
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            {campaign.channels.length} channels
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/campaigns/${campaign.id}`} className="text-blue-600 hover:text-blue-900">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileStack size={48} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No campaigns found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || objectiveFilter 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first campaign to get started'}
              </p>
              {!searchTerm && !objectiveFilter && (
                <Link to="/campaigns/new">
                  <Button>Create Campaign</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
