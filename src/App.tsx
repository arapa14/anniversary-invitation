import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingPetals } from './components/FloatingPetals';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleStorySection } from './components/CoupleStorySection';
import { EventDetailsSection } from './components/EventDetailsSection';
import { GallerySection } from './components/GallerySection';
import { DressCodeSection } from './components/DressCodeSection';
import { ProgramHighlightsSection } from './components/ProgramHighlightsSection';
import { RsvpSection } from './components/RsvpSection';
import { DigitalGiftSection } from './components/DigitalGiftSection';
import { WishesSection } from './components/WishesSection';
import { FooterSection } from './components/FooterSection';
import { GuestModal } from './components/GuestModal';
import { INVITATION_DATA } from './data/invitationData';
import { GuestWish, RsvpFormData } from './types';

export default function App() {
  const [isOpenCover, setIsOpenCover] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [wishes, setWishes] = useState<GuestWish[]>(INVITATION_DATA.initialWishes);
  const [audioAutoPlayTrigger, setAudioAutoPlayTrigger] = useState(false);

  // Read guest name from URL parameter ?to= or ?guest=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }

    // Load saved wishes from localStorage if any
    const savedWishes = localStorage.getItem('wedding_anniversary_wishes');
    if (savedWishes) {
      try {
        const parsed = JSON.parse(savedWishes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      } catch {
        // Fallback to default
      }
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpenCover(true);
    setAudioAutoPlayTrigger(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddWish = (newWishData: Omit<GuestWish, 'id' | 'timestamp' | 'likesCount'>) => {
    const newWish: GuestWish = {
      ...newWishData,
      id: `wish-${Date.now()}`,
      timestamp: 'Baru saja',
      likesCount: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_anniversary_wishes', JSON.stringify(updated));
  };

  const handleLikeWish = (id: string) => {
    const updated = wishes.map((item) => {
      if (item.id === id) {
        return { ...item, likesCount: item.likesCount + 1 };
      }
      return item;
    });
    setWishes(updated);
    localStorage.setItem('wedding_anniversary_wishes', JSON.stringify(updated));
  };

  const handleRsvpSubmitted = (rsvp: RsvpFormData) => {
    // If guest included a message in RSVP, also publish it to the wishes guestbook!
    if (rsvp.message && rsvp.message.trim()) {
      handleAddWish({
        senderName: rsvp.fullName,
        relation: 'Tamu Undangan',
        message: rsvp.message,
        attendance: rsvp.attendance,
        avatarColor: 'bg-rose-100 text-rose-700',
        reactionEmoji: 'heart',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#7A666A] relative overflow-x-hidden selection:bg-[#FCE4E9] selection:text-[#8E7479]">
      {/* Falling Rose Petals Animation */}
      <FloatingPetals />

      {/* Ambient Romantic Background Music */}
      <AudioPlayer autoPlayTrigger={audioAutoPlayTrigger} />

      {/* Opening Wax Seal Envelope Cover (Modal / Screen) */}
      <AnimatePresence>
        {!isOpenCover && (
          <EnvelopeCover
            guestName={guestName}
            onOpenInvitation={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Main Invitation Content (Visible after opening cover) */}
      {isOpenCover && (
        <main className="relative z-10 animate-fadeIn transition-opacity duration-700">
          {/* Hero Section */}
          <HeroSection />

          {/* Couple Profile & Love Story Timeline */}
          <CoupleStorySection />

          {/* Event Details & Schedule */}
          <EventDetailsSection />

          {/* Polaroid Photo Gallery */}
          <GallerySection />

          {/* Dress Code & Pastel Swatches */}
          <DressCodeSection />

          {/* Program Highlights */}
          <ProgramHighlightsSection />

          {/* RSVP Confirmation Form */}
          <RsvpSection
            initialGuestName={guestName}
            onRsvpSubmitted={handleRsvpSubmitted}
          />

          {/* Digital Gift & Amplop Digital */}
          <DigitalGiftSection />

          {/* Wishes & Doa Guestbook */}
          <WishesSection
            wishes={wishes}
            onAddWish={handleAddWish}
            onLikeWish={handleLikeWish}
          />

          {/* Footer */}
          <FooterSection
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            onScrollToTop={scrollToTop}
          />

          {/* Bottom Floating Navigation Dock */}
          <Navbar onOpenCover={() => setIsOpenCover(false)} />

          {/* Guest Switcher / WhatsApp Share Modal */}
          <GuestModal
            isOpen={isGuestModalOpen}
            onClose={() => setIsGuestModalOpen(false)}
            currentGuestName={guestName}
            onSelectGuestName={(name) => setGuestName(name)}
          />
        </main>
      )}
    </div>
  );
}
