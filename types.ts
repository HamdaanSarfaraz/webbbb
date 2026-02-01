export type AppPhase = 
  | 'intro' 
  | 'buildup-1' 
  | 'buildup-2' 
  | 'question' 
  | 'accepted' 
  | 'rejected' 
  | 'waiting';

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle' | 'petal';
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image: string; // URL for the thumbnail/cover photo
  gallery?: string[]; // Optional array of image URLs for the slider
  icon?: React.ReactNode;
}