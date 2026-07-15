'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Counter from '../ui/Counter'
import { useLanguage } from '../../context/LanguageContext'

const stats = [
  { value: 100, label: 'Live Performance', suffix: '+' },
  { value: 20, label: 'Premium Venue', suffix: '+' },
  { value: 7, label: 'Years Experience', suffix: '+' },
  { value: 1000, label: 'Happy Audience', suffix: '+' },
]

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#7B2CFF]/10 to-[#A855F7]/10 border border-white/10">
              <Image
                src="/assets/images/djapar.jpeg"
                alt="D.japar - Professional DJ & Live Saxophonist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-xl">
              <span className="text-sm text-gray-300">
                <span className="text-[#7B2CFF] font-bold">✦</span> {t('Djapar - Professional DJ & Live Saxophonist', 'Djapar - DJ Profesional & Pemain Saxophone Langsung')}
              </span>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-[#7B2CFF]/20 to-[#9D4DFF]/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-[#A855F7]/20 to-[#7B2CFF]/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">
                {t('About Me', 'Tentang Saya')}
              </span>
              <h2 className="text-4xl md:text-5xl font-heading leading-[1.1]">
                {t('The Beat Behind', 'Di Balik Beat')}
                <br />
                <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
                  {t('The Saxophone', 'Saxophone')}
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {t(
                'D.japar is a Professional DJ and Saxophonist who presents a Hybrid Performance concept. He not only plays electronic music but also performs live saxophone, creating an exclusive, emotional, and unforgettable musical experience.',
                'D.japar adalah seorang Professional DJ sekaligus pemain Saxophone yang menghadirkan konsep Hybrid Performance. Ia tidak hanya memainkan musik elektronik, tetapi juga memainkan saxophone secara live sehingga menciptakan pengalaman musikal yang eksklusif, emosional dan tidak terlupakan.'
              )}
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center hover:shadow-[0_0_30px_rgba(123,44,255,0.3)] transition-all duration-500"
                >
                  <div className="text-2xl md:text-3xl font-heading bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
                    <Counter end={stat.value} duration={2} />
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{t(stat.label, stat.label)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
