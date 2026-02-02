import React, { createContext, useContext, useReducer, ReactNode, useMemo, useEffect } from 'react';

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

export const getRecommendation = (state: ProjectState): Recommendation => {
  if (!state.scope) return { material: 'Tell us about your project', reason: 'Choose a project area so we can suggest the best materials for your needs.' };
  if (state.scope === 'Exterior Architecture') return { material: 'Dekton or Dense Granite', reason: 'These stones stand up beautifully to the Florida sun and salt air.', warning: 'We recommend avoiding soft marbles for outdoor projects.' };
  if (state.scope === 'Culinary Surface' && state.intensity === 'Heavy Duty') return { material: 'Natural Quartzite', reason: 'It has the hardness of a diamond, making it perfect for busy kitchens.' };
  if (state.scope === 'Statement Piece' && state.intensity === 'Visual Art') return { material: 'Onyx or Semi-Precious', reason: 'These materials look stunning when backlit and create a focal point.' };
  return { material: 'Premium Quartzite', reason: 'A beautiful, long-lasting choice that fits almost any design.' };
};

const ProjectContext = createContext<{ state: ProjectState; dispatch: React.Dispatch<Action>; recommendation: Recommendation } | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
      } catch (e) {
        // Hydration failure is silent to maintain a clean console
      }
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
  if (!context) throw new Error('useProjectStore error');
  return context;
};