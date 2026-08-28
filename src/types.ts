export interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tag: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  yearOrContext: string;
  imageUrl: string;
  caption: string;
  rotation: number;
}

export interface DressCodeColor {
  name: string;
  hex: string;
  description: string;
  previewClass: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  bankLogoText: string;
  qrCodeUrl?: string;
  type: 'bank' | 'ewallet';
}

export interface GuestWish {
  id: string;
  senderName: string;
  relation: string;
  message: string;
  timestamp: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  likesCount: number;
  avatarColor: string;
  reactionEmoji?: string;
}

export interface RsvpFormData {
  fullName: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  guestCount: number;
  message: string;
  dietaryRestrictions?: string;
  phoneNumber?: string;
}
