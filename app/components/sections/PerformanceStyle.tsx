'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../context/LanguageContext'

const styles = [
  { name: 'Bigroom', icon: '🎵', description: 'Massive festival sounds' },
  { name: 'Afro House', icon: '🌍', description: 'Rhythmic African beats' },
  { name: 'Amapiano', icon: '🎹', description: 'South African piano house' },
  { name: 'Baile Funk', icon: '🔥', description: 'Brazilian funk energy' },
  { name: 'Commercial EDM', icon: '⚡', description: 'Mainstream electronic' },
  { name: 'Indobounce', icon: '🇮🇩', description: 'Indonesian bounce music' },
  { name: 'Open Format', icon: '🔄', description: 'Versatile genre mixing' },
  { name: 'Live Saxophone', icon: '🎷', description: 'Live saxophone performance' },
]

export default function PerformanceStyle() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })
  const { t } = useLanguage()

  return (
    <section id="performance" ref={sectionRef} className="py-20 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">
            {t('Performance', 'Performa')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            {t('Music', 'Musik')}{' '}
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
              {t('Styles', 'Gaya')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {styles.map((style, index) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center hover:shadow-[0_0_30px_rgba(123,44,255,0.3)] transition-all duration-500 group cursor-pointer hover:-translate-y-1"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {style.icon}
              </div>
              <h4 className="text-sm font-heading group-hover:text-gradient transition-colors">
                {t(style.name, style.name)}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {t(style.description, style.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
