import { User, PenTool, Layers, FileText } from 'lucide-react';

export interface DesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const STEPS = [
  { id: 1, label: 'Identity', icon: User },
  { id: 2, label: 'The Craft', icon: PenTool },
  { id: 3, label: 'Our Advice', icon: Layers },
  { id: 4, label: 'Timeline', icon: FileText },
];

export const TIMELINE_OPTIONS = [
  "ASAP / Ready to Fabricate",
  "Planning Phase (1-3 Months)",
  "New Construction (6+ Months)"
];