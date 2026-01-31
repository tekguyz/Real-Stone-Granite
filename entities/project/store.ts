
import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

// --- Types ---

export type ProjectType = 'Residential' | 'Commercial' | 'Monument';
export type Environment = 'Indoor' | 'Outdoor';
export type Maintenance = 'Low' | 'Standard';
export type Style = 'Luxury' | 'Standard' | 'Industrial';
export type UserRole = 'Private Residence' | 'Professional Partner';
export type FabricationLevel = 'Classic Selection' | 'Artisan Masterpiece';

export interface ProjectState {
  userRole: UserRole;
  fabricationLevel: FabricationLevel;
  projectType: ProjectType;
  environment: Environment;
  maintenance: Maintenance;
  style: Style;
  timeline: string;
  stonePreference: string; 
  description: string;
}

export interface Recommendation {
  material: string;
  reason: string;
}

export interface LeadDossier {
  leadId: string;
  timestamp: string;
  identity: {
    role: UserRole;
    type: string; 
  };
  specification: {
    tier: FabricationLevel;
    projectType: ProjectType;
    environment: Environment;
    style: Style;
    timeline: string;
    preferredMaterial: string;
    description: string;
  };
  aiRecommendation: Recommendation;
  metadata: {
    source: string;
    version: string;
  };
}

// --- Initial State ---

const initialState: ProjectState = {
  userRole: 'Private Residence',
  fabricationLevel: 'Classic Selection',
  projectType: 'Residential',
  environment: 'Indoor',
  maintenance: 'Standard',
  style: 'Standard',
  timeline: 'Planning Phase (1-3 Months)',
  stonePreference: 'Light',
  description: '',
};

// --- Actions ---

type Action =
  | { type: 'SET_USER_ROLE'; payload: UserRole }
  | { type: 'SET_FABRICATION_LEVEL'; payload: FabricationLevel }
  | { type: 'SET_PROJECT_TYPE'; payload: ProjectType }
  | { type: 'SET_ENVIRONMENT'; payload: Environment }
  | { type: 'SET_MAINTENANCE'; payload: Maintenance }
  | { type: 'SET_STYLE'; payload: Style }
  | { type: 'SET_TIMELINE'; payload: string }
  | { type: 'SET_STONE_PREFERENCE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'RESET' };

// --- Reducer ---

function projectReducer(state: ProjectState, action: Action): ProjectState {
  switch (action.type) {
    case 'SET_USER_ROLE':
      return { ...state, userRole: action.payload };
    case 'SET_FABRICATION_LEVEL':
      return { ...state, fabricationLevel: action.payload };
    case 'SET_PROJECT_TYPE':
      return { ...state, projectType: action.payload };
    case 'SET_ENVIRONMENT':
      return { ...state, environment: action.payload };
    case 'SET_MAINTENANCE':
      return { ...state, maintenance: action.payload };
    case 'SET_STYLE':
      return { ...state, style: action.payload };
    case 'SET_TIMELINE':
      return { ...state, timeline: action.payload };
    case 'SET_STONE_PREFERENCE':
      return { ...state, stonePreference: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// --- Designer Logic Engine (Consultant Persona) ---

export const getRecommendation = (state: ProjectState): Recommendation => {
  if (state.environment === 'Outdoor') {
    return { 
      material: 'Dekton', 
      reason: 'For outdoor applications, Dekton is unparalleled. Its ultra-compact molecular structure makes it essentially immune to UV rays and thermal shock, ensuring your space remains pristine through the seasons.' 
    };
  }
  if (state.maintenance === 'Low') {
    return { 
      material: 'Quartz', 
      reason: 'If ease of use is your priority, Quartz is the ideal companion. It offers the high-end aesthetic of natural stone with a non-porous surface that never requires sealing or specialized care.' 
    };
  }
  if (state.style === 'Luxury' || state.fabricationLevel === 'Artisan Masterpiece') {
    return { 
      material: 'Quartzite', 
      reason: 'Quartzite offers the rare combination of marble’s ethereal beauty with the structural hardness of granite. It is a sophisticated choice for high-traffic kitchens that refuse to sacrifice elegance.' 
    };
  }
  if (state.projectType === 'Monument') {
    return { 
      material: 'Granite', 
      reason: 'Granite is the standard for permanence. Its crystalline density provides the atmospheric resistance required for works intended to honor history for centuries to come.' 
    };
  }
  if (state.projectType === 'Commercial') {
    return { 
      material: 'Porcelain', 
      reason: 'For modern commercial environments, large-format Porcelain provides a sleek, lightweight profile with exceptional durability against the rigors of public interaction.' 
    };
  }
  return { 
    material: 'Marble', 
    reason: 'We suggest Marble for its timeless aesthetic; its unique veining creates a natural organic flow that brings a distinct sense of character and luxury to refined residential interiors.' 
  };
};

// --- Context & Provider ---

interface ProjectContextType {
  state: ProjectState;
  dispatch: React.Dispatch<Action>;
  recommendation: Recommendation;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const recommendation = useMemo(() => getRecommendation(state), [state]);

  return React.createElement(
    ProjectContext.Provider,
    { value: { state, dispatch, recommendation } },
    children
  );
};

export const useProjectStore = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectStore must be used within a ProjectProvider');
  }
  return context;
};