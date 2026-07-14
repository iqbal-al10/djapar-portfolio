'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../context/LanguageContext'

const services = [
  { id: 1, title: 'Wedding', icon: '💍', description: 'Create magical moments with live saxophone and DJ performance' },
  { id: 2, title: 'Corporate Event', icon: '🏢', description: 'Professional entertainment for corporate gatherings' },
  { id: 3, title: 'Private Party', icon: '🎉', description: 'Exclusive performances for private celebrations' },
  { id: 4, title: 'Luxury Lounge', icon: '✨', description: 'Sophisticated ambiance for premium lounges' },
  { id: 5, title: 'Night Club', icon: '🎵', description: 'High-energy club performances that keep crowds moving' },
  { id: 6, title: 'Hotel Entertainment', icon: '🏨', description: 'Resident DJ services for hotels and resorts' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })
  const { t } = useLanguage()

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">
            {t('Services', 'Layanan')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            {t('What I', 'Apa yang')}{' '}
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
              {t('Offer', 'Saya Tawarkan')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:shadow-[0_0_30px_rgba(123,44,255,0.3)] transition-all duration-500 group cursor-pointer hover:-translate-y-2"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading mb-2 group-hover:text-gradient transition-colors">
                {t(service.title, service.title)}
              </h3>
              <p className="text-gray-400 text-sm">
                {t(service.description, service.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
