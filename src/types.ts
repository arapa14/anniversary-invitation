export interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tag: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  yearOrContext: string;
  imageUrl: string;
  caption: string;
  rotation: number;
}

export interface DecadeHighlight {
  number: string;
  unit: string;
  title: string;
  desc: string;
  colorClass: string;
}

export interface LoveVow {
  id: string;
  number: number;
  title: string;
  content: string;
  tag: string;
}

export interface LoveNote {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  likesCount: number;
  avatarColor: string;
  reactionEmoji?: string;
}


