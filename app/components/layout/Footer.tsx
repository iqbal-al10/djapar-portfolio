'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  Instagram, 
  Mail, 
  Phone, 
  Heart, 
  Send,
  Youtube,
  MapPin,
  ArrowUp
} from 'lucide-react'
import { FaTiktok, FaTelegram } from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/d.japarrr', label: 'Instagram', color: '#E4405F' },
  { icon: FaTiktok, href: 'https://tiktok.com/@djapar_inst', label: 'TikTok', color: '#000000' },
  { icon: Youtube, href: 'https://youtube.com/@djapar_id', label: 'YouTube', color: '#FF0000' },
  { icon: FaTelegram, href: 'https://t.me/ini_djapar', label: 'Telegram', color: '#26A5E4' },
  { icon: Mail, href: 'mailto:djapar.inst@gmail.com', label: 'Email', color: '#EA4335' },
  { icon: Phone, href: 'https://wa.me/6281515483038', label: 'WhatsApp', color: '#25D366' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { t } = useLanguage()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const notes = ['♪', '♫', '♬', '🎵', '🎶']
  const floatingNotes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    char: notes[i % 5],
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 20 + Math.random() * 30,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
  }))

  return (
    <footer 
      className="relative border-t border-white/5 overflow-hidden min-h-[300px]"
      style={{
        background: '#050505',
      }}
    >
      {/* PURPLE GLOW - SOFT */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl"
          style={{
            background: 'rgba(123, 44, 255, 0.25)',
            animation: 'pulseGlow 4s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-3xl"
          style={{
            background: 'rgba(168, 85, 247, 0.2)',
            animation: 'pulseGlow 4s ease-in-out infinite 2s',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{
            background: 'rgba(157, 77, 255, 0.15)',
            animation: 'pulseGlow 4s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* NOT MUSIK */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {floatingNotes.map((note) => (
          <div
            key={note.id}
            className="absolute"
            style={{
              left: `${note.left}%`,
              top: `${note.top}%`,
              fontSize: `${note.size}px`,
              color: 'rgba(168, 85, 247, 0.3)',
              animation: `floatNote ${note.duration}s ease-in-out infinite ${note.delay}s`,
              textShadow: '0 0 20px rgba(168, 85, 247, 0.1)',
            }}
          >
            {note.char}
          </div>
        ))}
      </div>

      {/* EQUALIZER */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center gap-1 px-4 overflow-hidden"
        style={{ zIndex: 3 }}
      >
        {Array.from({ length: 70 }).map((_, i) => {
          const height = 10 + Math.random() * 60
          const delay = Math.random() * 2
          const duration = 1.5 + Math.random() * 2
          
          return (
            <div
              key={i}
              className="w-1 rounded-full"
              style={{
                height: `${height}%`,
                background: 'linear-gradient(to top, rgba(123,44,255,0.4), rgba(168,85,247,0.4))',
                opacity: 0.4,
                animation: `waveBar ${duration}s ease-in-out infinite alternate ${delay}s`,
                transformOrigin: 'bottom',
              }}
            />
          )
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* KOLOM 1: LOGO + DESKRIPSI */}
          <div className="space-y-3">
            <Link href="#home" className="inline-block group">
              <div className="relative w-32 h-14 hover:scale-110 transition-transform duration-300">
                <Image
                  src="/assets/images/djapar-logo-hero.png"
                  alt="D.japar Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t(
                'Professional DJ & Live Saxophonist based in Surabaya, Indonesia. Creating unforgettable experiences through hybrid performances.',
                'DJ Profesional & Pemain Saxophone Langsung berbasis di Surabaya, Indonesia. Menciptakan pengalaman tak terlupakan melalui pertunjukan hybrid.'
              )}
            </p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-3 h-3 text-[#A855F7]" />
              <span>{t('Surabaya, East Java, Indonesia', 'Surabaya, Jawa Timur, Indonesia')}</span>
            </div>
          </div>

          {/* KOLOM 2: QUICK LINKS - 2 KOLOM */}
          <div>
            <h3 className="font-heading text-base mb-3 text-white">{t('Quick Links', 'Link Cepat')}</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <Link href="#about" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('About', 'Tentang')}
              </Link>
              <Link href="#experience" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Experience', 'Pengalaman')}
              </Link>
              <Link href="#services" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Services', 'Layanan')}
              </Link>
              <Link href="#gallery" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Gallery', 'Galeri')}
              </Link>
              <Link href="#videos" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Videos', 'Video')}
              </Link>
              <Link href="#music" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Music', 'Musik')}
              </Link>
              <Link href="#testimonials" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Testimonials', 'Testimoni')}
              </Link>
              <Link href="#booking" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Booking', 'Pemesanan')}
              </Link>
              <Link href="#contact" className="text-sm text-gray-400 hover:text-[#A855F7] transition-colors duration-300 hover:-translate-x-0.5 inline-block">
                {t('Contact', 'Kontak')}
              </Link>
            </div>
          </div>

          {/* KOLOM 3: NEWSLETTER + CONTACT */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-base mb-2 text-white">{t('Newsletter', 'Buletin')}</h3>
              <p className="text-sm text-gray-400 mb-2">
                {t('Subscribe to get updates on new performances and events.', 'Berlangganan untuk mendapatkan pembaruan tentang pertunjukan dan acara terbaru.')}
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('Your email', 'Email Anda')}
                  required
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-[#A855F7] focus:outline-none transition-colors text-white placeholder:text-gray-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#7B2CFF] to-[#9D4DFF] hover:from-[#9D4DFF] hover:to-[#7B2CFF] text-white transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {isSubscribed && (
                <p className="text-xs text-green-400 mt-1.5 animate-pulse">
                  ✅ {t('Subscribed successfully!', 'Berlangganan berhasil!')}
                </p>
              )}
            </div>

            <div>
              <h3 className="font-heading text-base mb-2 text-white">{t('Get In Touch', 'Hubungi Saya')}</h3>
              <div className="space-y-1.5">
                <a
                  href="https://wa.me/6281515483038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  </div>
                  <span>+6281515483038</span>
                </a>
                <a
                  href="mailto:djapar.inst@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#EA4335]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
                  </div>
                  <span>djapar.inst@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* KIRI: Social Media */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:shadow-[0_0_20px_rgba(123,44,255,0.3)] transition-all duration-300 hover:-translate-y-1 group"
                  aria-label={social.label}
                >
                  <IconComponent 
                    className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#A855F7] transition-colors duration-300" 
                  />
                </a>
              )
            })}
          </div>

          {/* KANAN: Copyright + Build By + Scroll To Top */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-purple-50 flex items-center gap-1">
              © {new Date().getFullYear()} Djapar. {t('All rights reserved.', 'Hak cipta dilindungi.')}
            </p>
            
            <span className="text-xs text-purple-50">|</span>
            
            <p className="text-xs text-purple-50">
              {t('Build By: Web-Pro-Solutions', 'Dibangun Oleh: Web-Pro-Solutions')}
            </p>
            
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#7B2CFF] to-[#9D4DFF] flex items-center justify-center hover:shadow-[0_0_30px_rgba(123,44,255,0.5)] transition-all duration-300 hover:scale-110 group flex-shrink-0"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.05; transform: scale(1); }
            50% { opacity: 0.07; transform: scale(1.05); }
          }
          
          @keyframes floatNote {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
            50% { transform: translateY(-50px) rotate(10deg); opacity: 0.6; }
          }
          
          @keyframes waveBar {
            0% { transform: scaleY(0.2); opacity: 0.2; }
            100% { transform: scaleY(1); opacity: 0.6; }
          }
        `
      }} />
    </footer>
  )
}
