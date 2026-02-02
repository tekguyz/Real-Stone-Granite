
import React, { createContext, useContext, useReducer, ReactNode, useMemo, useEffect } from 'react';

// --- Types ---
export type ProjectScope = 'Culinary Surface' | 'Wet Environment' | 'Exterior Architecture' | 'Statement Piece';
export type UsageIntensity = 'Visual Art' | 'Moderate Use' | 'Heavy Duty';
export type UserRole = 'Private Residence' | 'Professional Partner';
export type FabricationLevel = 'Classic Selection' | 'Artisan Masterpiece';

export interface ProjectState {
  userRole: UserRole;
  reference: string;
  scope: ProjectScope | null;
  intensity: UsageIntensity | null;
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
  scope: null,
  intensity: null,
  fabricationLevel: 'Classic Selection',
  timeline: 'Planning Phase (1-3 Months)',
  stonePreference: 'Pending',
  description: '',
};

const STORAGE_KEY = 'rsg_project_draft';

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
  | { type: 'HYDRATE'; payload: ProjectState }
  | { type: 'RESET' };

// --- Reducer ---
function projectReducer(state: ProjectState, action: Action): ProjectState {
  switch (action.type) {
    case 'SET_USER_ROLE': return { ...state, userRole: action.payload };
    case 'SET_REFERENCE': return { ...state, reference: action.payload };
    case 'SET_SCOPE': return { ...state, scope: action.payload };
    case 'SET_INTENSITY': return { ...state, intensity: action.payload };
    case 'SET_FABRICATION_LEVEL': return { ...state, fabricationLevel: action.payload };
    case 'SET_TIMELINE': return { ...state, timeline: action.payload };
    case 'SET_STONE_PREFERENCE': return { ...state, stonePreference: action.payload };
    case 'SET_DESCRIPTION': return { ...state, description: action.payload };
    case 'HYDRATE': return action.payload;
    case 'RESET': 
      sessionStorage.removeItem(STORAGE_KEY);
      return initialState;
    default: return state;
  }
}

// --- Designer Logic Engine ---
export const getRecommendation = (state: ProjectState): Recommendation => {
  if (!state.scope) return { material: 'Awaiting Context', reason: 'Select a project scope to initiate the recommendation engine.' };
  if (state.scope === 'Exterior Architecture') return { material: 'Dekton or Dense Granite', reason: 'UV Stability is mandatory for Florida exteriors.', warning: 'Avoid Soft Marbles outdoors.' };
  if (state.scope === 'Culinary Surface' && state.intensity === 'Heavy Duty') return { material: 'Natural Quartzite', reason: 'Diamond-level hardness for high-acidity environments.' };
  if (state.scope === 'Statement Piece' && state.intensity === 'Visual Art') return { material: 'Onyx or Semi-Precious', reason: 'Translucent properties allow for backlighting.' };
  return { material: 'Premium Quartzite', reason: 'The ideal balance of longevity and design.' };
};

// --- Context & Provider ---
const ProjectContext = createContext<{ state: ProjectState; dispatch: React.Dispatch<Action>; recommendation: Recommendation } | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Persistence Layer
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
      } catch (e) { console.error("Hydration failed", e); }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const recommendation = useMemo(() => getRecommendation(state), [state]);

  return React.createElement(ProjectContext.Provider, { value: { state, dispatch, recommendation } }, children);
};

export const useProjectStore = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjectStore must be used within a ProjectProvider');
  return context;
};
