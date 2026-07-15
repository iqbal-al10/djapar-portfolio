'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-[600px] bg-[#7B2CFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-[600px] bg-[#9D4DFF]/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass inline-block px-6 py-2 rounded-full mb-8"
        >
          <span className="text-sm text-gray-300">
            <span className="text-[#7B2CFF] font-semibold">✦</span>{' '}
            {t('Professional DJ & Live Saxophonist', 'DJ Profesional & Pemain Saxophone Langsung')}
          </span>
        </motion.div>

        {/* Logo Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <div className="relative w-32 h-20 md:w-48 md:h-32 lg:w-96 lg:h-64 mx-auto">
            <Image
              src="/assets/images/djapar-logo-hero.png"
              alt="D.japar Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 128px, 256px"
              priority
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-4"
        >
          {t('Professional DJ & Live Saxophonist', 'DJ Profesional & Pemain Saxophone Langsung')}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-2xl md:text-3xl font-script text-gradient mb-10"
        >
          {t('Every Beat Has A Soul, Every Melody Has A Story.', 'Setiap Beat Punya Jiwa, Setiap Melodi Punya Cerita.')}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer group bg-transparent border-none outline-none"
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
      >
        {/* Glassmorphism - HANYA UNTUK TEKS */}
        <div className="relative px-6 py-3 rounded-full backdrop-blur-xl bg-gradient-to-r from-[#7B2CFF]/20 via-[#7B2CFF]/70 to-[#A855F7]/10 border border-white/10 hover:border-[#7B2CFF]/30 shadow-[0_0_20px_rgba(123,44,255,0.05)] hover:shadow-[0_0_40px_rgba(123,44,255,0.15)] transition-all duration-500">
          
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7B2CFF]/50 via-transparent to-[#A855F7]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Text dengan efek */}
          <div className="relative">
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                y: [0, -2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="text-[10px] md:text-xs font-light tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors duration-500 relative z-10"
            >
              {t('Scroll to explore', 'Gulir untuk menjelajah')}
            </motion.span>
            
            {/* Decorative Dots */}
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: 0.5
              }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#7B2CFF] shadow-[0_0_10px_rgba(123,44,255,0.5)]"
            />
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: 1
              }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
          </div>
        </div>

        {/* 3 Panah dengan Animasi Bounce & Glow - TERPISAH DI BAWAH */}
        <div className="flex flex-col items-center gap-0.5 relative -mt-1">
          {/* Glow untuk panah */}
          <div className="absolute inset-0 -z-10 bg-[#7B2CFF]/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: 'loop',
              delay: 0
            }}
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#7B2CFF] drop-shadow-[0_0_8px_rgba(123,44,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(123,44,255,0.6)] transition-all duration-300" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: 'loop',
              delay: 0.15
            }}
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#9D4DFF] drop-shadow-[0_0_8px_rgba(157,77,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(157,77,255,0.6)] transition-all duration-300" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: 'loop',
              delay: 0.3
            }}
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300" />
          </motion.div>
        </div>
      </motion.button>
    </section>
  )
}