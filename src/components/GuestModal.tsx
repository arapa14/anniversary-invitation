import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, MessageCircle, X } from 'lucide-react';
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
    'Istriku Tercinta, Ashley',
    'Bunda Tercinta Ashley',
    'Ashley Olivia Kusuma',
    'Cintaku Ashley',
    'Keluarga Kecil Kita',
  ];

  const getShareUrl = (name: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('to', name);
    return url.toString();
  };

  const getWhatsAppMessage = (name: string) => {
    const link = getShareUrl(name);
    return `Untuk ${name},

Selamat 10 Tahun Pernikahan Kita! ❤️
(24 Oktober 2015 — 2026)

Surat kasih dan kumpulan kenangan indah kita selama 1 dekade ini telah aku rangkai spesial untukmu di sini:
${link}

Terima kasih telah menjadi istri terhebat, teman hidup terbaik, dan ibu paling penyayang bagi anak-anak kita.

Dengan segenap cinta,
*Suamimu, Daniel*`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl(customName || 'Sahabat & Keluarga'));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyWhatsAppText = () => {
    navigator.clipboard.writeText(getWhatsAppMessage(customName || 'Sahabat & Keluarga'));
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(getWhatsAppMessage(customName || 'Sahabat & Keluarga'));
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
        className="fixed inset-0 z-50 bg-[#243B53]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-full bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-[#89CFF1]/40"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#E5F6FE] text-[#627D98] hover:bg-[#B8EBFF] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-[#E5F6FE] text-[#89CFF1] border border-[#89CFF1]/40">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#334E68]">
                Bagikan Kartu Kenangan
              </h3>
              <p className="text-xs text-[#627D98] font-sans">
                Kustomisasi nama penerima &amp; bagikan via WhatsApp
              </p>
            </div>
          </div>

          {/* Input Name */}
          <div className="mb-3">
            <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] font-semibold text-[#627D98] mb-1">
              Nama Penerima Ucapan
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Contoh: Bpk. Budi & Keluarga"
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-[#E5F6FE]/40 border border-[#89CFF1]/40 focus:outline-none focus:ring-1 focus:ring-[#89CFF1] text-xs sm:text-sm text-[#334E68] placeholder-[#9FB3C8]"
              />
              <button
                onClick={() => handleApplyName(customName)}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#89CFF1] to-[#FEBDBB] text-[#243B53] text-xs font-sans uppercase tracking-wider font-bold transition-all shadow-xs cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </div>

          {/* Quick Preset Samples */}
          <div className="mb-4">
            <span className="text-[10px] font-sans text-[#627D98] block mb-1 font-semibold">
              Contoh Nama Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleGuests.map((name) => (
                <button
                  key={name}
                  onClick={() => handleApplyName(name)}
                  className={`text-[10px] font-sans px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    customName === name
                      ? 'bg-gradient-to-r from-[#89CFF1] to-[#B8EBFF] text-[#243B53] font-bold border-transparent shadow-xs'
                      : 'bg-[#F4FAFD] text-[#486581] border-[#B8EBFF]/60 hover:bg-[#E5F6FE]'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-3 border-t border-[#E5F6FE]">
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-sans uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Bagikan Langsung via WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyLink}
                className="py-2 px-3 rounded-2xl bg-white border border-[#89CFF1]/50 text-[#334E68] hover:bg-[#E5F6FE] text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-[#89CFF1]" />}
                <span>{copiedLink ? 'Link Tersalin' : 'Salin URL'}</span>
              </button>

              <button
                onClick={handleCopyWhatsAppText}
                className="py-2 px-3 rounded-2xl bg-white border border-[#89CFF1]/50 text-[#334E68] hover:bg-[#E5F6FE] text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                {copiedText ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-[#89CFF1]" />}
                <span>{copiedText ? 'Teks Tersalin' : 'Salin Teks WA'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

