
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, Loader2, Check, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { PHYSICS } from '../../shared/lib/theme';
import { useToast } from '../../shared/ui/Toast';
import { useProjectStore } from '../../entities/project/store';
import { BookingStudio } from './ui/BookingStudio';

interface SuccessViewProps {
  onClose: () => void;
  projectRef: string;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onClose, projectRef }) => {
  const { showToast } = useToast();
  const { state, recommendation } = useProjectStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [view, setView] = useState<'success' | 'booking'>('success');

  const generatePDF = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    // Subtle delay to mimic processing
    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const goldColor = [184, 134, 11]; 
        const darkGray = [40, 40, 40];
        const lightGray = [150, 150, 150];

        // 1. PAGE BORDER
        doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277); 
        
        // 2. HEADER
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('REAL STONE & GRANITE', 20, 30);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text('EST. 1993 | FORT PIERCE, FLORIDA', 20, 37);

        // 3. PROJECT REFERENCE
        doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
        doc.setLineWidth(1);
        doc.line(20, 45, 190, 45);

        doc.setFont('courier', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(`PROJECT BRIEF: #${projectRef}`, 20, 55);
        doc.setFontSize(8);
        doc.text(`DATE PREPARED: ${new Date().toLocaleDateString().toUpperCase()}`, 20, 60);

        // 4. TECHNICAL SPECIFICATIONS
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('PROJECT OVERVIEW', 20, 75);
        doc.setLineWidth(0.2);
        doc.line(20, 77, 80, 77);

        const specs = [
          ['CLIENT TYPE:', state.userRole],
          ['REFERRAL:', state.reference || 'DIRECT INQUIRY'],
          ['PROJECT AREA:', state.scope || 'PENDING'],
          ['FINISH LEVEL:', state.fabricationLevel],
          ['TIMELINE:', state.timeline],
          ['MATERIAL SELECTION:', state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material]
        ];

        let yPos = 85;
        specs.forEach(([label, value]) => {
          doc.setFont('courier', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
          doc.text(label, 20, yPos);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
          doc.text(value, 65, yPos);
          yPos += 8;
        });

        // 5. FABRICATION INSIGHT
        yPos += 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('MATERIAL INSIGHT', 20, yPos);
        doc.line(20, yPos + 2, 80, yPos + 2);
        
        yPos += 10;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        const recText = doc.splitTextToSize(recommendation.reason, 160);
        doc.text(recText, 20, yPos);
        yPos += (recText.length * 5) + 10;

        // 6. VISION NOTES
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('CLIENT VISION & NOTES', 20, yPos);
        doc.line(20, yPos + 2, 80, yPos + 2);
        
        yPos += 10;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const visionText = doc.splitTextToSize(state.description || "No specific details provided yet.", 160);
        doc.text(visionText, 20, yPos);

        // 7. FOOTER
        doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.line(20, 260, 190, 260);
        
        doc.setFont('courier', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text('This document serves as a preliminary design brief. Final measurements subject to site visit.', 20, 268, { maxWidth: 160 });
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text('REAL STONE & GRANITE CORP | 427 SOUTH MARKET AVE, FORT PIERCE, FL | (772) 489-9964', 20, 275);

        // Download
        doc.save(`RSG-Brief-${projectRef}.pdf`);
        
        showToast(`Brief Saved to Device`, 'success');
      } catch (err) {
        console.error(err);
        showToast("Error saving PDF", "error");
      } finally {
        setIsDownloading(false);
      }
    }, 1200);
  };

  return (
    <AnimatePresence mode="wait">
      {view === 'success' ? (
        <motion.div 
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full h-full flex flex-col items-center justify-center relative z-20 p-6 bg-primary overflow-hidden"
        >
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={PHYSICS.snappy} className="max-w-2xl w-full">
            <div className="bg-surface border border-white/10 p-8 md:p-12 shadow-2xl relative mb-12">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/40" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/40" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 pb-8 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-gold rotate-45" />
                        <span className="font-mono text-[10px] text-gold uppercase tracking-[0.4em] font-bold">Design Brief</span>
                      </div>
                      <h2 className="text-3xl font-sans font-black uppercase text-white tracking-tighter">REF: {projectRef}</h2>
                      <p className="text-white/40 font-mono text-[10px] mt-2 uppercase tracking-widest leading-none">Status: Ready for Review</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="w-10 h-10 border border-gold/20 flex items-center justify-center bg-gold/5">
                          <Check className="w-5 h-5 text-gold" />
                       </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-6">
                       <div>
                          <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">Client</span>
                          <span className="text-white text-base font-medium">{state.userRole}</span>
                       </div>
                       <div>
                          <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">Project Scope</span>
                          <span className="text-white text-base font-medium">{state.scope}</span>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="p-6 bg-white/[0.02] border border-white/5 relative">
                          <div className="absolute top-0 left-0 w-1 h-1 bg-gold/40" />
                          <span className="block font-mono text-[9px] text-gold uppercase tracking-[0.2em] mb-3 font-bold">Selected Material</span>
                          <div className="flex items-center gap-3 text-white">
                             <span className="text-lg font-bold uppercase tracking-tight">
                                {state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material}
                             </span>
                          </div>
                       </div>
                    </div>
                </div>

                <div className="bg-black/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                   <p className="text-[11px] text-white/40 font-light max-w-sm text-center md:text-left leading-relaxed">
                      Your summary is ready. You can save this for your records or bring it to your consultation.
                   </p>
                   <PrecisionBtn onClick={generatePDF} variant="secondary" className="h-12 px-6 text-[9px] whitespace-nowrap min-w-0">
                      {isDownloading ? <Loader2 className="w-3 h-3 animate-spin mr-3" /> : <FileText className="w-3.5 h-3.5 mr-3" />}
                      {isDownloading ? "Saving..." : "Download Brief"}
                   </PrecisionBtn>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <PrecisionBtn onClick={() => setView('booking')} variant="primary" className="w-full h-16 max-w-sm">
                <Calendar className="w-4 h-4 mr-3" />
                <span className="font-mono text-[11px] font-bold tracking-[0.3em]">Schedule Visit</span>
              </PrecisionBtn>

              <button onClick={onClose} className="text-white/40 hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] transition-colors flex items-center gap-2 group">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Return to Site
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <BookingStudio 
          onBack={() => setView('success')} 
          onSuccess={() => {
            showToast("Consultation Window Reserved", 'success');
            onClose();
          }}
        />
      )}
    </AnimatePresence>
  );
};
