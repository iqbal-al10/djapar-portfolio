'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

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

        {/* Logo SAJA - NO TEKS */}
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

      {/* Scroll Indicator - Aesthetic Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => {
          const aboutSection = document.getElementById('about')
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        {/* Glow Effect Behind */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#7B2CFF]/20 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated Line */}
        <motion.div
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'loop'
          }}
          className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#7B2CFF] to-transparent"
        />

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
            className="text-[10px] md:text-xs font-light tracking-[0.3em] uppercase text-white/60 group-hover:text-white/80 transition-colors duration-500"
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
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#7B2CFF]"
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
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#7B2CFF]"
          />
        </div>

        {/* 3 Panah dengan Animasi Bounce & Glow */}
        <div className="flex flex-col items-center gap-0.5 relative">
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

        {/* Decorative Line Under */}
        <motion.div
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'loop',
            delay: 0.5
          }}
          className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent"
        />
      </motion.div>
    </section>
  )
}