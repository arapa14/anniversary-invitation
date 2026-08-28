import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, User, Users, Phone, AlertCircle, Sparkles } from 'lucide-react';
import { RsvpFormData } from '../types';
import { GrandGoldDivider, LuxuryBouquetCorner } from './FloralDecorations';

interface RsvpSectionProps {
  initialGuestName?: string;
  onRsvpSubmitted?: (rsvp: RsvpFormData) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  initialGuestName = '',
  onRsvpSubmitted,
}) => {
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: initialGuestName || '',
    attendance: 'hadir',
    guestCount: 2,
    message: '',
    dietaryRestrictions: '',
    phoneNumber: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialGuestName && !formData.fullName) {
      setFormData((prev) => ({ ...prev, fullName: initialGuestName }));
    }
  }, [initialGuestName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage('Mohon isi nama lengkap Anda.');
      return;
    }

    setErrorMessage('');
    setIsSubmitted(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#D4A96A', '#FFE58F', '#FFC1CC', '#FCE4E9', '#E598A8', '#FFFFFF'],
    });

    if (onRsvpSubmitted) {
      onRsvpSubmitted(formData);
    }
  };

  return (
    <section id="rsvp" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-3xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-24 h-24 opacity-60" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-24 h-24 opacity-60" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          KONFIRMASI KEHADIRAN
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Kindly RSVP
        </h2>
        <p className="text-xs text-[#A68F94] font-sans mt-1">
          Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran sebelum{' '}
          <strong className="text-[#C05C74] font-bold">15 Oktober 2026</strong>
        </p>
        <GrandGoldDivider />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-5 sm:p-8 relative overflow-hidden bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)]"
      >
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFF0D6] to-[#FCE4E9] text-[#D4A96A] border-2 border-[#D4A96A]/40 flex items-center justify-center mx-auto mb-4 shadow-md">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#7A666A] mb-2">
              Terima Kasih, {formData.fullName}!
            </h3>
            <p className="text-xs sm:text-sm text-[#8E7479] font-sans max-w-md mx-auto mb-5">
              Konfirmasi kehadiran Anda ({formData.attendance === 'hadir' ? 'Hadir' : formData.attendance === 'ragu' ? 'Masih Ragu' : 'Berhalangan'}) telah berhasil kami catat.
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30 max-w-sm mx-auto text-xs text-[#7A666A] mb-5">
              <span className="font-bold text-[#8E7479]">Jumlah Tamu Terdaftar:</span> {formData.attendance === 'hadir' ? `${formData.guestCount} Orang` : '0 Orang'}
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-[#D4A96A] hover:text-[#C05C74] font-bold underline font-sans cursor-pointer"
            >
              Ubah Data Konfirmasi
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Nama Lengkap */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
                Nama Lengkap / Tamu <span className="text-[#C05C74]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4A96A]">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Contoh: Bpk. Bambang & Ibu Anita"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A] placeholder-[#CBB6BA]"
                />
              </div>
            </div>

            {/* Pilihan Kehadiran */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1.5">
                Konfirmasi Kehadiran <span className="text-[#C05C74]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'hadir', label: 'Ya, Hadir' },
                  { id: 'ragu', label: 'Masih Ragu' },
                  { id: 'tidak_hadir', label: 'Berhalangan' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        attendance: option.id as 'hadir' | 'ragu' | 'tidak_hadir',
                      })
                    }
                    className={`py-3 px-1.5 rounded-2xl text-xs font-bold text-center border transition-all cursor-pointer font-sans ${
                      formData.attendance === option.id
                        ? 'bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white border-transparent shadow-xs'
                        : 'bg-white text-[#8E7479] border-[#FCE4E9] hover:bg-[#FFF5F7]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah Tamu (jika hadir) */}
            {formData.attendance === 'hadir' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
                    Jumlah Tamu Hadir
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4A96A]">
                      <Users size={16} />
                    </div>
                    <select
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData({ ...formData, guestCount: parseInt(e.target.value) })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A]"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang (Keluarga)</option>
                    </select>
                  </div>
                </div>

                {/* Catatan / Kebutuhan Makanan */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
                    Kebutuhan Makanan Khusus (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryRestrictions || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, dietaryRestrictions: e.target.value })
                    }
                    placeholder="Contoh: Vegetarian / Alergi Seafood"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs text-[#7A666A] placeholder-[#CBB6BA]"
                  />
                </div>
              </motion.div>
            )}

            {/* No WhatsApp */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
                Nomor WhatsApp (Opsional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4A96A]">
                  <Phone size={16} />
                </div>
                <input
                  type="tel"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A] placeholder-[#CBB6BA]"
                />
              </div>
            </div>

            {/* Ucapan / Doa Singkat */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
                Ucapan &amp; Doa untuk Mempelai
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan doa restu atau pesan hangat untuk perayaan 10 tahun pernikahan ini..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A] placeholder-[#CBB6BA] resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-submit-rsvp"
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#D4A96A] via-[#E598A8] to-[#C05C74] text-white font-sans uppercase tracking-widest font-bold text-xs sm:text-sm shadow-[0_8px_25px_rgba(212,169,106,0.4)] hover:brightness-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Send size={16} />
              <span>Kirim Konfirmasi Kehadiran</span>
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};
