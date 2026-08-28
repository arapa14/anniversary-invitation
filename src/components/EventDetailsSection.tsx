import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Navigation, Copy, Check, ExternalLink, Video, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner, WaxSealBadge } from './FloralDecorations';

export const EventDetailsSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(
      `${INVITATION_DATA.couple.venueName}, ${INVITATION_DATA.couple.venueAddress}`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="event-details" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-4xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 opacity-70" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-28 h-28 opacity-70" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          WAKTU &amp; LOKASI ACARA
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Rangkaian Acara Perayaan
        </h2>
        <p className="text-xs text-[#A68F94] font-sans mt-1 max-w-sm mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
        </p>
        <GrandGoldDivider />
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {INVITATION_DATA.eventDetails.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="rounded-3xl p-5 sm:p-7 flex flex-col items-center text-center overflow-hidden bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)]"
          >
            {/* Top Golden Sparkle */}
            <div className="inline-flex items-center gap-1.5 text-[#D4A96A] text-xs mb-2">
              <Sparkles size={10} className="text-[#D4A96A]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7479]">
                SESI {index + 1}
              </span>
              <Sparkles size={10} className="text-[#D4A96A]" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7A666A] mb-1">
              {event.title}
            </h3>
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#D4A96A] font-bold mb-4">
              {event.subtitle}
            </span>

            <div className="w-full space-y-3 my-3 py-3 border-y border-[#FCE4E9] text-left">
              <div className="flex items-start gap-3 text-xs text-[#7A666A]">
                <Calendar size={16} className="text-[#D4A96A] mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-[#8E7479] font-bold">Hari &amp; Tanggal</strong>
                  <span>{INVITATION_DATA.couple.celebrationDisplayDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#7A666A]">
                <Clock size={16} className="text-[#D4A96A] mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-[#8E7479] font-bold">Waktu Pelaksanaan</strong>
                  <span>{event.time}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#7A666A]">
                <MapPin size={16} className="text-[#D4A96A] mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-[#8E7479] font-bold">Ruangan / Tempat</strong>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#A68F94] font-sans leading-relaxed mt-auto pt-2">
              {event.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Venue & Map Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl p-5 sm:p-7 relative overflow-hidden bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)]"
      >
        <div className="text-center max-w-xl mx-auto mb-5">
          <WaxSealBadge text="Lokasi" size="sm" variant="gold" className="mx-auto mb-2" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7A666A]">
            {INVITATION_DATA.couple.venueName}
          </h3>
          <p className="text-xs text-[#D4A96A] font-bold mt-1">
            {INVITATION_DATA.couple.venueRoom}
          </p>
          <p className="text-xs text-[#8E7479] font-sans mt-1.5 leading-relaxed">
            {INVITATION_DATA.couple.venueAddress}
          </p>
        </div>

        {/* Embedded Interactive Map Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4A96A]/30 shadow-inner mb-5 h-56 sm:h-72 bg-[#FFF5F7] flex items-center justify-center">
          <iframe
            title="Lokasi Acara"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2974898165037!2d106.8041530758416!3d-6.224446460960533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c8a412f%3A0xd64f1c1f7a3562a1!2sSenopati%2C%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Map & Live Streaming Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={INVITATION_DATA.couple.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4A96A] to-[#E2B980] text-white text-xs font-sans uppercase tracking-wider font-bold shadow-md hover:brightness-105 transition-all"
          >
            <Navigation size={14} />
            <span>Petunjuk Google Maps</span>
            <ExternalLink size={12} />
          </a>

          <button
            id="btn-copy-address"
            onClick={copyAddress}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#8E7479] border-2 border-[#D4A96A]/40 text-xs font-sans uppercase tracking-wider font-bold shadow-xs hover:bg-[#FFF5F7] transition-all cursor-pointer"
          >
            {copiedAddress ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copiedAddress ? 'Alamat Tersalin!' : 'Salin Alamat Lengkap'}</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
