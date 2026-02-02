import { 
  Layers, 
  Shield, 
  Gem, 
  Zap, 
  Crosshair, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  Maximize, 
  Play,
  Hammer, 
  History, 
  HardHat, 
  Construction, 
  Cpu, 
  ArrowRight, 
  Anchor, 
  Droplets, 
  Scissors, 
  MonitorPlay, 
  PenTool, 
  Building2, 
  Box, 
  Award
} from 'lucide-react';

// OPTIMIZATION: Use WebP (fm=webp), reduced quality (q=70), and smaller widths (w=800) for better LCP/FCP.
const UNSPLASH_PARAMS = "?auto=format&fit=crop&q=70&w=800&fm=webp";
const FUTARNO_PREFIX = "https://futerno.com/wp-content/uploads"; // Futerno images are static, can't easily param optimize without CDN

export const TEXTURES = {
  // --- IGNEOUS & METAMORPHIC ---
  GRANITE: `${FUTARNO_PREFIX}/2023/09/lemurian-blue-aGLPf39INqA.jpeg`, 
  MARBLE: `${FUTARNO_PREFIX}/2023/07/emperador-gold-CeTJdboskw.jpg`,
  QUARTZITE: `${FUTARNO_PREFIX}/2023/09/Cristallo-1536x1536.jpeg`, 
  ONYX: `${FUTARNO_PREFIX}/2023/09/onice-miele-GOiVshHgrcI.jpeg`, 
  
  // --- SEDIMENTARY ---
  LIMESTONE: `${FUTARNO_PREFIX}/2023/09/azul-valverde-3u6ioDEB4Ko.jpeg`, 
  TRAVERTINE: `https://images.unsplash.com/photo-1590422501099-17937ac4f04b${UNSPLASH_PARAMS}`, 
  SOAPSTONE: `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6${UNSPLASH_PARAMS}`, 
  SLATE: `https://images.unsplash.com/photo-1566624838421-50e58836ec27${UNSPLASH_PARAMS}`, 

  // --- ENGINEERED ---
  DEKTON: `${FUTARNO_PREFIX}/2023/09/liquid-sky-ERIgP1vQoIY.jpeg`, 
  PORCELAIN: `${FUTARNO_PREFIX}/2024/01/506_Mirabel_3840X1812_RGB_181223-1536x725.jpg`, 
  QUARTZ: `${FUTARNO_PREFIX}/2023/09/ethereal-haze-hRYLSl7nWeo.jpeg`, 

  // --- EXOTIC ---
  EXOTIC: `${FUTARNO_PREFIX}/2023/09/onice-rosa-1jkv4Epcwsg.jpeg`, 
  SEMIPRECIOUS: `https://images.unsplash.com/photo-1582736486022-723eb1b78298${UNSPLASH_PARAMS}`, 
  RARE_FINDS: `https://images.unsplash.com/photo-1582128795907-2a544c9b1399${UNSPLASH_PARAMS}`, 
  GEMSTONE: `https://images.unsplash.com/photo-1617056463996-3c0767711b71${UNSPLASH_PARAMS}`, 
};

export const MONUMENTS = {
  VETERANS: "https://i.ibb.co/hxFxGBSF/25-20230616152026-10397362-xlarge.jpg",
  NAVY_SEAL: "https://i.ibb.co/kVNN6xt6/25-20230616151744-10397348-xlarge.jpg",
  SPACE: "https://i.ibb.co/mr2HycJK/25-20230616123223-10396534-xlarge.jpg",
  GOLD_STAR: "https://i.ibb.co/xqj1w3Fz/25-20230616154012-10397379-xlarge.jpg"
};

export const MEDIA = {
  VIDEO_MACRO: "https://assets.mixkit.co/videos/preview/mixkit-black-marble-surface-view-4089-large.mp4",
  IMG_MACRO_POSTER: `https://images.unsplash.com/photo-1600607687940-4e789269c27b${UNSPLASH_PARAMS}&w=1600`,
  VIDEO_CNC: "https://player.vimeo.com/external/494163956.sd.mp4?s=d00424578f773663a763d8e5793e7f9104192b67&profile_id=165",
};

export const ICONS = {
  Materials: Layers,
  Durability: Shield,
  Excellence: Gem,
  Performance: Zap,
  Precision: Crosshair,
  Contact: Phone,
  Location: MapPin,
  Menu: Menu,
  Close: X,
  ArrowRight: ArrowRight,
  ChevronRight: ChevronRight,
  Expand: Maximize,
  Play: Play,
  Craft: Hammer,
  History: History,
  Safety: HardHat,
  Build: Construction,
  Technology: Cpu,
  Memorial: Anchor,
  Waterjet: Droplets,
  Fabrication: Scissors,
  Design: MonitorPlay,
  Artistic: PenTool,
  Commercial: Building2,
  Box: Box,
  Award: Award
};