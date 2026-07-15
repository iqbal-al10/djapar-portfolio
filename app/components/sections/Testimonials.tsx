'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const testimonials = [
  {
    id: 1,
    name: 'Hotel Manager',
    role: 'Aston Hotel',
    rating: 5,
    text: {
      en: 'D.japar brought an incredible energy to our hotel events. His hybrid DJ and saxophone performance is truly unique and memorable.',
      id: 'D.japar membawa energi luar biasa di acara hotel kami. Performa hybrid DJ dan saxophone-nya benar-benar unik dan berkesan.'
    },
    avatar: '/assets/images/avatar/1.jpg'
  },
  {
    id: 2,
    name: 'Event Organizer',
    role: 'Hellens Night Mart',
    rating: 5,
    text: {
      en: 'Professional, talented, and knows exactly how to read the crowd. Highly recommended for any event.',
      id: 'Profesional, berbakat, dan tahu persis cara membaca audiens. Sangat direkomendasikan untuk acara apapun.'
    },
    avatar: '/assets/images/avatar/2.jpg'
  },
  {
    id: 3,
    name: 'Club Owner',
    role: "Cat's Pajamas Surabaya",
    rating: 5,
    text: {
      en: 'One of the best performers we\'ve had. His sets are always fresh and the crowd absolutely loves him.',
      id: 'Salah satu performer terbaik yang pernah kami miliki. Set-nya selalu segar dan penonton sangat menyukainya.'
    },
    avatar: '/assets/images/avatar/3.jpg'
  },
  {
    id: 4,
    name: 'Wedding Planner',
    role: 'Elite Events',
    rating: 5,
    text: {
      en: 'The saxophone performance at the wedding was magical! Our clients were speechless. Truly a premium experience.',
      id: 'Performa saxophone di pernikahan sungguh ajaib! Klien kami terdiam takjub. Benar-benar pengalaman premium.'
    },
    avatar: '/assets/images/avatar/4.jpg'
  },
  {
    id: 5,
    name: 'Corporate Client',
    role: 'PT. Multinational Corp',
    rating: 5,
    text: {
      en: 'D.japar delivered an outstanding performance at our annual gala. The blend of electronic and live saxophone was perfect.',
      id: 'D.japar memberikan penampilan luar biasa di gala tahunan kami. Perpaduan elektronik dan saxophone langsung sangat sempurna.'
    },
    avatar: '/assets/images/avatar/5.jpg'
  },
  {
    id: 6,
    name: 'Lounge Manager',
    role: 'BV Luxury & KTV',
    rating: 5,
    text: {
      en: 'Our VIP guests were amazed by the live saxophone performance. D.japar is now our go-to artist for exclusive events.',
      id: 'Tamu VIP kami terpukau dengan performa saxophone langsung. D.japar sekarang menjadi artis andalan kami untuk acara eksklusif.'
    },
    avatar: '/assets/images/avatar/6.jpg'
  },
  {
    id: 7,
    name: 'Festival Director',
    role: 'Music Fest 2024',
    rating: 5,
    text: {
      en: 'His performance on the main stage was electrifying! The crowd went wild. A true festival headliner.',
      id: 'Penampilannya di panggung utama sangat membangkitkan semangat! Penonton menjadi hiruk-pikuk. Seorang headliner festival sejati.'
    },
    avatar: '/assets/images/avatar/7.jpg'
  },
  {
    id: 8,
    name: 'Private Client',
    role: 'VIP Event',
    rating: 5,
    text: {
      en: 'We hired D.japar for our private anniversary party and it was the best decision. The live saxophone added a special touch.',
      id: 'Kami menyewa D.japar untuk pesta ulang tahun pribadi dan itu adalah keputusan terbaik. Saxophone langsung menambahkan sentuhan istimewa.'
    },
    avatar: '/assets/images/avatar/8.jpg'
  },
  {
    id: 9,
    name: 'Music Director',
    role: 'Radio Surabaya',
    rating: 5,
    text: {
      en: 'D.japar is one of the most talented DJs and saxophonists in Surabaya. His musicality and stage presence are exceptional.',
      id: 'D.japar adalah salah satu DJ dan pemain saxophone paling berbakat di Surabaya. Musikalitas dan kehadiran panggungnya luar biasa.'
    },
    avatar: '/assets/images/avatar/9.jpg'
  },
]

function AvatarPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B2CFF]/20 to-[#A855F7]/20 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-semibold text-gray-400">
        {name.charAt(0)}
      </span>
    </div>
  )
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const currentPage = Math.floor(currentIndex / itemsPerPage)

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 1 : -1)
    setCurrentIndex(page * itemsPerPage)
  }

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id))
  }

  useEffect(() => {
    if (!inView) return
    if (isHovered) return
    
    const interval = setInterval(() => {
      goToNext()
    }, 1750)

    return () => clearInterval(interval)
  }, [inView, isHovered])

  const visibleTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  )

  return (
    <section id="testimonials" className="py-20 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">
            {t('Testimonials', 'Testimoni')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            {t('What People', 'Apa Kata')}{' '}
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">
              {t('Say', 'Mereka')}
            </span>
          </h2>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait" custom={direction}>
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(123,44,255,0.3)] transition-all duration-500 group"
                >
                  <Quote className="w-8 h-8 text-[#7B2CFF]/30 mb-4" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#7B2CFF] text-[#7B2CFF]" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    &quot;{language === 'id' ? testimonial.text.id : testimonial.text.en}&quot;
                  </p>
                  
                  <div className="flex items-center gap-3">
                    {imageErrors.has(testimonial.id) ? (
                      <AvatarPlaceholder name={testimonial.name} />
                    ) : (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={() => handleImageError(testimonial.id)}
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`transition-all duration-300 rounded-full ${
                currentPage === index
                  ? 'w-8 h-2 bg-[#7B2CFF]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {isHovered && (
          <p className="text-center text-xs text-gray-500 mt-3 animate-pulse">
            ⏸️ {t('Paused', 'Berhenti')}
          </p>
        )}
      </div>
    </section>
  )
}