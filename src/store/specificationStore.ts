import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Specification } from '../types';

// Predefined specifications for common ad formats
const defaultSpecifications: Specification[] = [
  // Programmatic Display
  {
    id: 'spec-billboard',
    name: 'Billboard (970x250)',
    dimensions: { width: 970, height: 250, unit: 'px' },
    aspectRatio: '97:25',
    fileTypes: ['jpg', 'png', 'gif', 'html5'],
    maxFileSize: 200, // KB
    animationParams: {
      allowed: true,
      maxDuration: 15,
      maxLoops: 3,
      autoplay: true
    },
    textLimits: {
      headline: 70,
      subhead: 120,
      cta: 25
    },
    clickThrough: {
      required: true,
      multipleDestinations: false
    },
    source: 'standard'
  },
  {
    id: 'spec-halfpage',
    name: 'Half Page (300x600)',
    dimensions: { width: 300, height: 600, unit: 'px' },
    aspectRatio: '1:2',
    fileTypes: ['jpg', 'png', 'gif', 'html5'],
    maxFileSize: 150, // KB
    animationParams: {
      allowed: true,
      maxDuration: 15,
      maxLoops: 3,
      autoplay: true
    },
    textLimits: {
      headline: 60,
      subhead: 100,
      cta: 25
    },
    clickThrough: {
      required: true,
      multipleDestinations: false
    },
    source: 'standard'
  },
  {
    id: 'spec-mpu',
    name: 'MPU (300x250)',
    dimensions: { width: 300, height: 250, unit: 'px' },
    aspectRatio: '6:5',
    fileTypes: ['jpg', 'png', 'gif', 'html5'],
    maxFileSize: 100, // KB
    animationParams: {
      allowed: true,
      maxDuration: 15,
      maxLoops: 3,
      autoplay: true
    },
    textLimits: {
      headline: 50,
      subhead: 80,
      cta: 20
    },
    clickThrough: {
      required: true,
      multipleDestinations: false
    },
    source: 'standard'
  },
  {
    id: 'spec-mobile-leaderboard',
    name: 'Mobile Leaderboard (320x50)',
    dimensions: { width: 320, height: 50, unit: 'px' },
    aspectRatio: '32:5',
    fileTypes: ['jpg', 'png', 'gif', 'html5'],
    maxFileSize: 50, // KB
    animationParams: {
      allowed: true,
      maxDuration: 15,
      maxLoops: 3,
      autoplay: true
    },
    textLimits: {
      headline: 25,
      cta: 15
    },
    clickThrough: {
      required: true,
      multipleDestinations: false
    },
    source: 'standard'
  },
  
  // LinkedIn
  {
    id: 'spec-linkedin-single',
    name: 'LinkedIn Single Image',
    dimensions: { width: 1200, height: 627, unit: 'px' },
    aspectRatio: '1.91:1',
    fileTypes: ['jpg', 'png'],
    maxFileSize: 5000, // KB (5MB)
    textLimits: {
      headline: 150,
      subhead: 300,
      cta: 30
    },
    clickThrough: {
      required: true,
      multipleDestinations: false
    },
    source: 'standard'
  },
  {
    id: 'spec-linkedin-carousel',
    name: 'LinkedIn Carousel',
    dimensions: { width: 1080, height: 1080, unit: 'px' },
    aspectRatio: '1:1',
    fileTypes: ['jpg', 'png'],
    maxFileSize: 5000, // KB per image (5MB)
    textLimits: {
      headline: 150,
      subhead: 300,
      cta: 30
    },
    clickThrough: {
      required: true,
      multipleDestinations: true
    },
    source: 'standard'
  },
  {
    id: 'spec-linkedin-video',
    name: 'LinkedIn Video',
    dimensions: { width: 1920, height: 1080, unit: 'px' },
    aspectRatio: '16:9',
    fileTypes: ['mp4'],
    maxFileSize: 200000, // KB (200MB)
    videoDuration: {
      min: 3,
      max: 900,
      unit: 'seconds'
    },
    textLimits: {
      headline: 150,
      subhead: 300,
      cta: 30
    },
    clickThrough: {
      required: true,
      multipleDestinations: false
    },
    source: 'standard'
  }
];

interface SpecificationState {
  specifications: Specification[];
  
  // Actions
  addSpecification: (spec: Omit<Specification, 'id'>) => string;
  updateSpecification: (id: string, data: Partial<Specification>) => void;
  deleteSpecification: (id: string) => void;
  importSpecifications: (specs: Omit<Specification, 'id'>[]) => string[];
}

export const useSpecificationStore = create<SpecificationState>((set) => ({
  specifications: defaultSpecifications,
  
  addSpecification: (specData) => {
    const id = uuidv4();
    const newSpec: Specification = {
      ...specData,
      id
    };
    
    set((state) => ({
      specifications: [...state.specifications, newSpec]
    }));
    
    return id;
  },
  
  updateSpecification: (id, data) => {
    set((state) => ({
      specifications: state.specifications.map(spec => 
        spec.id === id ? { ...spec, ...data } : spec
      )
    }));
  },
  
  deleteSpecification: (id) => {
    set((state) => ({
      specifications: state.specifications.filter(spec => spec.id !== id)
    }));
  },
  
  importSpecifications: (specs) => {
    const newIds: string[] = [];
    
    set((state) => {
      const newSpecs = specs.map(spec => {
        const id = uuidv4();
        newIds.push(id);
        return { ...spec, id };
      });
      
      return {
        specifications: [...state.specifications, ...newSpecs]
      };
    });
    
    return newIds;
  }
}));
