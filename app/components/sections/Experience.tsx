'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../context/LanguageContext'

const experiences = [
  {
    period: '2020–2024',
    venue: 'Hotel Ayola',
    location: 'Mojokerto',
    role: {
      en: 'Filling the atmosphere in the hotel lounge/rooftop, creating a comfortable and familiar vibe, while maintaining the exclusive entertainment essence of the band for the guests.',
      id: 'Mengisi atmosfer di lounge/rooftop hotel, menciptakan getaran (vibe) yang nyaman, akrab, namun tetap mempertahankan esensi hiburan band yang eksklusif bagi para tamu.'
    }
  },
  {
    period: '2023',
    venue: "Cat's Pajamas",
    location: 'Surabaya',
    role: {
      en: 'As a resident at one of the legendary nightclubs, delivering dynamic hybrid performances with precise beat transitions to keep the dance floor crowd consistently enthusiastic.',
      id: 'Sebagai resident di salah satu nightclub legendaris, membawakan performa hybrid yang dinamis dengan transisi beat yang presisi untuk menjaga antusiasme crowd lantai dansa tetap konsisten.'
    }
  },
  {
    period: '2024',
    venue: 'Hellens Night Mart',
    location: 'Surabaya',
    role: {
      en: 'DJ & Saxophone collaboration on the stage of a trendy modern night mart & bar, focusing on high-energy crowd reading and creating interactive stage performances with hit songs.',
      id: 'kolaborasi DJ & Saxophone dipanggung night mart & bar modern yang trendi, berfokus pada crowd reading berenergi tinggi serta menciptakan interaksi panggung yang interaktif lewat lagu-lagu hits.'
    }
  },
  {
    period: '2024–2026',
    venue: 'Aston Hotel & Conference Center',
    location: 'Surabaya',
    role: {
      en: 'Acting as band entertainment provider for formal events, conferences, weddings, and exclusive gatherings, transitioning from relaxed ambience background music to classy climactic performances.',
      id: 'Bertindak sebagai band entertainment penyedia untuk acara formal, konferensi, wedding dan exclusive gathering, menghadirkan transisi suasana dari ambience background music yang santai menuju sesi penampilan klimaks yang berkelas.'
    }
  },
  {
    period: '2026',
    venue: 'BV Luxury & KTV',
    location: 'Surabaya',
    role: {
      en: 'Presenting exclusive performances at a premium-scale luxury lounge, focusing on elegant music alignment to pamper VIP guests (high-end market).',
      id: 'Menyajikan penampilan eksklusif pada lounge mewah berskala premium, berfokus pada penyelarasan musik yang elegan untuk memanjakan tamu VIP (high-end market).'
    }
  },
  {
    period: '2026',
    venue: 'Gedung Astoria',
    location: 'Mojokerto',
    role: {
      en: 'Being the main performer at Gedung Astoria affirming my professionalism as a hybrid musician (DJ & Saxophonist). With full control over the event atmosphere, I blend electronic beat precision and soulful saxophone to deliver performances that not only fill the grandeur of the space but also create deep emotional connections with the guests.',
      id: 'Menjadi penampil utama di Gedung Astoria menegaskan profesionalisme saya sebagai musisi hybrid (DJ & Saxophonist). Dengan kendali penuh atas atmosfer acara, saya memadukan presisi beat elektronik dan soulful saxophone untuk menghadirkan pertunjukan yang tidak hanya mengisi kemegahan ruang, tetapi juga menciptakan koneksi emosional yang mendalam bagi para tamu.'
    }
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })
  const { t, language } = useLanguage()

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">
            {t('Experience', 'Pengalaman')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            {t('Performance', 'Performa')}{' '}
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
              {t('Timeline', 'Linimasa')}
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] opacity-30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className={`flex items-center gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(123,44,255,0.3)] transition-all duration-500 group cursor-pointer">
                  <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-sm text-[#7B2CFF] font-semibold">{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-heading mb-1 group-hover:text-gradient transition-colors">
                    {exp.venue}
                  </h3>
                  <p className={`text-sm text-gray-400 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {exp.location}
                  </p>
                  <p className={`text-sm text-gray-500 mt-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {language === 'id' ? exp.role.id : exp.role.en}
                  </p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="relative z-10">
                <div className="w-4 h-4 rounded-full bg-[#7B2CFF] shadow-[0_0_20px_rgba(123,44,255,0.5)]">
                  <div className="absolute inset-0 rounded-full bg-[#7B2CFF] animate-ping opacity-75" />
                </div>
              </div>

              {/* Empty Space */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}