'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Users, Music, Sparkles, Mail, Mic, Disc, Clock, Shield, Award, Gem } from 'lucide-react'
import { Button } from '../ui/Button'
import { useLanguage } from '../../context/LanguageContext'

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    venue: '',
    date: '',
    message: ''
  })
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })
  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEventToggle = (eventType: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventType)
        ? prev.filter(item => item !== eventType)
        : [...prev, eventType]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // VALIDASI: Pastikan nama, email, phone terisi
    if (!formData.name || !formData.email || !formData.phone) {
      alert(t('Please fill in all required fields.', 'Harap isi semua field yang wajib.'))
      setIsSubmitting(false)
      return
    }

    // BUILD PESAN WHATSAPP LENGKAP
    const eventList = selectedEvents.length > 0 ? selectedEvents.join(', ') : 'Not specified'
    
    const message = 
`Hello D.japar,

I'm interested in booking your DJ & Live Saxophone performance.

📋 Event Details:
─────────────────
📌 Event Type(s) : ${eventList}
📍 Location       : ${formData.venue || '-'}
📅 Date           : ${formData.date || '-'}

👤 Client Information:
─────────────────
👤 Name    : ${formData.name}
📧 Email   : ${formData.email}
📱 Phone   : ${formData.phone}

📝 Additional Message:
─────────────────
${formData.message || '-'}

Thank you.

───
Sent from D.japar Official Website`

    // ENCODE URL
    const encodedMessage = encodeURIComponent(message)
    
    // BUKA WHATSAPP
    window.open(`https://wa.me/6281515483038?text=${encodedMessage}`, '_blank')
    setIsSubmitting(false)
  }

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Private Party',
    'Luxury Lounge',
    'Night Club',
    'Hotel Entertainment',
    'Music Festival',
    'Exclusive Gathering',
    'VIP Event'
  ]

  const whyBookItems = [
    { icon: Sparkles, text: 'Hybrid DJ + Live Saxophone Performance' },
    { icon: Users, text: 'Advanced Crowd Reading & Audience Engagement' },
    { icon: Mic, text: 'Live Improvisation & Interactive Performance' },
    { icon: Music, text: 'Premium Entertainment Experience' },
    { icon: Clock, text: 'Flexible Booking & Customizable Packages' },
    { icon: Shield, text: 'Professional & Reliable Service' },
    { icon: Award, text: '7+ Years of Professional Experience' },
    { icon: Gem, text: 'Luxury Stage Presence & Visual Experience' },
    { icon: Disc, text: 'Open Format DJ - All Genres Welcome' },
  ]

  return (
    <section id="booking" className="py-20 md:py-28 lg:py-32 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-[600px] bg-[#7B2CFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-[600px] bg-[#A855F7]/5 rounded-full blur-3xl" />
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
            {t('Booking', 'Pemesanan')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            {t('Book Your', 'Pesan')}{' '}
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
              {t('Experience', 'Pengalaman')}
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t("Let's create an unforgettable experience together. Fill in the form below and I'll get back to you within 24 hours.", 'Mari ciptakan pengalaman tak terlupakan bersama. Isi formulir di bawah dan saya akan menghubungi Anda dalam 24 jam.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 md:p-8 hover:shadow-[0_0_40px_rgba(123,44,255,0.15)] transition-all duration-500">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">
                      {t('Full Name', 'Nama Lengkap')} <span className="text-[#7B2CFF]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('Your full name', 'Nama lengkap Anda')}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#7B2CFF] focus:outline-none transition-colors text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">
                      {t('Email Address', 'Alamat Email')} <span className="text-[#7B2CFF]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#7B2CFF] focus:outline-none transition-colors text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">
                    {t('WhatsApp Number', 'Nomor WhatsApp')} <span className="text-[#7B2CFF]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+62 812 3456 7890"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#7B2CFF] focus:outline-none transition-colors text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">
                    {t('Event Type(s)', 'Tipe Acara')} <span className="text-gray-500">({t('select all that apply', 'pilih semua yang sesuai')})</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {eventTypes.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          selectedEvents.includes(type)
                            ? 'bg-[#7B2CFF]/20 border border-[#7B2CFF]/50'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(type)}
                          onChange={() => handleEventToggle(type)}
                          className="w-4 h-4 accent-[#7B2CFF] cursor-pointer"
                        />
                        <span className="text-sm">{t(type, type)}</span>
                      </label>
                    ))}
                  </div>
                  {selectedEvents.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {t('Selected', 'Dipilih')}: {selectedEvents.join(', ')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">
                    {t('Venue / Location', 'Tempat / Lokasi')}
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder={t('Hotel, Club, etc.', 'Hotel, Klub, dll.')}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#7B2CFF] focus:outline-none transition-colors text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">
                    {t('Event Date', 'Tanggal Acara')}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#7B2CFF] focus:outline-none transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">
                    {t('Additional Message', 'Pesan Tambahan')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder={t('Tell me more about your event...', 'Ceritakan lebih lanjut tentang acara Anda...')}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#7B2CFF] focus:outline-none transition-colors text-white placeholder:text-gray-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#7B2CFF] to-[#9D4DFF] hover:from-[#9D4DFF] hover:to-[#7B2CFF] text-white py-4 rounded-xl text-lg font-semibold shadow-[0_0_30px_rgba(123,44,255,0.3)] hover:shadow-[0_0_50px_rgba(123,44,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? t('Processing...', 'Memproses...') : t('Book Now via WhatsApp', 'Pesan Sekarang via WhatsApp')}
                </Button>

                <p className="text-center text-xs text-gray-500">
                  {t('You will be redirected to WhatsApp to complete your booking', 'Anda akan diarahkan ke WhatsApp untuk menyelesaikan pemesanan')}
                </p>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-2 space-y-7"
          >
            <div className="glass rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(123,44,255,0.15)] transition-all duration-500">
              <h3 className="font-heading text-xl mb-4">{t('Quick Contact', 'Kontak Cepat')}</h3>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/6281515483038" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <Send className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <p className="text-xs text-gray-400">+6281515483038</p>
                  </div>
                </a>
                <a 
                  href="mailto:fajarmif110801@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EA4335]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#EA4335]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-gray-400">fajarmif110801@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(123,44,255,0.15)] transition-all duration-500">
              <h3 className="font-heading text-xl mb-4">{t('Why Book With Me?', 'Kenapa Pesan Dengan Saya?')}</h3>
              <div className="grid grid-cols-1 gap-2">
                {whyBookItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <item.icon className="w-4 h-4 text-[#7B2CFF] flex-shrink-0" />
                    <span className="text-sm text-gray-300">{t(item.text, item.text)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#7B2CFF]/10 border border-[#7B2CFF]/20">
                  <Clock className="w-5 h-5 text-[#7B2CFF] flex-shrink-0" />
                  <p className="text-sm text-gray-300">
                    <span className="text-[#7B2CFF] font-semibold">{t('24/7 Response', 'Respon 24/7')}</span> — {t("I'll get back to you within 24 hours.", 'Saya akan menghubungi Anda dalam 24 jam.')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
