
import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

// --- Types ---

export type ProjectScope = 'Culinary Surface' | 'Wet Environment' | 'Exterior Architecture' | 'Statement Piece';
export type UsageIntensity = 'Visual Art' | 'Moderate Use' | 'Heavy Duty';
export type UserRole = 'Private Residence' | 'Professional Partner';
// FabricationLevel added to resolve missing property errors in Studio features
export type FabricationLevel = 'Classic Selection' | 'Artisan Masterpiece';

export interface ProjectState {
  userRole: UserRole;
  reference: string;
  scope: ProjectScope;
  intensity: UsageIntensity;
  // fabricationLevel added to ProjectState
  fabricationLevel: FabricationLevel;
  timeline: string;
  stonePreference: string; 
  description: string;
}

export interface Recommendation {
  material: string;
  reason: string;
  warning?: string;
}

// --- Initial State ---

const initialState: ProjectState = {
  userRole: 'Private Residence',
  reference: '',
  scope: 'Culinary Surface',
  intensity: 'Moderate Use',
  // Default fabricationLevel set to Classic Selection
  fabricationLevel: 'Classic Selection',
  timeline: 'Planning Phase (1-3 Months)',
  stonePreference: 'Pending',
  description: '',
};

// --- Actions ---

type Action =
  | { type: 'SET_USER_ROLE'; payload: UserRole }
  | { type: 'SET_REFERENCE'; payload: string }
  | { type: 'SET_SCOPE'; payload: ProjectScope }
  | { type: 'SET_INTENSITY'; payload: UsageIntensity }
  | { type: 'SET_FABRICATION_LEVEL'; payload: FabricationLevel }
  | { type: 'SET_TIMELINE'; payload: string }
  | { type: 'SET_STONE_PREFERENCE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'RESET' };

// --- Reducer ---

function projectReducer(state: ProjectState, action: Action): ProjectState {
  switch (action.type) {
    case 'SET_USER_ROLE':
      return { ...state, userRole: action.payload };
    case 'SET_REFERENCE':
      return { ...state, reference: action.payload };
    case 'SET_SCOPE':
      return { ...state, scope: action.payload };
    case 'SET_INTENSITY':
      return { ...state, intensity: action.payload };
    // Handler for SET_FABRICATION_LEVEL to update state
    case 'SET_FABRICATION_LEVEL':
      return { ...state, fabricationLevel: action.payload };
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
  // 1. EXTERIOR LOGIC
  if (state.scope === 'Exterior Architecture') {
    return { 
      material: 'Dekton or Dense Granite', 
      reason: 'UV Stability and thermal shock resistance are mandatory for Florida exteriors. Standard Quartz will yellow, and soft Marbles will etch and lose their polish under tropical UV levels.',
      warning: 'Avoid Soft Marbles or standard engineered Quartz outdoors.'
    };
  }

  // 2. HEAVY KITCHEN LOGIC
  if (state.scope === 'Culinary Surface' && state.intensity === 'Heavy Duty') {
    return { 
      material: 'Natural Quartzite', 
      reason: 'Diamond-level hardness. You need a material that can withstand high-acidity (lemon juice/wine) and high heat. Quartzite provides marble aesthetics with granite durability.',
      warning: 'Marble is highly prone to permanent etching in high-intensity kitchens.'
    };
  }

  // 3. STATEMENT PIECE LOGIC
  if (state.scope === 'Statement Piece' && state.intensity === 'Visual Art') {
    return { 
      material: 'Onyx or Semi-Precious', 
      reason: 'For pure aesthetic impact, we suggest Translucent Onyx. It allows for backlighting and creates a focal point that natural stone slabs simply cannot match.',
      warning: 'These materials are soft and high-maintenance; keep away from high-traffic zones.'
    };
  }

  // 4. WET ENVIRONMENT LOGIC
  if (state.scope === 'Wet Environment') {
    return { 
      material: 'Marble or Porcelain', 
      reason: 'Classical luxury for spas and master baths. Marble’s cool temperature and organic flow are perfect for low-traffic wellness spaces.',
      warning: 'Ensure a professional-grade sealer is applied annually.'
    };
  }

  // DEFAULT
  return { 
    material: 'Premium Quartzite', 
    reason: 'A versatile choice for moderate use. It offers the best balance of longevity and high-end design.',
    warning: 'Always request a physical slab viewing to verify veining patterns.'
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
