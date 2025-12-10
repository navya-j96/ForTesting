import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Wand2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { bayerSansClasses } from '../lib/bayer-sans';
import { KeyVisualUploader } from '../components/keyvisual/KeyVisualUploader';
import { AIKeyVisualGenerator } from '../components/keyvisual/AIKeyVisualGenerator';
import { useCampaignStore } from '../store/campaignStore';

export const KeyVisualCreate = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { addKeyVisual } = useCampaignStore();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const handleUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };
  
  const handleSaveUploaded = () => {
    if (!campaignId || uploadedFiles.length === 0) return;
    
    // In a real app, we would upload these files to a server
    // For this demo, we'll create mock URLs
    uploadedFiles.forEach(file => {
      const mockUrl = `https://example.com/uploads/${file.name}`;
      
      addKeyVisual(campaignId, {
        name: file.name,
        type: 'upload',
        url: mockUrl,
        fileFormat: file.name.split('.').pop() as 'jpg' | 'png' | 'psd',
      });
    });
    
    navigate(`/campaigns/${campaignId}`);
  };
  
  const handleGenerateAI = (data: { creativeBrief: string, referenceImage?: File }) => {
    if (!campaignId) return;
    
    // In a real app, we would send this to an AI service
    // For this demo, we'll create a mock result
    const mockUrl = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    
    addKeyVisual(campaignId, {
      name: `AI Generated - ${new Date().toLocaleDateString()}`,
      type: 'ai-generated',
      url: mockUrl,
      fileFormat: 'jpg',
      aiParams: {
        creativeBrief: data.creativeBrief,
        referenceImageUrl: data.referenceImage ? URL.createObjectURL(data.referenceImage) : undefined,
      }
    });
    
    navigate(`/campaigns/${campaignId}`);
  };
  
  const uploadTab = (
    <div className="space-y-6">
      <KeyVisualUploader onUpload={handleUpload} />
      
      <div className="flex justify-end">
        <Button
          onClick={handleSaveUploaded}
          disabled={uploadedFiles.length === 0}
          icon={<Upload size={18} />}
        >
          Save Uploaded Files
        </Button>
      </div>
    </div>
  );
  
  const aiGenerateTab = (
    <AIKeyVisualGenerator onGenerate={handleGenerateAI} />
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate(`/campaigns/${campaignId}`)}
        >
          Back to Campaign
        </Button>
      </div>
      
      <h1 className={bayerSansClasses.heading.h2}>Add Key Visual</h1>
      
      <Card>
        <Tabs
          tabs={[
            { id: 'upload', label: 'Upload Files', content: uploadTab },
            { id: 'ai-generate', label: 'AI Generation', content: aiGenerateTab },
          ]}
          defaultTab="upload"
        />
      </Card>
    </div>
  );
};
