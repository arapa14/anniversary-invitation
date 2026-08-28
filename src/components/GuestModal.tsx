import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, MessageCircle, X, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGuestName: string;
  onSelectGuestName: (name: string) => void;
}

export const GuestModal: React.FC<GuestModalProps> = ({
  isOpen,
  onClose,
  currentGuestName,
  onSelectGuestName,
}) => {
  const [customName, setCustomName] = useState(currentGuestName || '');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const sampleGuests = [
    'Bpk. Bambang Kusuma & Ibu Anita',
    'Maya & Dimas Satrio',
    'dr. Clarissa & Keluarga',
    'Rian Pratama & Rekan Kerja',
    'Keluarga Besar Bpk. Ir. Hendra Pratama',
  ];

  const getShareUrl = (name: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('to', name);
    return url.toString();
  };

  const getWhatsAppMessage = (name: string) => {
    const link = getShareUrl(name);
    return `Kepada Yth. ${name},

Dengan penuh rasa syukur dan sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam Perayaan 10 Tahun Pernikahan (10th Wedding Anniversary) kami:

*${INVITATION_DATA.couple.husband.fullName} & ${INVITATION_DATA.couple.wife.fullName}*

Hari / Tanggal: ${INVITATION_DATA.couple.celebrationDisplayDate}
Waktu: ${INVITATION_DATA.couple.celebrationTime}
Tempat: ${INVITATION_DATA.couple.venueName}

Informasi lengkap dan konfirmasi kehadiran (RSVP) dapat diakses melalui tautan undangan berikut:
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Salam hangat dan penuh kasih,
*${INVITATION_DATA.couple.husband.shortName} & ${INVITATION_DATA.couple.wife.shortName}*`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl(customName || 'Tamu Undangan'));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyWhatsAppText = () => {
    navigator.clipboard.writeText(getWhatsAppMessage(customName || 'Tamu Undangan'));
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(getWhatsAppMessage(customName || 'Tamu Undangan'));
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleApplyName = (name: string) => {
    setCustomName(name);
    onSelectGuestName(name);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#5E4A4E]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-[#D4A96A]/40"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF5F7] text-[#8E7479] hover:bg-[#FCE4E9] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-[#FFF0D6] text-[#D4A96A] border border-[#D4A96A]/50">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#7A666A]">
                Generator Undangan Tamu
              </h3>
              <p className="text-xs text-[#A68F94] font-sans">
                Kustomisasi nama tamu &amp; bagikan via WhatsApp
              </p>
            </div>
          </div>

          {/* Input Name */}
          <div className="mb-3">
            <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#8E7479] mb-1">
              Nama Tamu Undangan
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Contoh: Bpk. Budi & Keluarga"
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9] focus:outline-none focus:ring-1 focus:ring-[#D4A96A] text-xs sm:text-sm text-[#7A666A] placeholder-[#CBB6BA]"
              />
              <button
                onClick={() => handleApplyName(customName)}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white text-xs font-sans uppercase tracking-wider font-bold transition-all shadow-xs cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </div>

          {/* Quick Preset Samples */}
          <div className="mb-4">
            <span className="text-[10px] font-sans text-[#A68F94] block mb-1 font-bold">
              Contoh Nama Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleGuests.map((name) => (
                <button
                  key={name}
                  onClick={() => handleApplyName(name)}
                  className={`text-[10px] font-sans px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    customName === name
                      ? 'bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white border-transparent shadow-xs'
                      : 'bg-[#FFF5F7] text-[#7A666A] border-[#FCE4E9] hover:bg-[#FFF0D6]'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-3 border-t border-[#FCE4E9]">
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-sans uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Bagikan Langsung via WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyLink}
                className="py-2.5 px-3 rounded-2xl bg-white border border-[#D4A96A] text-[#8E7479] hover:bg-[#FFF5F7] text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-[#D4A96A]" />}
                <span>{copiedLink ? 'Link Tersalin' : 'Salin URL'}</span>
              </button>

              <button
                onClick={handleCopyWhatsAppText}
                className="py-2.5 px-3 rounded-2xl bg-white border border-[#D4A96A] text-[#8E7479] hover:bg-[#FFF5F7] text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                {copiedText ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-[#D4A96A]" />}
                <span>{copiedText ? 'Teks Tersalin' : 'Salin Teks WA'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
