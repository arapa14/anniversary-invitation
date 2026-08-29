import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingPetals } from './components/FloatingPetals';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleStorySection } from './components/CoupleStorySection';
import { GallerySection } from './components/GallerySection';
import { LoveVowsSection } from './components/LoveVowsSection';
import { FooterSection } from './components/FooterSection';
import { GuestModal } from './components/GuestModal';
import { INVITATION_DATA } from './data/invitationData';
import { LoveNote } from './types';

export default function App() {
  const [isOpenCover, setIsOpenCover] = useState(false);
  const [guestName, setGuestName] = useState('Istriku Tercinta, Ashley');
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [notes, setNotes] = useState<LoveNote[]>(INVITATION_DATA.initialNotes);
  const [audioAutoPlayTrigger, setAudioAutoPlayTrigger] = useState(false);

  // Read recipient name from URL parameter ?to= or ?guest=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }

    // Load saved love notes from localStorage if any
    const savedNotes = localStorage.getItem('anniversary_love_notes');
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotes(parsed);
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

  const handleAddNote = (newNoteData: Omit<LoveNote, 'id' | 'timestamp' | 'likesCount'>) => {
    const newNote: LoveNote = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      timestamp: 'Baru saja',
      likesCount: 1,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('anniversary_love_notes', JSON.stringify(updated));
  };

  const handleLikeNote = (id: string) => {
    const updated = notes.map((item) => {
      if (item.id === id) {
        return { ...item, likesCount: item.likesCount + 1 };
      }
      return item;
    });
    setNotes(updated);
    localStorage.setItem('anniversary_love_notes', JSON.stringify(updated));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4FAFD] via-white to-[#E5F6FE]/30 text-[#334E68] relative overflow-x-hidden selection:bg-[#B8EBFF] selection:text-[#243B53]">
      {/* Floating Petals & Sparkles Animation */}
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

      {/* Main Anniversary Tribute Content (Visible after opening cover) */}
      {isOpenCover && (
        <main className="relative z-10 animate-fadeIn transition-opacity duration-700">
          {/* Hero Section */}
          <HeroSection />

          {/* Couple Profile & Love Story Reflection Timeline */}
          <CoupleStorySection />

          {/* Photo Gallery & Memories */}
          <GallerySection />

          {/* Love Vows & Private Romantic Notes */}
          <LoveVowsSection
            notes={notes}
            onAddNote={handleAddNote}
            onLikeNote={handleLikeNote}
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


