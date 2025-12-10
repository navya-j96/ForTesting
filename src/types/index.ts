// Campaign Types
export interface Campaign {
  id: string;
  name: string;
  objectives: {
    primary: CampaignObjective;
    secondary?: CampaignObjective;
  };
  targetAudience: {
    demographics: Demographics[];
    psychographics: string[];
  };
  messaging: {
    framework: string;
    valueProposition: string;
    callToAction: {
      primary: string;
      secondary?: string;
    };
  };
  timeline: {
    startDate: string;
    endDate: string;
    timezone: string;
  };
  geography: {
    countries: string[];
    regions?: string[];
    cities?: string[];
  };
  languages: Language[];
  keyVisuals: KeyVisual[];
  assets: Asset[];
  channels: Channel[];
}

export type CampaignObjective = 
  | 'awareness'
  | 'consideration'
  | 'conversion'
  | 'loyalty'
  | 'advocacy';

export type Demographics = {
  ageRange?: string;
  gender?: string;
  income?: string;
  education?: string;
  occupation?: string;
  location?: string;
};

export type Language = {
  code: string;
  name: string;
  localization?: boolean;
};

// Key Visual Types
export type KeyVisualType = 'upload' | 'ai-generated';

export interface KeyVisual {
  id: string;
  name: string;
  type: KeyVisualType;
  url: string;
  fileFormat: 'jpg' | 'png' | 'psd';
  createdAt: string;
  aiParams?: {
    creativeBrief: string;
    referenceImageUrl?: string;
  };
}

// Asset Types
export type AssetCategory = 
  | 'illustration'
  | 'product-photography'
  | 'legal'
  | 'tagline'
  | 'logo'
  | 'other';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  url: string;
  fileFormat: string;
  fileSize: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// Channel Types
export type ChannelType = 
  | 'programmatic-display'
  | 'linkedin'
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'tiktok'
  | 'youtube'
  | 'search'
  | 'email'
  | 'other';

export type ProgrammaticFormat = 
  | 'billboard'
  | 'halfpage'
  | 'mpu'
  | 'mobile-leaderboard'
  | 'hybrid-native';

export type LinkedInFormat = 
  | 'video'
  | 'carousel'
  | 'single-image';

export interface Channel {
  id: string;
  type: ChannelType;
  formats: ChannelFormat[];
}

export type ChannelFormat = {
  id: string;
  name: string;
  formatType: string;
  specifications: Specification[];
};

// Specification Types
export interface Specification {
  id: string;
  name: string;
  dimensions?: {
    width: number;
    height: number;
    unit: 'px' | 'dp';
  };
  aspectRatio?: string;
  fileTypes: string[];
  maxFileSize: number;
  animationParams?: {
    allowed: boolean;
    maxDuration?: number;
    maxLoops?: number;
    autoplay?: boolean;
  };
  videoDuration?: {
    min: number;
    max: number;
    unit: 'seconds';
  };
  textLimits?: {
    headline?: number;
    subhead?: number;
    body?: number;
    cta?: number;
  };
  clickThrough?: {
    required: boolean;
    multipleDestinations: boolean;
  };
  source: 'standard' | 'custom';
}

// Brand Compliance Types
export interface BrandRule {
  id: string;
  category: BrandRuleCategory;
  name: string;
  description: string;
  parameters: Record<string, any>;
  isRequired: boolean;
  campaignOverride?: boolean;
}

export type BrandRuleCategory = 
  | 'logo'
  | 'color'
  | 'typography'
  | 'imagery'
  | 'layout'
  | 'cta'
  | 'legal';
