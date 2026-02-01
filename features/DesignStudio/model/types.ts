
import { User, PenTool, Layers, FileText, Microscope } from 'lucide-react';

export interface DesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const STEPS = [
  { id: 1, label: 'Client Role', icon: User },
  { id: 2, label: 'Project Scope', icon: PenTool },
  { id: 3, label: 'Physics', icon: Microscope },
  { id: 4, label: 'Intelligence', icon: Layers },
  { id: 5, label: 'Final Details', icon: FileText },
];

export const TIMELINE_OPTIONS = [
  "Immediate / Ready to Build",
  "Planning Phase (1-3 Months)",
  "Future Project (6+ Months)"
];

export const SCOPE_OPTIONS = [
  { id: 'Culinary Surface', label: 'Culinary Surface', icon: 'ChefHat', desc: 'Kitchens, Islands, Prep Zones' },
  { id: 'Wet Environment', label: 'Wet Environment', icon: 'Droplets', desc: 'Master Baths, Spas, Wellness' },
  { id: 'Exterior Architecture', label: 'Exterior Architecture', icon: 'Sun', desc: 'Facades, Pool Decks, BBQ' },
  { id: 'Statement Piece', label: 'Statement Piece', icon: 'Gem', desc: 'Fireplaces, Feature Walls' },
];

export const INTENSITY_OPTIONS = [
  { id: 'Visual Art', label: 'Visual Art', desc: 'Low Touch / High Detail' },
  { id: 'Moderate Use', label: 'Moderate Use', desc: 'Standard Residential' },
  { id: 'Heavy Duty', label: 'Heavy Duty', desc: 'Professional / High Traffic' }
];
