
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PrecisionBtn } from '../../../shared/ui/PrecisionBtn';
import { HAPTICS } from '../../../shared/lib/haptics';
import { PHYSICS } from '../../../shared/lib/theme';

interface BookingStudioProps {
  onBack: () => void;
  onSuccess: () => void;
}

const DATES = [
  { day: 'MON', date: '24', month: 'MAR' },
  { day: 'TUE', date: '25', month: 'MAR' },
  { day: 'WED', date: '26', month: 'MAR' },
  { day: 'THU', date: '27', month: 'MAR' },
  { day: 'FRI', date: '28', month: 'MAR' }
];

const TIMES = ['09:00 AM', '11:00 AM', '01:30 PM', '03:00 PM'];

export const BookingStudio: React.FC<BookingStudioProps> = ({ onBack, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = () => {
    HAPTICS.success();
    setIsBooking(true);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-primary z-30 overflow-y-auto custom-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-xl w-full py-12 px-6 pb-32 md:my-auto"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-white/30 hover:text-white font-mono text-[10px] uppercase tracking-widest mb-10 transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Summary
        </button>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-1.5 h-1.5 bg-gold rotate-45" />
             <span className="text-gold font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Secure a Consultation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black uppercase text-white tracking-tighter leading-none mb-6">
             Visit our <br/> <span className="text-gold font-serif italic">Showroom</span>
          </h2>
          <p className="text-white/40 text-sm font-light leading-relaxed">
            Select a preferred window to meet with a Master Mason at our Fort Pierce facility.
          </p>
        </div>

        <div className="space-y-12">
          {/* DATE PICKER */}
          <div className="space-y-4">
            <span className="block font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">Select Date</span>
            <div className="grid grid-cols-5 gap-2">
              {DATES.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { HAPTICS.click(); setSelectedDate(i); }}
                  className={`flex flex-col items-center justify-center p-4 border transition-all ${
                    selectedDate === i 
                    ? 'bg-gold border-gold text-primary font-bold' 
                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
                  }`}
                >
                  <span className="text-[8px] font-mono tracking-tighter mb-1 opacity-60">{d.day}</span>
                  <span className="text-lg font-sans leading-none">{d.date}</span>
                  <span className="text-[8px] font-mono tracking-tighter mt-1 opacity-60">{d.month}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TIME PICKER */}
          <div className="space-y-4">
            <span className="block font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">Select Window</span>
            <div className="grid grid-cols-2 gap-2">
              {TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => { HAPTICS.click(); setSelectedTime(t); }}
                  className={`px-6 py-4 border text-[10px] font-mono uppercase tracking-widest transition-all ${
                    selectedTime === t 
                    ? 'bg-gold border-gold text-primary font-bold' 
                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <PrecisionBtn 
            variant="primary" 
            disabled={selectedDate === null || selectedTime === null || isBooking}
            onClick={handleBook}
            className="w-full h-16 mt-8"
          >
            {isBooking ? (
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
            ) : (
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold tracking-[0.3em]">Confirm Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </PrecisionBtn>
        </div>
      </motion.div>
    </div>
  );
};
