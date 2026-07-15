'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Youtube,
  MessageCircle,
} from 'lucide-react'
import { FaTiktok, FaTelegram } from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'

const contacts = [
  { 
    icon: Instagram, 
    label: 'Instagram', 
    value: '@d.japarrr', 
    href: 'https://instagram.com/d.japarrr',
    color: '#C13584'
  },
  { 
    icon: FaTiktok, 
    label: 'TikTok', 
    value: '@djapar_inst', 
    href: 'https://tiktok.com/@djapar_inst',
    color: '#000000'
  },
  { 
    icon: Mail, 
    label: 'Email', 
    value: 'djapar.inst@gmail.com', 
    href: 'mailto:djapar.inst@gmail.com',
    color: '#EA4335'
  },
  { 
    icon: Phone, 
    label: 'WhatsApp', 
    value: '+6281515483038', 
    href: 'https://wa.me/6281515483038',
    color: '#25D366'
  },
  { 
    icon: Youtube, 
    label: 'YouTube', 
    value: 'Djapar_id', 
    href: 'https://www.youtube.com/@djapar_id',
    color: '#FF0000'
  },
  { 
    icon: FaTelegram, 
    label: 'Telegram', 
    value: '@ini_djapar', 
    href: 'https://t.me/ini_djapar',
    color: '#26A5E4'
  },
]

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })
  const { t } = useLanguage()

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=7.253472,112.717028'
  const mapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15829.788424892047!2d112.708723512375!3d-7.253472236795348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMTIuNSJTIDExMsKwNDMnMDEuMyJF!5e0!3m2!1sen!2sid!4v1234567890'

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-32 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-[600px] bg-[#9D4DFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-[600px] bg-[#A855F7]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">
            {t('Contact', 'Kontak')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            {t('Get In', 'Hubungi')}{' '}
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
              {t('Touch', 'Saya')}
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t('Connect with me through any of these platforms. I\'ll get back to you as soon as possible!', 'Terhubung dengan saya melalui platform ini. Saya akan merespon secepat mungkin!')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 md:p-8 hover:shadow-[0_0_40px_rgba(123,44,255,0.15)] transition-all duration-500">
              <h3 className="font-heading text-xl mb-6">{t('Connect With Me', 'Terhubung Dengan Saya')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contacts.map((contact, index) => {
                  const IconComponent = contact.icon
                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] border border-white/5 hover:border-[#7B2CFF]/30"
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${contact.color}20` }}
                      >
                        <IconComponent 
                          className="w-5 h-5 transition-colors duration-300"
                          style={{ color: contact.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                          {t(contact.label, contact.label)}
                        </p>
                        <p className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                          {contact.value}
                        </p>
                      </div>
                      <Send className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-1"
          >
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group h-full"
            >
              <div className="glass rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(123,44,255,0.15)] transition-all duration-500 h-full flex flex-col">
                <div className="w-full h-52 md:h-60 relative overflow-hidden">
                  <iframe
                    src={mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                    title="D.japar Location Map"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7B2CFF]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 text-[#7B2CFF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg group-hover:text-gradient transition-colors duration-300">{t('📍 Location', '📍 Lokasi')}</h3>
                      <p className="text-gray-400 text-sm mt-0.5 group-hover:text-white transition-colors duration-300">
                        {t('PPW8+JR6 Tembok Dukuh', 'PPW8+JR6 Tembok Dukuh')}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {t('Surabaya, Jawa Timur', 'Surabaya, Jawa Timur')}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {t('7°15\'12.5"S 112°43\'01.3"E', '7°15\'12.5"S 112°43\'01.3"E')}
                      </p>
                      <p className="text-xs text-[#7B2CFF] mt-2 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        <MapPin className="w-3 h-3" />
                        {t('Open in Google Maps →', 'Buka di Google Maps →')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto hover:shadow-[0_0_30px_rgba(123,44,255,0.15)] transition-all duration-500">
            <p className="text-gray-300 text-sm mb-4">
              {t('Prefer to send a message directly?', 'Lebih suka kirim pesan langsung?')}
            </p>
            <a 
              href="https://wa.me/6281515483038"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#7B2CFF] to-[#9D4DFF] text-white font-semibold transition-all duration-300 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ 
                boxShadow: '0 0 40px rgba(123, 44, 255, 0.6), 0 0 80px rgba(168, 85, 247, 0.4), 0 0 120px rgba(123, 44, 255, 0.2)',
              }} />
              <span className="absolute inset-0 rounded-full animate-pulse opacity-75" style={{
                boxShadow: 'inset 0 0 30px rgba(168, 85, 247, 0.3)',
              }} />
              <MessageCircle className="w-5 h-5 relative z-10 animate-pulse" />
              <span className="relative z-10">{t('Chat with me on WhatsApp', 'Chat dengan saya di WhatsApp')}</span>
              <span className="absolute top-1 right-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping">✦</span>
              <span className="absolute bottom-1 left-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 animate-ping">✦</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}