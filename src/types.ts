export interface Song {
  id: string;
  name: string;
  artist: string;
  url: string;
  duration?: string;
}

export interface BouquetFlower {
  id: string;
  emoji: string;
  name: string;
  msg: string;
  meaning: string;
  x: number; // percentage in bouquet
  y: number;
  color: string;
}

export interface PolaroidPhoto {
  id: string;
  caption: string;
  url: string;
  date?: string;
  rotation?: number;
}

export interface TimelineMoment {
  id: string;
  date: string;
  title: string;
  emoji: string;
  desc: string;
  delay?: number;
}

export interface WebKimmyConfig {
  recipientName: string;
  senderName: string;
  pin: string;
  title: string;
  subtitle: string;
  typewriterPhrases: string[];
  heroQuote: string;
  letter: {
    salutation: string;
    recipientGreeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    seal: string;
  };
  bouquet: BouquetFlower[];
  polaroids: PolaroidPhoto[];
  timeline: TimelineMoment[];
  playlist: Song[];
  reasons: string[];
  finalQuote: string;
}
