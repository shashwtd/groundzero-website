'use client';
import Image from 'next/image';
import Header from '@/components/Header';
import HeroBackground from '@/components/HeroBackground';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-white overflow-hidden">
      <Header />

      <main className="relative flex-1 flex items-center justify-center w-full overflow-hidden">
        <HeroBackground />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 pt-0 pb-20 px-4 md:px-0">
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
            <h1 className="flex flex-col items-center gap-px font-serif text-[32px] sm:text-[48px] md:text-[68px] leading-tight md:leading-18 tracking-tighter">
              <motion.span
                className="w-max text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Exploring the ideas and breakthroughs
              </motion.span>
              <motion.span
                className="w-max text-white/85"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              >
                shaping the future of AI and tech
              </motion.span>
            </h1>
            <motion.p
              className="max-w-[620px] px-4 md:px-0 font-mono font-normal text-sm sm:text-base md:text-lg leading-relaxed md:leading-normal text-white/65 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Your friendly neighborhood space exploring AI/ML and tech, with occasional notes, conversations, and summaries.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Youtube/Primary Button */}
            <a href="https://www.youtube.com/@Ground_ZeroYT" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative flex items-center justify-center h-12 w-max px-6 gap-4 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] cursor-pointer"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <span className="relative font-mono font-medium text-xl leading-normal text-[#5e3535] tracking-tight">
                  Youtube
                </span>
                <Image
                  src="/youtube-logo.svg"
                  alt="Youtube"
                  width={28}
                  height={28}
                  className="relative object-contain opacity-80"
                />
              </motion.button>
            </a>

            {/* Twitter/X Button */}
            <a href="https://x.com/groundzero_twt" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative flex items-center justify-center h-12 w-17 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] cursor-pointer"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Image
                  src="/twitter-logo.svg"
                  alt="Twitter"
                  width={28}
                  height={28}
                  className="relative object-contain opacity-80"
                />
              </motion.button>
            </a>

            {/* Discord Button */}
            <a href="https://discord.gg/aChCV3cbyn" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative flex items-center justify-center h-12 w-17 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] cursor-pointer"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Image
                  src="/discord-logo.svg"
                  alt="Discord"
                  width={32}
                  height={32}
                  className="relative object-contain opacity-80"
                />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
