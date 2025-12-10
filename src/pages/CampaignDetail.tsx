import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, FileStack, Calendar, Globe, Users, Image, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
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

export const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { campaigns, setCurrentCampaign, currentCampaign, deleteCampaign } = useCampaignStore();
  
  useEffect(() => {
    if (id) {
      setCurrentCampaign(id);
    }
  }, [id, setCurrentCampaign]);
  
  if (!currentCampaign) {
    return (
      <div className="text-center py-12">
        <FileStack size={48} className="mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">Campaign not found</h3>
        <p className="text-gray-500 mb-4">The campaign you're looking for doesn't exist or has been deleted</p>
        <Link to="/campaigns">
          <Button>Back to Campaigns</Button>
        </Link>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      deleteCampaign(currentCampaign.id);
      navigate('/campaigns');
    }
  };
  
  const overviewTab = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Campaign Details">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Campaign Name</h4>
              <p className="mt-1">{currentCampaign.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Objectives</h4>
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge className={objectiveColors[currentCampaign.objectives.primary as CampaignObjective]}>
                  {currentCampaign.objectives.primary} (Primary)
                </Badge>
                {currentCampaign.objectives.secondary && (
                  <Badge variant="default">
                    {currentCampaign.objectives.secondary} (Secondary)
                  </Badge>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
              <div className="mt-1 flex items-center">
                <Calendar size={16} className="mr-1 text-gray-400" />
                <span>
                  {new Date(currentCampaign.timeline.startDate).toLocaleDateString()} - {new Date(currentCampaign.timeline.endDate).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Timezone: {currentCampaign.timeline.timezone}</p>
            </div>
          </div>
        </Card>
        
        <Card title="Target Audience">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Demographics</h4>
              <div className="mt-1">
                {currentCampaign.targetAudience.demographics.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {currentCampaign.targetAudience.demographics.map((demo, index) => (
                      <li key={index} className="text-sm">
                        {typeof demo === 'string' ? demo : JSON.stringify(demo)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No demographics specified</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Psychographics</h4>
              <div className="mt-1">
                {currentCampaign.targetAudience.psychographics.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentCampaign.targetAudience.psychographics.map((psycho, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {psycho}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No psychographics specified</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Messaging">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Framework</h4>
              <p className="mt-1 text-sm">{currentCampaign.messaging.framework}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Value Proposition</h4>
              <p className="mt-1 text-sm">{currentCampaign.messaging.valueProposition}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Call to Action</h4>
              <div className="mt-1">
                <p className="text-sm">
                  <span className="font-medium">Primary:</span> {currentCampaign.messaging.callToAction.primary}
                </p>
                {currentCampaign.messaging.callToAction.secondary && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">Secondary:</span> {currentCampaign.messaging.callToAction.secondary}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Geography & Languages">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Target Markets</h4>
              <div className="mt-1 flex items-start">
                <Globe size={16} className="mr-1 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Countries:</span> {currentCampaign.geography.countries.join(', ')}
                  </p>
                  {currentCampaign.geography.regions && currentCampaign.geography.regions.length > 0 && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Regions:</span> {currentCampaign.geography.regions.join(', ')}
                    </p>
                  )}
                  {currentCampaign.geography.cities && currentCampaign.geography.cities.length > 0 && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Cities:</span> {currentCampaign.geography.cities.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Languages</h4>
              <div className="mt-1">
                {currentCampaign.languages.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentCampaign.languages.map((lang, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {lang.name || lang.code}
                        {lang.localization && (
                          <span className="ml-1 text-xs text-blue-600">+loc</span>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No languages specified</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
  
  const keyVisualsTab = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={bayerSansClasses.heading.h4}>Key Visuals</h3>
        <Link to={`/campaigns/${currentCampaign.id}/key-visuals/new`}>
          <Button size="sm" icon={<Image size={16} />}>
            Add Key Visual
          </Button>
        </Link>
      </div>
      
      {currentCampaign.keyVisuals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentCampaign.keyVisuals.map((keyVisual) => (
            <Card key={keyVisual.id} className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img
                  src={keyVisual.url}
                  alt={keyVisual.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900">{keyVisual.name}</h4>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant={keyVisual.type === 'upload' ? 'default' : 'info'}>
                    {keyVisual.type === 'upload' ? 'Uploaded' : 'AI Generated'}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(keyVisual.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Image size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No key visuals yet</h3>
          <p className="text-gray-500 mb-4">Add key visuals to your campaign</p>
          <Link to={`/campaigns/${currentCampaign.id}/key-visuals/new`}>
            <Button>Add Key Visual</Button>
          </Link>
        </div>
      )}
    </div>
  );
  
  const channelsTab = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={bayerSansClasses.heading.h4}>Channels & Specifications</h3>
        <Link to={`/campaigns/${currentCampaign.id}/channels/new`}>
          <Button size="sm" icon={<Layers size={16} />}>
            Add Channel
          </Button>
        </Link>
      </div>
      
      {currentCampaign.channels.length > 0 ? (
        <div className="space-y-6">
          {currentCampaign.channels.map((channel) => (
            <Card key={channel.id} title={channel.type}>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Formats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {channel.formats.map((format) => (
                    <div key={format.id} className="border border-gray-200 rounded-md p-4">
                      <h5 className="font-medium text-gray-900">{format.name}</h5>
                      <p className="text-sm text-gray-500 mt-1">{format.formatType}</p>
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Specifications:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {format.specifications.map((spec, index) => (
                            <Badge key={index} variant="default" className="text-xs">
                              {spec.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Layers size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No channels configured</h3>
          <p className="text-gray-500 mb-4">Add channels and specifications to your campaign</p>
          <Link to={`/campaigns/${currentCampaign.id}/channels/new`}>
            <Button>Add Channel</Button>
          </Link>
        </div>
      )}
    </div>
  );
  
  const assetsTab = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={bayerSansClasses.heading.h4}>Campaign Assets</h3>
        <Link to={`/campaigns/${currentCampaign.id}/assets/new`}>
          <Button size="sm">
            Add Asset
          </Button>
        </Link>
      </div>
      
      {currentCampaign.assets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCampaign.assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="default">
                      {asset.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.fileFormat.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(asset.fileSize / 1024).toFixed(1)} KB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    v{asset.version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(asset.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FileStack size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No assets uploaded</h3>
          <p className="text-gray-500 mb-4">Add assets to your campaign</p>
          <Link to={`/campaigns/${currentCampaign.id}/assets/new`}>
            <Button>Add Asset</Button>
          </Link>
        </div>
      )}
    </div>
  );
  
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
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className={bayerSansClasses.heading.h2}>{currentCampaign.name}</h1>
        
        <div className="flex space-x-2">
          <Link to={`/campaigns/${currentCampaign.id}/edit`}>
            <Button
              variant="outline"
              icon={<Edit size={18} />}
            >
              Edit
            </Button>
          </Link>
          
          <Button
            variant="danger"
            icon={<Trash2 size={18} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', content: overviewTab },
          { id: 'keyvisuals', label: 'Key Visuals', content: keyVisualsTab },
          { id: 'channels', label: 'Channels', content: channelsTab },
          { id: 'assets', label: 'Assets', content: assetsTab },
        ]}
        defaultTab="overview"
      />
    </div>
  );
};
