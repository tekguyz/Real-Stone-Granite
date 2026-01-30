export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  hasAction?: boolean;
}

export interface StoneCuratorProps {
  onLaunchStudio: () => void;
  isStudioOpen: boolean;
}

export const CHAT_THRESHOLD = 800;
export const TOP_THRESHOLD = 2000;

export const SUGGESTIONS = [
  "Marble vs. Quartzite",
  "Kitchen Heat Resistance",
  "Outdoor Kitchen Slabs",
  "The Fabrication Process"
];