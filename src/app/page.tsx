'use client';
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Generate random values for meteors outside component
const meteorTimings = Array.from({ length: 20 }, () => ({
  duration: 2 + Math.random() * 2,
  repeatDelay: 3 + Math.random() * 5,
}));

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const cloudLeftX = useSpring(mouseX, springConfig);
  const cloudLeftY = useSpring(mouseY, springConfig);

  // Right cloud moves in opposite direction with different spring physics
  const mouseXInverted = useMotionValue(0);
  const mouseYInverted = useMotionValue(0);
  const cloudRightX = useSpring(mouseXInverted, { damping: 30, stiffness: 80 });
  const cloudRightY = useSpring(mouseYInverted, { damping: 30, stiffness: 80 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize to -1 to 1 range, then scale to subtle movement
    const x = ((clientX / innerWidth) - 0.5) * 15; // Reduced to 15px max
    const y = ((clientY / innerHeight) - 0.5) * 15;

    mouseX.set(x);
    mouseY.set(y);

    // Right cloud moves in opposite direction with similar intensity
    mouseXInverted.set(-x * 1.2); // Opposite direction, 120% intensity for balance
    mouseYInverted.set(-y * 1.2);
  };

  return (
    <div
      className="relative flex flex-col items-center min-h-screen w-full bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Header />

      <main className="relative flex-1 flex items-center justify-center w-full overflow-hidden">
        {/* SVG Filter Definition */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="figmaNoiseFilter" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="1.2" stitchTiles="stitch" numOctaves="4" result="noise" seed="2400"/>
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
            </feComponentTransfer>
            <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
            <feFlood floodColor="rgba(143, 44, 31, 0.2)" result="color1Flood"/>
            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
            <feMerge>
              <feMergeNode in="shape"/>
              <feMergeNode in="color1"/>
            </feMerge>
          </filter>
        </svg>

        {/* Background with gradient and images */}
        <div
          className="absolute inset-0 bg-linear-to-b from-[#bf635c] via-[#e79c7f] via-60% to-[#fcf7d9] overflow-hidden"
          style={{ filter: 'url(#figmaNoiseFilter)' }}
        >

          {/* Cloud images - centered with creative parallax */}
          <motion.div
            className="absolute -left-1/5 -bottom-32 w-[1038px] h-[461px] 2xl:scale-150 opacity-90"
            style={{
              x: cloudLeftX,
              y: cloudLeftY,
            }}
          >
            <Image
              src="/clouds.png"
              alt=""
              fill
              className="object-cover object-center pointer-events-none"
            />
          </motion.div>
          <motion.div
            className="absolute -right-1/5 -bottom-32 w-[1038px] h-[461px] 2xl:scale-150 opacity-90"
            style={{
              x: cloudRightX,
              y: cloudRightY,
            }}
            animate={{
              x: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/clouds.png"
              alt=""
              fill
              className="object-cover object-center pointer-events-none"
            />
          </motion.div>

          {/* Meteor shower effect */}
          {meteorTimings.map((timing, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[60px] bg-gradient-to-b from-white/60 to-transparent rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `-10%`,
                rotate: -225,
              }}
              animate={{
                x: [0, 300],
                y: [0, 300],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: timing.duration,
                repeat: Infinity,
                repeatDelay: timing.repeatDelay,
                ease: 'easeIn',
                delay: i * 0.8,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 pt-0 pb-20 px-4 md:px-0">
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
            <h1 className="flex flex-col items-center gap-px font-serif text-[32px] sm:text-[48px] md:text-[68px] leading-tight md:leading-18 tracking-tighter">
              <span className="w-max text-white">
                Exploring the ideas and breakthroughs
              </span>
              <span className="w-max text-white/85">
                shaping the future of AI and tech
              </span>
            </h1>
            <p className="max-w-[620px] px-4 md:px-0 font-mono font-normal text-sm sm:text-base md:text-lg leading-relaxed md:leading-normal text-white/65 tracking-tight">
              Your friendly neighborhood space exploring AI/ML and tech, with occasional notes, conversations, and summaries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5">
            {/* Youtube/Primary Button */}
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
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
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

            {/* Twitter/X Button */}
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
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <Image
                src="/twitter-logo.svg"
                alt="Twitter"
                width={28}
                height={28}
                className="relative object-contain opacity-80"
              />
            </motion.button>

            {/* Discord Button */}
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
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <Image
                src="/discord-logo.svg"
                alt="Discord"
                width={32}
                height={32}
                className="relative object-contain opacity-80"
              />
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
