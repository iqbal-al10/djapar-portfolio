'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const navItems = [
  { labelEn: 'About', labelId: 'Tentang', href: '#about' },
  { labelEn: 'Experience', labelId: 'Pengalaman', href: '#experience' },
  { labelEn: 'Services', labelId: 'Layanan', href: '#services' },
  { labelEn: 'Gallery', labelId: 'Galeri', href: '#gallery' },
  { labelEn: 'Videos', labelId: 'Video', href: '#videos' },
  { labelEn: 'Music', labelId: 'Musik', href: '#music' },
  { labelEn: 'Testimonials', labelId: 'Testimoni', href: '#testimonials' },
  { labelEn: 'Booking', labelId: 'Booking', href: '#booking' },
  { labelEn: 'Contact', labelId: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageChange = (lang: 'en' | 'id') => {
    if (language === lang) return // JIKA SAMA, TIDAK BISA DI KLIK
    setLanguage(lang)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="#home" className="group">
          <div className="relative w-12 h-12 md:w-32 md:h-14 hover:scale-105 transition-transform duration-300">
            <Image
              src="/assets/images/djapar-logo-hero.png"
              alt="D.japar Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 48px, 56px"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {t(item.labelEn, item.labelId)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          {/* ============================================ */}
          {/* TOMBOL BAHASA - 2 SAXOPHONE */}
          {/* ============================================ */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#7B2CFF]/50 transition-all duration-300 min-w-[90px] justify-center">
            {/* SAXOPHONE KIRI - Aktif saat EN */}
            <motion.span
              className="text-base"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: language === 'en' ? 1 : 0,
                scale: language === 'en' ? 1 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              {language === 'en' ? '🎷' : '🎷'}
            </motion.span>

            {/* TOMBOL EN */}
            <button
              onClick={() => handleLanguageChange('en')}
              disabled={language === 'en'}
              className={`text-xs font-medium transition-all duration-300 ${
                language === 'en'
                  ? 'text-[#7B2CFF] cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>

            <span className="text-xs text-gray-600">|</span>

            {/* TOMBOL ID */}
            <button
              onClick={() => handleLanguageChange('id')}
              disabled={language === 'id'}
              className={`text-xs font-medium transition-all duration-300 ${
                language === 'id'
                  ? 'text-[#7B2CFF] cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ID
            </button>

            {/* SAXOPHONE KANAN - Aktif saat ID */}
            <motion.span
              className="text-base"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: language === 'id' ? 1 : 0,
                scale: language === 'id' ? 1 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              {language === 'id' ? '🎷' : '🎷'}
            </motion.span>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* TOMBOL BAHASA MOBILE - 2 SAXOPHONE */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#7B2CFF]/50 transition-all duration-300 min-w-[70px] justify-center">
            {/* SAXOPHONE KIRI MOBILE */}
            <motion.span
              className="text-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: language === 'en' ? 1 : 0,
                scale: language === 'en' ? 1 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              {language === 'en' ? '🎷' : '🎷'}
            </motion.span>

            <button
              onClick={() => handleLanguageChange('en')}
              disabled={language === 'en'}
              className={`text-[10px] font-medium transition-all duration-300 ${
                language === 'en'
                  ? 'text-[#7B2CFF] cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>

            <span className="text-[10px] text-gray-600">|</span>

            <button
              onClick={() => handleLanguageChange('id')}
              disabled={language === 'id'}
              className={`text-[10px] font-medium transition-all duration-300 ${
                language === 'id'
                  ? 'text-[#7B2CFF] cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ID
            </button>

            {/* SAXOPHONE KANAN MOBILE */}
            <motion.span
              className="text-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: language === 'id' ? 1 : 0,
                scale: language === 'id' ? 1 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              {language === 'id' ? '🎷' : '🎷'}
            </motion.span>
          </div>

          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-black/80 backdrop-blur-xl border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 py-2 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(item.labelEn, item.labelId)}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}