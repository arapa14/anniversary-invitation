import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { TimelineMoment } from '../types';

interface TimelineSectionProps {
  timeline: TimelineMoment[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ timeline }) => {
  return (
    <section
      id="timeline"
      className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-2xl w-full mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E5F6FE] text-xs uppercase tracking-widest text-[#334E68] shadow-xs mb-3">
            <Calendar size={13} className="text-[#89CFF1]" />
            <span>Our Love Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#243B53] tracking-tight mb-2">
            Memories We've Written Together
          </h2>
          <p className="text-xs sm:text-sm text-[#627D98] font-light">
            Setiap babak cerita manis yang tertulis indah di lembaran waktu ✨
          </p>
        </motion.div>

        {/* Timeline Container with Glowing Center Vine */}
        <div className="relative pl-6 sm:pl-8 space-y-10">
          {/* Vertical Vine Line */}
          <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB] shadow-[0_0_10px_rgba(137,207,241,0.5)]" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#89CFF1] flex items-center justify-center text-sm shadow-[0_0_12px_rgba(137,207,241,0.6)] z-10 group-hover:scale-110 transition-transform">
                <span>{item.emoji}</span>
              </div>

              {/* Timeline Content Card */}
              <div className="bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(137,207,241,0.15)] hover:shadow-[0_15px_35px_rgba(137,207,241,0.25)] transition-all ml-2">
                <span className="text-[11px] uppercase tracking-widest text-[#4895BE] font-semibold block mb-1">
                  {item.date}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#243B53] font-medium mb-2 flex items-center gap-2">
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm text-[#334E68] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
