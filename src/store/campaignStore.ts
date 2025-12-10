import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Campaign, KeyVisual, Asset, Channel } from '../types';

interface CampaignState {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  
  // Campaign Actions
  createCampaign: (campaign: Omit<Campaign, 'id' | 'keyVisuals' | 'assets' | 'channels'>) => string;
  updateCampaign: (id: string, campaignData: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  setCurrentCampaign: (id: string) => void;
  
  // Key Visual Actions
  addKeyVisual: (campaignId: string, keyVisual: Omit<KeyVisual, 'id' | 'createdAt'>) => string;
  updateKeyVisual: (campaignId: string, keyVisualId: string, data: Partial<KeyVisual>) => void;
  deleteKeyVisual: (campaignId: string, keyVisualId: string) => void;
  
  // Asset Actions
  addAsset: (campaignId: string, asset: Omit<Asset, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => string;
  updateAsset: (campaignId: string, assetId: string, data: Partial<Asset>) => void;
  deleteAsset: (campaignId: string, assetId: string) => void;
  
  // Channel Actions
  addChannel: (campaignId: string, channel: Omit<Channel, 'id'>) => string;
  updateChannel: (campaignId: string, channelId: string, data: Partial<Channel>) => void;
  deleteChannel: (campaignId: string, channelId: string) => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  currentCampaign: null,
  
  // Campaign Actions
  createCampaign: (campaignData) => {
    const id = uuidv4();
    const newCampaign: Campaign = {
      ...campaignData,
      id,
      keyVisuals: [],
      assets: [],
      channels: []
    };
    
    set((state) => ({
      campaigns: [...state.campaigns, newCampaign],
      currentCampaign: newCampaign
    }));
    
    return id;
  },
  
  updateCampaign: (id, campaignData) => {
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === id ? { ...campaign, ...campaignData } : campaign
      ),
      currentCampaign: state.currentCampaign?.id === id 
        ? { ...state.currentCampaign, ...campaignData }
        : state.currentCampaign
    }));
  },
  
  deleteCampaign: (id) => {
    set((state) => ({
      campaigns: state.campaigns.filter(campaign => campaign.id !== id),
      currentCampaign: state.currentCampaign?.id === id ? null : state.currentCampaign
    }));
  },
  
  setCurrentCampaign: (id) => {
    set((state) => ({
      currentCampaign: state.campaigns.find(campaign => campaign.id === id) || null
    }));
  },
  
  // Key Visual Actions
  addKeyVisual: (campaignId, keyVisualData) => {
    const id = uuidv4();
    const newKeyVisual: KeyVisual = {
      ...keyVisualData,
      id,
      createdAt: new Date().toISOString()
    };
    
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, keyVisuals: [...campaign.keyVisuals, newKeyVisual] }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { ...state.currentCampaign, keyVisuals: [...state.currentCampaign.keyVisuals, newKeyVisual] }
        : state.currentCampaign
    }));
    
    return id;
  },
  
  updateKeyVisual: (campaignId, keyVisualId, data) => {
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              keyVisuals: campaign.keyVisuals.map(kv => 
                kv.id === keyVisualId ? { ...kv, ...data } : kv
              ) 
            }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { 
            ...state.currentCampaign, 
            keyVisuals: state.currentCampaign.keyVisuals.map(kv => 
              kv.id === keyVisualId ? { ...kv, ...data } : kv
            ) 
          }
        : state.currentCampaign
    }));
  },
  
  deleteKeyVisual: (campaignId, keyVisualId) => {
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              keyVisuals: campaign.keyVisuals.filter(kv => kv.id !== keyVisualId) 
            }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { 
            ...state.currentCampaign, 
            keyVisuals: state.currentCampaign.keyVisuals.filter(kv => kv.id !== keyVisualId) 
          }
        : state.currentCampaign
    }));
  },
  
  // Asset Actions
  addAsset: (campaignId, assetData) => {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const newAsset: Asset = {
      ...assetData,
      id,
      version: 1,
      createdAt: now,
      updatedAt: now
    };
    
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, assets: [...campaign.assets, newAsset] }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { ...state.currentCampaign, assets: [...state.currentCampaign.assets, newAsset] }
        : state.currentCampaign
    }));
    
    return id;
  },
  
  updateAsset: (campaignId, assetId, data) => {
    const now = new Date().toISOString();
    
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              assets: campaign.assets.map(asset => 
                asset.id === assetId 
                  ? { 
                      ...asset, 
                      ...data, 
                      version: asset.version + 1,
                      updatedAt: now 
                    } 
                  : asset
              ) 
            }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { 
            ...state.currentCampaign, 
            assets: state.currentCampaign.assets.map(asset => 
              asset.id === assetId 
                ? { 
                    ...asset, 
                    ...data, 
                    version: asset.version + 1,
                    updatedAt: now 
                  } 
                : asset
            ) 
          }
        : state.currentCampaign
    }));
  },
  
  deleteAsset: (campaignId, assetId) => {
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              assets: campaign.assets.filter(asset => asset.id !== assetId) 
            }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { 
            ...state.currentCampaign, 
            assets: state.currentCampaign.assets.filter(asset => asset.id !== assetId) 
          }
        : state.currentCampaign
    }));
  },
  
  // Channel Actions
  addChannel: (campaignId, channelData) => {
    const id = uuidv4();
    
    const newChannel: Channel = {
      ...channelData,
      id
    };
    
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, channels: [...campaign.channels, newChannel] }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { ...state.currentCampaign, channels: [...state.currentCampaign.channels, newChannel] }
        : state.currentCampaign
    }));
    
    return id;
  },
  
  updateChannel: (campaignId, channelId, data) => {
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              channels: campaign.channels.map(channel => 
                channel.id === channelId ? { ...channel, ...data } : channel
              ) 
            }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { 
            ...state.currentCampaign, 
            channels: state.currentCampaign.channels.map(channel => 
              channel.id === channelId ? { ...channel, ...data } : channel
            ) 
          }
        : state.currentCampaign
    }));
  },
  
  deleteChannel: (campaignId, channelId) => {
    set((state) => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              channels: campaign.channels.filter(channel => channel.id !== channelId) 
            }
          : campaign
      ),
      currentCampaign: state.currentCampaign?.id === campaignId
        ? { 
            ...state.currentCampaign, 
            channels: state.currentCampaign.channels.filter(channel => channel.id !== channelId) 
          }
        : state.currentCampaign
    }));
  }
}));
