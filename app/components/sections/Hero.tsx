'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '../ui/Button'
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

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#7B2CFF] to-[#9D4DFF] hover:from-[#9D4DFF] hover:to-[#7B2CFF] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_0_30px_rgba(123,44,255,0.3)] hover:shadow-[0_0_50px_rgba(123,44,255,0.5)] transition-all duration-300"
            onClick={() => window.open('https://wa.me/6281515483038', '_blank')}
          >
            {t('Book Performance', 'Pesan Pertunjukan')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
