import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquareHeart,
  Send,
  Heart,
  Filter,
  Sparkles,
  Flower2,
  Gem,
  Gift,
  PartyPopper,
  Cake,
  Crown,
} from 'lucide-react';
import { GuestWish } from '../types';
import { GrandGoldDivider, LuxuryBouquetCorner } from './FloralDecorations';

interface WishesSectionProps {
  wishes: GuestWish[];
  onAddWish: (wish: Omit<GuestWish, 'id' | 'timestamp' | 'likesCount'>) => void;
  onLikeWish: (id: string) => void;
}

const STICKER_OPTIONS = [
  { id: 'heart', label: 'Cinta', icon: Heart, color: 'text-rose-500 fill-rose-500' },
  { id: 'sparkles', label: 'Kilau', icon: Sparkles, color: 'text-amber-500' },
  { id: 'flower', label: 'Bunga', icon: Flower2, color: 'text-pink-500' },
  { id: 'gem', label: 'Permata', icon: Gem, color: 'text-rose-600' },
  { id: 'party', label: 'Pesta', icon: PartyPopper, color: 'text-amber-600' },
  { id: 'gift', label: 'Kado', icon: Gift, color: 'text-amber-500' },
  { id: 'cake', label: 'Kue', icon: Cake, color: 'text-rose-400' },
  { id: 'crown', label: 'Mahkota', icon: Crown, color: 'text-amber-500' },
];

const renderStickerBadge = (key?: string) => {
  const match = STICKER_OPTIONS.find((s) => s.id === key);
  if (!match) {
    return (
      <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
        <Heart size={14} className="text-rose-500 fill-rose-500" />
      </div>
    );
  }
  const IconComp = match.icon;
  return (
    <div className="w-7 h-7 rounded-full bg-[#FFF5F7] border border-[#FCE4E9] flex items-center justify-center shadow-2xs">
      <IconComp size={14} className={match.color} />
    </div>
  );
};

export const WishesSection: React.FC<WishesSectionProps> = ({
  wishes,
  onAddWish,
  onLikeWish,
}) => {
  const [senderName, setSenderName] = useState('');
  const [relation, setRelation] = useState('Sahabat');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [selectedSticker, setSelectedSticker] = useState('heart');
  const [filterAttendance, setFilterAttendance] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const avatarColors = [
      'bg-[#FCE4E9] text-[#C05C74]',
      'bg-[#FFF0D6] text-[#D4A96A]',
      'bg-[#FAD1DB] text-[#8E7479]',
      'bg-[#FFF5F7] text-[#7A666A]',
    ];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    onAddWish({
      senderName: senderName.trim(),
      relation,
      message: message.trim(),
      attendance,
      avatarColor: randomColor,
      reactionEmoji: selectedSticker,
    });

    setMessage('');
  };

  const filteredWishes = wishes.filter((w) => {
    if (filterAttendance === 'all') return true;
    return w.attendance === filterAttendance;
  });

  return (
    <section id="wishes" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-4xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-24 h-24 opacity-60" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-24 h-24 opacity-60" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          WISHES &amp; PRAYERS
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Untaian Doa &amp; Ucapan
        </h2>
        <p className="text-xs text-[#A68F94] font-sans mt-1">
          Kirimkan doa tulus dan pesan hangat untuk melengkapi hari istimewa 10 tahun pernikahan kami
        </p>
        <GrandGoldDivider />
      </div>

      {/* Write Wish Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-5 sm:p-7 mb-8 bg-white border-2 border-[#D4A96A]/30 shadow-[0_12px_30px_rgba(212,169,106,0.15)]"
      >
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#7A666A] mb-3 flex items-center gap-2">
          <MessageSquareHeart size={18} className="text-[#D4A96A]" />
          <span>Tulis Doa &amp; Ucapan Bahagia</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
                Nama Anda / Keluarga
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Contoh: Rian & Sarah"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A] placeholder-[#CBB6BA]"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
                Hubungan / Relasi
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A]"
              >
                <option value="Sahabat">Sahabat</option>
                <option value="Keluarga Besar">Keluarga Besar</option>
                <option value="Rekan Kerja">Rekan Kerja</option>
                <option value="Teman Kuliah/Sekolah">Teman Kuliah/Sekolah</option>
                <option value="Tetangga / Kerabat">Tetangga / Kerabat</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
              Pesan Doa &amp; Ucapan
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Selamat 10th Wedding Anniversary! Semoga selalu sakinah, mawaddah, warahmah..."
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A] placeholder-[#CBB6BA] resize-none"
            />
          </div>

          {/* Lucide Icons Sticker Picker */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs text-[#A68F94] font-sans mr-1">Ikon:</span>
              {STICKER_OPTIONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedSticker === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelectedSticker(item.id)}
                    title={item.label}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF0D6] scale-110 shadow-xs ring-2 ring-[#D4A96A]'
                        : 'bg-[#FFF5F7] hover:bg-[#FCE4E9]'
                    }`}
                  >
                    <IconComponent size={14} className={item.color} />
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white text-xs font-sans uppercase tracking-wider font-bold shadow-xs hover:brightness-105 transition-all cursor-pointer ml-auto"
            >
              <Send size={14} />
              <span>Kirim Ucapan</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Wishes Feed Header & Filter */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[#8E7479] uppercase tracking-[0.2em]">
          Total ({wishes.length} Doa &amp; Ucapan)
        </span>

        <div className="flex items-center gap-1 text-xs">
          <Filter size={13} className="text-[#D4A96A]" />
          <select
            value={filterAttendance}
            onChange={(e) => setFilterAttendance(e.target.value)}
            className="bg-transparent text-xs text-[#7A666A] font-sans font-bold focus:outline-none border-b border-[#D4A96A] py-0.5"
          >
            <option value="all">Semua Status</option>
            <option value="hadir">Hadir Saja</option>
            <option value="ragu">Masih Ragu</option>
            <option value="tidak_hadir">Berhalangan</option>
          </select>
        </div>
      </div>

      {/* Wishes Scrollable List */}
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {filteredWishes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl p-4 bg-white border border-[#FCE4E9] shadow-xs transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full ${item.avatarColor} border border-[#D4A96A]/30 flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0`}
                  >
                    {item.senderName.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#7A666A]">
                      {item.senderName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-sans text-[#A68F94]">
                      <span>{item.relation}</span>
                      <span>•</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Attendance Tag & Lucide Icon Badge */}
                <div className="flex items-center gap-1.5">
                  {renderStickerBadge(item.reactionEmoji)}
                  <span
                    className={`text-[9px] font-sans px-2 py-0.5 rounded-full font-bold ${
                      item.attendance === 'hadir'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.attendance === 'ragu'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {item.attendance === 'hadir' ? 'Hadir' : item.attendance === 'ragu' ? 'Ragu' : 'Berhalangan'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#7A666A] font-sans leading-relaxed my-2">
                {item.message}
              </p>

              <div className="flex items-center justify-end pt-1.5 border-t border-[#FCE4E9]">
                <button
                  onClick={() => onLikeWish(item.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-[#C05C74] hover:text-[#D4A96A] transition-colors p-1 rounded-md cursor-pointer"
                >
                  <Heart size={12} className="fill-[#E598A8] text-[#E598A8]" />
                  <span>{item.likesCount} Suka</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
