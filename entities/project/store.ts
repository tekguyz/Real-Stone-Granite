
import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

// --- Types ---

export type ProjectType = 'Residential' | 'Commercial' | 'Monument';
export type Environment = 'Indoor' | 'Outdoor';
export type Maintenance = 'Low' | 'Standard';
export type Style = 'Luxury' | 'Standard' | 'Industrial';
export type UserRole = 'Homeowner' | 'General Contractor' | 'Architect/Designer';
export type FabricationLevel = 'Standard' | 'Architectural';

export interface ProjectState {
  userRole: UserRole;
  fabricationLevel: FabricationLevel;
  projectType: ProjectType;
  environment: Environment;
  maintenance: Maintenance;
  style: Style;
  timeline: string;
  stonePreference: string; // e.g., "Dark", "Light", "Veined"
}

export interface Recommendation {
  material: string;
  reason: string;
}

/**
 * LeadDossier: The standardized exchange format for CRM/Webhook integration.
 */
export interface LeadDossier {
  leadId: string;
  timestamp: string;
  identity: {
    role: UserRole;
    type: string; // "PROFESSIONAL" | "PRIVATE"
  };
  specification: {
    tier: FabricationLevel;
    projectType: ProjectType;
    environment: Environment;
    style: Style;
    timeline: string;
    preferredMaterial: string;
  };
  aiRecommendation: Recommendation;
  metadata: {
    source: string;
    version: string;
  };
}

// --- Initial State ---

const initialState: ProjectState = {
  userRole: 'Homeowner',
  fabricationLevel: 'Standard',
  projectType: 'Residential',
  environment: 'Indoor',
  maintenance: 'Standard',
  style: 'Standard',
  timeline: '3-6 Months',
  stonePreference: 'Light',
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
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// --- Smart Logic Engine ---

/**
 * Derives the recommended material based on architectural constraints and user preferences.
 */
export const getRecommendation = (state: ProjectState): Recommendation => {
  if (state.environment === 'Outdoor') {
    return { 
      material: 'Dekton', 
      reason: 'Ultra-compact surface engineered for UV resistance and thermal shock.' 
    };
  }
  if (state.maintenance === 'Low') {
    return { 
      material: 'Quartz', 
      reason: 'Non-porous engineered stone requiring zero sealing or special maintenance.' 
    };
  }
  if (state.style === 'Luxury' || state.fabricationLevel === 'Architectural') {
    return { 
      material: 'Onyx', 
      reason: 'Translucent, exotic gemstone slabs for high-impact statement features.' 
    };
  }
  if (state.projectType === 'Monument') {
    return { 
      material: 'Granite', 
      reason: 'Maximum structural density and historical permanence for exterior memorials.' 
    };
  }
  if (state.projectType === 'Commercial') {
    return { 
      material: 'Porcelain', 
      reason: 'Lightweight, large-format cladding ideal for high-traffic vertical applications.' 
    };
  }
  return { 
    material: 'Marble', 
    reason: 'The timeless standard for residential elegance and natural unique veining.' 
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
