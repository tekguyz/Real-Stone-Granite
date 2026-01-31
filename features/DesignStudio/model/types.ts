
import { User, PenTool, Layers, FileText } from 'lucide-react';

export interface DesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const STEPS = [
  { id: 1, label: 'Client Role', icon: User },
  { id: 2, label: 'Fabrication', icon: PenTool },
  { id: 3, label: 'Materials', icon: Layers },
  { id: 4, label: 'Details', icon: FileText },
];

export const TIMELINE_OPTIONS = [
  "Immediate / Ready to Build",
  "Planning Phase (1-3 Months)",
  "Future Project (6+ Months)"
];
