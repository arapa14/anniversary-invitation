import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, Check, MapPin, QrCode, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner } from './FloralDecorations';

export const DigitalGiftSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${INVITATION_DATA.giftAddress.recipient}, ${INVITATION_DATA.giftAddress.address} (Telp: ${INVITATION_DATA.giftAddress.phone})`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="digital-gift" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-4xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-24 h-24 opacity-60" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-24 h-24 opacity-60" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          LOVE &amp; BLESSINGS
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Tanda Kasih &amp; Kado Digital
        </h2>
        <p className="text-xs text-[#A68F94] font-sans mt-1 max-w-sm mx-auto">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
        </p>
        <GrandGoldDivider />
      </div>

      <div className="text-center mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white text-xs sm:text-sm font-sans uppercase tracking-wider font-bold shadow-md hover:brightness-105 transition-all cursor-pointer"
        >
          <Gift size={16} />
          <span>{isOpen ? 'Tutup Amplop Digital' : 'Kirim Tanda Kasih / Amplop Digital'}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden space-y-5"
          >
            {/* Bank Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INVITATION_DATA.bankAccounts.map((account, index) => (
                <div
                  key={index}
                  className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between bg-white border-2 border-[#D4A96A]/30 shadow-[0_12px_30px_rgba(212,169,106,0.15)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-base font-bold text-[#7A666A]">
                      {account.bankName}
                    </span>
                    <span className="text-[10px] font-mono px-3 py-0.5 rounded-full bg-[#FFF0D6] text-[#8E7479] border border-[#D4A96A] font-bold">
                      {account.bankLogoText}
                    </span>
                  </div>

                  <div className="my-2 p-3 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30">
                    <p className="text-[10px] text-[#A68F94] font-sans uppercase tracking-wider mb-0.5">
                      Nomor Rekening
                    </p>
                    <span className="font-mono text-base sm:text-lg font-bold text-[#C05C74] tracking-wider">
                      {account.accountNumber}
                    </span>
                    <p className="text-xs text-[#8E7479] font-sans mt-0.5">
                      a.n <strong className="text-[#7A666A] font-bold">{account.accountHolder}</strong>
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-center">
                    <button
                      onClick={() => handleCopy(account.accountNumber, `acc-${index}`)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#D4A96A] text-xs font-sans font-bold text-[#8E7479] hover:bg-[#FFF5F7] shadow-xs transition-colors cursor-pointer"
                    >
                      {copiedAccount === `acc-${index}` ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-600">Nomor Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} className="text-[#D4A96A]" />
                          <span>Salin Nomor Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Physical Gift Delivery Address */}
            <div className="rounded-3xl p-5 sm:p-7 text-left bg-white border-2 border-[#D4A96A]/30 shadow-[0_12px_30px_rgba(212,169,106,0.15)]">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-[#FFF0D6] text-[#D4A96A] border border-[#D4A96A]/50">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#7A666A]">
                    Kirim Kado Fisik
                  </h4>
                  <p className="text-xs text-[#A68F94] font-sans">
                    Alamat kediaman mempelai untuk pengiriman kado atau bingkisan
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30 text-xs text-[#7A666A] my-3">
                <p className="font-bold text-[#C05C74]">
                  Penerima: {INVITATION_DATA.giftAddress.recipient}
                </p>
                <p className="text-xs text-[#8E7479] mt-0.5 font-sans">
                  No. Telepon: {INVITATION_DATA.giftAddress.phone}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#8E7479] font-sans">
                  {INVITATION_DATA.giftAddress.address}
                </p>
              </div>

              <button
                onClick={handleCopyAddress}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#D4A96A] text-xs font-sans font-bold text-[#8E7479] hover:bg-[#FFF5F7] shadow-xs transition-colors cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-600">Alamat Lengkap Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[#D4A96A]" />
                    <span>Salin Alamat Pengiriman</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
