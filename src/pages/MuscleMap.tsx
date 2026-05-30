import React, { useState } from 'react';
import { Info, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useStore, MuscleGroup } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';
import { MuscleHeatmapSVG } from '../components/MuscleHeatmapSVG';
import { motion, AnimatePresence } from 'framer-motion';
export const MuscleMap: React.FC = () => {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);
  const getMuscleScore = useStore((state) => state.getMuscleScore);
  const handleMuscleClick = (muscle: MuscleGroup) => {
    setSelectedMuscle(muscle);
  };
  return (
    <PageTransition className="flex flex-col h-full">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold mb-2">Muscle Intelligence</h1>
        <p className="text-gray-400 text-sm mb-6">
          AI analysis based on your recent volume.
        </p>

        {/* View Toggle */}
        <div className="flex bg-dark-200 p-1 rounded-xl mb-6 border border-dark-300">
          <button
            onClick={() => setView('front')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${view === 'front' ? 'bg-dark-300 shadow-sm text-white' : 'text-gray-500'}`}>
            
            Front
          </button>
          <button
            onClick={() => setView('back')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${view === 'back' ? 'bg-dark-300 shadow-sm text-white' : 'text-gray-500'}`}>
            
            Back
          </button>
        </div>
      </div>

      {/* Heatmap Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Legend */}
        <div className="absolute top-0 left-6 flex flex-col gap-2 text-[10px] font-medium z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muscle-green"></div>{' '}
            Balanced
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muscle-yellow"></div>{' '}
            Undertrained
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muscle-red"></div> Neglected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muscle-overtrained"></div>{' '}
            Overtrained
          </div>
        </div>

        <motion.div
          key={view}
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.3
          }}
          className="w-full h-full flex items-center justify-center pb-20">
          
          <MuscleHeatmapSVG view={view} onMuscleClick={handleMuscleClick} />
        </motion.div>
      </div>

      {/* Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedMuscle &&
        <motion.div
          initial={{
            y: '100%'
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200
          }}
          className="absolute bottom-20 left-0 right-0 bg-dark-200 border-t border-dark-300 rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
          
            <div
            className="w-12 h-1.5 bg-dark-300 rounded-full mx-auto mb-6"
            onClick={() => setSelectedMuscle(null)} />
          

            {(() => {
            const { score, status } = getMuscleScore(selectedMuscle);
            let StatusIcon = CheckCircle2;
            let statusColor = 'text-muscle-green';
            let message = 'Perfectly balanced. Keep up the good work.';
            if (status === 'undertrained') {
              StatusIcon = RefreshCw;
              statusColor = 'text-muscle-yellow';
              message = 'Slightly undertrained. Consider adding volume.';
            } else if (status === 'neglected') {
              StatusIcon = AlertTriangle;
              statusColor = 'text-muscle-red';
              message = 'Critically neglected. High risk of imbalance.';
            } else if (status === 'overtrained') {
              StatusIcon = AlertTriangle;
              statusColor = 'text-muscle-overtrained';
              message = 'Overtrained. Needs recovery time.';
            }
            return (
              <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        {selectedMuscle}
                      </h2>
                      <div
                      className={`flex items-center gap-1.5 text-sm font-medium ${statusColor}`}>
                      
                        <StatusIcon className="w-4 h-4" />
                        <span className="capitalize">{status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        {score}
                        <span className="text-sm text-gray-500 font-normal">
                          /100
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Recovery Score
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-6 bg-dark-300/50 p-3 rounded-xl border border-dark-300">
                    {message}
                  </p>

                  <button
                  onClick={() => setSelectedMuscle(null)}
                  className="w-full py-3 bg-dark-300 hover:bg-dark-100 text-white font-medium rounded-xl transition-colors">
                  
                    Close
                  </button>
                </div>);

          })()}
          </motion.div>
        }
      </AnimatePresence>
    </PageTransition>);

};