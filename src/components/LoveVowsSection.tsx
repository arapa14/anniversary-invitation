import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Send,
  Flower2,
  BookHeart,
  Crown,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import { LoveNote, LoveVow } from '../types';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner, WaxSealBadge } from './FloralDecorations';

interface LoveVowsSectionProps {
  notes: LoveNote[];
  onAddNote: (note: Omit<LoveNote, 'id' | 'timestamp' | 'likesCount'>) => void;
  onLikeNote: (id: string) => void;
}

const STICKER_OPTIONS = [
  { id: 'heart', label: 'Cinta', icon: Heart, color: 'text-[#FEBDBB] fill-[#FEBDBB]' },
  { id: 'sparkles', label: 'Kilau', icon: Sparkles, color: 'text-[#89CFF1]' },
  { id: 'flower', label: 'Bunga', icon: Flower2, color: 'text-[#FEBDBB]' },
  { id: 'crown', label: 'Mahkota', icon: Crown, color: 'text-[#89CFF1]' },
];

export const LoveVowsSection: React.FC<LoveVowsSectionProps> = ({
  notes,
  onAddNote,
  onLikeNote,
}) => {
  const [author, setAuthor] = useState('Ashley (Istriku)');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('heart');
  const [activeVowIndex, setActiveVowIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const avatarColors = [
      'bg-[#E5F6FE] text-[#334E68]',
      'bg-[#B8EBFF] text-[#243B53]',
      'bg-[#FFDDDC] text-[#334E68]',
      'bg-[#FEBDBB] text-[#334E68]',
    ];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    onAddNote({
      author: author.trim() || 'Istriku Tercinta',
      message: message.trim(),
      avatarColor: randomColor,
      reactionEmoji: selectedSticker,
    });

    setMessage('');
  };

  return (
    <section id="love-vows" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-4xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 opacity-70" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-28 h-28 opacity-70" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#89CFF1] font-sans font-bold">
          JANJI SUCI &amp; UNGKAPAN HATI
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#334E68] font-normal mt-1">
          Janji &amp; Doa Kasih Suami
        </h2>
        <p className="text-xs text-[#627D98] font-sans mt-1 max-w-md mx-auto">
          Ungkapan tulus dan ikrar cinta untuk istri tercinta di perayaan 10 tahun pernikahan
        </p>
        <GrandGoldDivider />
      </div>

      {/* Top 5 Vows Interactive Cards */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <BookHeart size={16} className="text-[#89CFF1]" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#334E68]">
              5 Alasan &amp; Janjiku Untukmu
            </h3>
          </div>
          <span className="text-[10px] font-sans font-semibold text-[#89CFF1] uppercase tracking-wider bg-[#E5F6FE] px-2.5 py-1 rounded-full border border-[#89CFF1]/40">
            1 Dekade Bersama
          </span>
        </div>

        <div className="space-y-3">
          {INVITATION_DATA.loveVows.map((vow: LoveVow, index: number) => {
            const isActive = activeVowIndex === index;
            return (
              <motion.div
                key={vow.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                onClick={() => setActiveVowIndex(isActive ? null : index)}
                className={`rounded-2xl p-4 sm:p-5 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-white via-[#E5F6FE]/50 to-[#FFDDDC]/30 border-[#89CFF1] shadow-[0_6px_20px_rgba(137,207,241,0.2)]'
                    : 'bg-white border-[#B8EBFF]/60 hover:bg-[#F4FAFD] shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-[#89CFF1] to-[#FEBDBB] text-[#243B53]'
                          : 'bg-[#E5F6FE] text-[#334E68]'
                      }`}
                    >
                      {vow.number}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#334E68]">
                        {vow.title}
                      </h4>
                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#89CFF1] font-semibold">
                        {vow.tag}
                      </span>
                    </div>
                  </div>

                  <Heart
                    size={16}
                    className={`shrink-0 transition-colors ${
                      isActive ? 'text-[#FEBDBB] fill-[#FEBDBB]' : 'text-[#89CFF1]'
                    }`}
                  />
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-[#89CFF1]/30"
                  >
                    <p className="font-garamond italic text-sm sm:text-base text-[#486581] leading-relaxed">
                      &ldquo;{vow.content}&rdquo;
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Romantic Private Love Notes Board */}
      <div className="rounded-3xl p-5 sm:p-7 bg-white border border-[#B8EBFF]/70 shadow-[0_8px_30px_rgba(137,207,241,0.16)] mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Quote size={18} className="text-[#89CFF1]" />
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#334E68]">
            Kotak Catatan Kasih Suami &amp; Istri
          </h3>
        </div>
        <p className="text-xs text-[#627D98] font-sans mb-4">
          Tuliskan pesan cinta, doa, atau balasan kenangan manis untuk mengabadikan momen ini
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] font-semibold text-[#627D98] mb-1">
                Nama Penulis
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#E5F6FE]/40 border border-[#89CFF1]/40 focus:outline-none focus:ring-1 focus:ring-[#89CFF1] text-xs sm:text-sm text-[#334E68] placeholder-[#9FB3C8]"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] font-semibold text-[#627D98] mb-1">
                Pilihan Hiasan
              </label>
              <div className="flex items-center gap-2 h-10">
                {STICKER_OPTIONS.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = selectedSticker === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedSticker(item.id)}
                      title={item.label}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                        isSelected
                          ? 'bg-[#E5F6FE] scale-110 shadow-xs ring-2 ring-[#89CFF1]'
                          : 'bg-[#F4FAFD] hover:bg-[#E5F6FE]'
                      }`}
                    >
                      <IconComponent size={14} className={item.color} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] font-semibold text-[#627D98] mb-1">
              Untaian Pesan Kasih
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan cinta, doa, atau kenangan indahmu di sini..."
              className="w-full px-4 py-2.5 rounded-2xl bg-[#E5F6FE]/40 border border-[#89CFF1]/40 focus:outline-none focus:ring-1 focus:ring-[#89CFF1] text-xs sm:text-sm text-[#334E68] placeholder-[#9FB3C8] resize-none"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB] text-[#243B53] text-xs font-sans uppercase tracking-wider font-bold shadow-xs hover:brightness-105 transition-all cursor-pointer"
            >
              <Send size={14} />
              <span>Simpan Catatan Kasih</span>
            </button>
          </div>
        </form>
      </div>

      {/* Love Notes Feed */}
      <div className="space-y-3.5">
        <h4 className="text-[11px] font-sans font-bold text-[#627D98] uppercase tracking-[0.2em] px-1">
          Catatan &amp; Pesan Terabadikan ({notes.length})
        </h4>

        <AnimatePresence initial={false}>
          {notes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl p-4 sm:p-5 bg-white border border-[#B8EBFF]/60 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full ${item.avatarColor} border border-[#89CFF1]/30 flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0`}
                  >
                    {item.author.slice(0, 2)}
                  </div>
                  <div>
                    <h5 className="font-serif text-xs sm:text-sm font-bold text-[#334E68]">
                      {item.author}
                    </h5>
                    <span className="text-[10px] font-sans text-[#627D98]">
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                <Heart size={14} className="text-[#FEBDBB] fill-[#FEBDBB]" />
              </div>

              <p className="text-xs sm:text-[13px] text-[#486581] font-sans leading-relaxed my-2">
                {item.message}
              </p>

              <div className="flex items-center justify-end pt-2 border-t border-[#E5F6FE]">
                <button
                  onClick={() => onLikeNote(item.id)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#89CFF1] hover:text-[#334E68] transition-colors p-1 cursor-pointer"
                >
                  <Heart size={13} className="fill-[#FEBDBB] text-[#FEBDBB]" />
                  <span>{item.likesCount} Cinta</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
