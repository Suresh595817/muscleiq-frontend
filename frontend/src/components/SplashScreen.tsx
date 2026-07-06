import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
interface SplashScreenProps {
  onFinish: () => void;
}
export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col items-center justify-center"
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.5
      }}>
      
      {/* Glow backdrop */}
      <div className="absolute w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />

      {/* Logo icon */}
      <motion.div
        initial={{
          scale: 0,
          rotate: -90
        }}
        animate={{
          scale: 1,
          rotate: 0
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 14,
          delay: 0.2
        }}
        className="relative z-10 w-24 h-24 rounded-3xl bg-dark-200 border border-dark-300 shadow-glow-strong flex items-center justify-center mb-8">
        
        <Activity className="w-12 h-12 text-accent" />
      </motion.div>

      {/* App name */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5,
          delay: 0.6
        }}
        className="relative z-10 text-4xl font-bold tracking-tight">
        
        Muscle<span className="text-accent">IQ</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.5,
          delay: 1.0
        }}
        className="relative z-10 text-gray-500 text-sm mt-3 tracking-wide">
        
        AI-Powered Muscle Intelligence
      </motion.p>

      {/* Loading bar */}
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1.3
        }}
        className="relative z-10 mt-12 w-40 h-1 bg-dark-300 rounded-full overflow-hidden">
        
        <motion.div
          initial={{
            width: '0%'
          }}
          animate={{
            width: '100%'
          }}
          transition={{
            duration: 1.0,
            delay: 1.4,
            ease: 'easeInOut'
          }}
          className="h-full bg-accent rounded-full" />
        
      </motion.div>
    </motion.div>);

};