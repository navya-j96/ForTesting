import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { BrandRule } from '../types';

// Sample brand rules
const defaultBrandRules: BrandRule[] = [
  {
    id: 'rule-logo-placement',
    category: 'logo',
    name: 'Logo Placement',
    description: 'Logo must be placed in the top-right corner with proper clearance zone',
    parameters: {
      position: 'top-right',
      clearanceZone: {
        top: 20,
        right: 20,
        unit: 'px'
      }
    },
    isRequired: true
  },
  {
    id: 'rule-logo-size',
    category: 'logo',
    name: 'Minimum Logo Size',
    description: 'Logo must be at least 60px in width to maintain legibility',
    parameters: {
      minWidth: 60,
      unit: 'px'
    },
    isRequired: true
  },
  {
    id: 'rule-color-primary',
    category: 'color',
    name: 'Primary Brand Color',
    description: 'Primary brand color must be used for main CTA elements',
    parameters: {
      color: '#0066CC',
      elements: ['cta-primary']
    },
    isRequired: true
  },
  {
    id: 'rule-typography-heading',
    category: 'typography',
    name: 'Heading Typography',
    description: 'Headings must use Bayer Sans Bold at specified sizes',
    parameters: {
      fontFamily: 'Bayer Sans',
      fontWeight: 'bold',
      minSize: 18,
      unit: 'px'
    },
    isRequired: true
  },
  {
    id: 'rule-cta-style',
    category: 'cta',
    name: 'CTA Button Style',
    description: 'CTA buttons must follow brand style guidelines',
    parameters: {
      backgroundColor: '#0066CC',
      textColor: '#FFFFFF',
      borderRadius: 4,
      padding: {
        vertical: 12,
        horizontal: 24,
        unit: 'px'
      }
    },
    isRequired: true
  },
  {
    id: 'rule-legal-disclaimer',
    category: 'legal',
    name: 'Legal Disclaimer',
    description: 'Legal disclaimer must be included at the bottom of all ads',
    parameters: {
      position: 'bottom',
      fontSize: 10,
      fontColor: '#666666',
      unit: 'px'
    },
    isRequired: true
  }
];

interface BrandComplianceState {
  brandRules: BrandRule[];
  
  // Actions
  addBrandRule: (rule: Omit<BrandRule, 'id'>) => string;
  updateBrandRule: (id: string, data: Partial<BrandRule>) => void;
  deleteBrandRule: (id: string) => void;
  setCampaignOverride: (id: string, override: boolean) => void;
  importBrandRules: (rules: Omit<BrandRule, 'id'>[]) => string[];
}

export const useBrandComplianceStore = create<BrandComplianceState>((set) => ({
  brandRules: defaultBrandRules,
  
  addBrandRule: (ruleData) => {
    const id = uuidv4();
    const newRule: BrandRule = {
      ...ruleData,
      id
    };
    
    set((state) => ({
      brandRules: [...state.brandRules, newRule]
    }));
    
    return id;
  },
  
  updateBrandRule: (id, data) => {
    set((state) => ({
      brandRules: state.brandRules.map(rule => 
        rule.id === id ? { ...rule, ...data } : rule
      )
    }));
  },
  
  deleteBrandRule: (id) => {
    set((state) => ({
      brandRules: state.brandRules.filter(rule => rule.id !== id)
    }));
  },
  
  setCampaignOverride: (id, override) => {
    set((state) => ({
      brandRules: state.brandRules.map(rule => 
        rule.id === id ? { ...rule, campaignOverride: override } : rule
      )
    }));
  },
  
  importBrandRules: (rules) => {
    const newIds: string[] = [];
    
    set((state) => {
      const newRules = rules.map(rule => {
        const id = uuidv4();
        newIds.push(id);
        return { ...rule, id };
      });
      
      return {
        brandRules: [...state.brandRules, ...newRules]
      };
    });
    
    return newIds;
  }
}));
