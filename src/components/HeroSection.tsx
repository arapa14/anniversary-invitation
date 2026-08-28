import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, Heart, MapPin, Clock, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import {
  GrandFloralArch,
  GrandGoldDivider,
  LuxuryBouquetCorner,
  CelebrationRibbonBadge,
  WaxSealBadge,
} from './FloralDecorations';

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = INVITATION_DATA.couple.celebrationDate.getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(
      `10th Wedding Anniversary - ${INVITATION_DATA.couple.husband.shortName} & ${INVITATION_DATA.couple.wife.shortName}`
    );
    const details = encodeURIComponent(
      `Perayaan 10 Tahun Pernikahan ${INVITATION_DATA.couple.husband.shortName} & ${INVITATION_DATA.couple.wife.shortName}. Lokasi: ${INVITATION_DATA.couple.venueName}`
    );
    const location = encodeURIComponent(
      `${INVITATION_DATA.couple.venueName}, ${INVITATION_DATA.couple.venueAddress}`
    );

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261024T103000Z/20261024T150000Z`;

    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToRsvp = () => {
    const rsvpElem = document.getElementById('rsvp');
    if (rsvpElem) {
      rsvpElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-8 pb-16 px-3 sm:px-6 text-center overflow-hidden"
    >
      {/* Lavish Bouquets in Corners */}
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-36 h-36 sm:w-52 sm:h-52 opacity-85" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-36 h-36 sm:w-52 sm:h-52 opacity-85" />

      {/* Golden Glowing Ambient Dust */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFE58F]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md sm:max-w-xl mx-auto w-full relative z-10"
      >
        {/* Grand Floral Arch at Top of Hero */}
        <GrandFloralArch className="w-full max-w-sm mx-auto mb-2" />

        {/* Jubilee Ribbon Badge */}
        <CelebrationRibbonBadge
          title="10 YEARS GOLDEN CELEBRATION"
          subtitle="2015 — 2026 • A DECADE OF ETERNAL LOVE"
        />

        <h2 className="font-serif italic text-xl sm:text-2xl text-[#8E7479] mt-2 font-normal">
          The Wedding Anniversary of
        </h2>

        {/* Grand Typography for Couple Names */}
        <h1 className="font-serif text-4xl sm:text-6xl text-[#C05C74] font-light my-2 tracking-wide drop-shadow-xs">
          {INVITATION_DATA.couple.husband.shortName} <span className="font-script text-[#D4A96A] text-5xl sm:text-7xl font-normal">&amp;</span> {INVITATION_DATA.couple.wife.shortName}
        </h1>

        {/* Ornate Gold Divider */}
        <GrandGoldDivider />

        <p className="font-sans text-[#8E7479] max-w-md mx-auto leading-relaxed text-xs sm:text-sm mb-6 italic px-2">
          &ldquo;{INVITATION_DATA.couple.anniversaryTheme}&rdquo;
        </p>

        {/* Couple Photo with Luxury Gold Ring & Blooming Flowers */}
        <div className="relative mx-auto my-6 w-60 h-60 sm:w-72 sm:h-72">
          {/* Animated Gold Ring Halo */}
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#D4A96A]/80 animate-spin-slow" />
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#FFE58F]/30 via-[#FFC1CC]/25 to-[#FFE58F]/30 blur-sm animate-pulse pointer-events-none" />

          {/* Photo Frame */}
          <div className="w-full h-full rounded-full overflow-hidden bg-white p-2.5 border-2 border-[#D4A96A]/60 shadow-[0_20px_50px_rgba(212,169,106,0.35)]">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"
              alt="Ashley & Daniel Anniversary"
              className="w-full h-full object-cover object-center rounded-full transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Overlay Wax Seal Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
            <WaxSealBadge text="10th" size="md" variant="gold" />
          </div>
        </div>

        {/* Mobile-First Event Snapshot Cards (When, Where, Dresscode) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full my-6 p-4 rounded-3xl bg-white/90 backdrop-blur-xs border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.2)]">
          <div className="text-center p-2 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9]">
            <p className="font-sans uppercase text-[9px] sm:text-[10px] tracking-[0.2em] text-[#D4A96A] font-bold mb-1">
              WAKTU
            </p>
            <p className="font-serif text-[#7A666A] text-xs sm:text-sm font-semibold leading-tight">
              Sabtu, 24 Okt 2026<br /><span className="text-[11px] font-sans text-[#A68F94]">17:30 WIB</span>
            </p>
          </div>
          <div className="text-center p-2 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9]">
            <p className="font-sans uppercase text-[9px] sm:text-[10px] tracking-[0.2em] text-[#D4A96A] font-bold mb-1">
              TEMPAT
            </p>
            <p className="font-serif text-[#7A666A] text-xs sm:text-sm font-semibold leading-tight">
              The Glass House<br /><span className="text-[11px] font-sans text-[#A68F94]">Jakarta</span>
            </p>
          </div>
          <div className="text-center p-2 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9]">
            <p className="font-sans uppercase text-[9px] sm:text-[10px] tracking-[0.2em] text-[#D4A96A] font-bold mb-1">
              BUSANA
            </p>
            <p className="font-serif text-[#7A666A] text-xs sm:text-sm font-semibold leading-tight">
              Pastel &amp; White<br /><span className="text-[11px] font-sans text-[#A68F94]">Semi-Formal</span>
            </p>
          </div>
        </div>

        {/* Countdown Timer Block with Golden Border */}
        <div className="my-6 p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)]">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#D4A96A] font-sans font-bold mb-3 flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-[#D4A96A]" />
            <span>HITUNG MUNDUR MENUJU HARI BAHAGIA</span>
            <Sparkles size={12} className="text-[#D4A96A]" />
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30 shadow-xs"
              >
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#C05C74]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#8E7479] uppercase tracking-[0.15em] font-sans font-semibold mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick CTA Actions Row (Calendar + Instant RSVP) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-add-calendar"
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4A96A] to-[#E2B980] text-white hover:brightness-105 transition-all text-xs font-sans uppercase tracking-wider font-bold cursor-pointer shadow-[0_8px_25px_rgba(212,169,106,0.4)]"
          >
            <CalendarPlus size={15} />
            <span>Simpan ke Google Calendar</span>
          </button>

          <button
            onClick={scrollToRsvp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFF5F7] text-[#C05C74] border-2 border-[#D4A96A]/40 hover:bg-[#FCE4E9] transition-all text-xs font-sans uppercase tracking-wider font-bold cursor-pointer shadow-xs"
          >
            <CheckCircle2 size={15} className="text-[#E598A8]" />
            <span>Konfirmasi Kehadiran (RSVP)</span>
          </button>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-8 text-[#D4A96A] animate-bounce flex flex-col items-center">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#A68F94]">Scroll ke Bawah</span>
          <ChevronDown size={18} />
        </div>
      </motion.div>
    </section>
  );
};
