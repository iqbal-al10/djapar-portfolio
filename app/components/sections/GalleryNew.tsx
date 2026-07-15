'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryItems = [
  { id: 1, src: '/assets/images/gallery/gambar1.jpg', title: 'Saxophone Solo', tall: true },
  { id: 2, src: '/assets/images/gallery/gambar2.jpg', title: 'Mall Event', tall: false },
  { id: 3, src: '/assets/images/gallery/gambar4.jpg', title: 'Jamming Session', tall: true },
  { id: 5, src: '/assets/images/gallery/gambar3.jpg', title: 'Live Performance', tall: true },
  { id: 4, src: '/assets/images/gallery/gambar5.jpg', title: 'Graduation', tall: false },
  { id: 6, src: '/assets/images/gallery/gambar6.jpg', title: 'Jamming Session', tall: false },
]

export default function GalleryNew() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < galleryItems.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedIndex(null)
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === 'ArrowRight') handleNext()
  }

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-20 md:py-28 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">Gallery</span>
            <h2 className="text-4xl md:text-5xl font-heading mt-2">
              Visual <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">Moments</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setSelectedIndex(index)}
                className={`relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 group cursor-pointer ${
                  item.tall ? 'md:row-span-2' : ''
                }`}
                style={{ 
                  height: '190px',
                  ...(item.tall && { height: '190px' }) // Di mobile semua sama
                }}
              >
                <style jsx>{`
                  @media (min-width: 768px) {
                    .md\\:row-span-2 {
                      height: 400px !important;
                    }
                  }
                `}</style>
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-[#7B2CFF]/50 rounded-2xl transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL - muncul saat gambar diklik */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-[#7B2CFF] transition-colors z-10"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            className={`absolute left-6 text-white hover:text-[#7B2CFF] transition-colors z-10 ${
              selectedIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            disabled={selectedIndex === 0}
          >
            <ChevronLeft size={40} />
          </button>

          <button
            className={`absolute right-6 text-white hover:text-[#7B2CFF] transition-colors z-10 ${
              selectedIndex === galleryItems.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            disabled={selectedIndex === galleryItems.length - 1}
          >
            <ChevronRight size={40} />
          </button>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[selectedIndex].src}
              alt={galleryItems[selectedIndex].title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-white font-heading text-2xl">
                {galleryItems[selectedIndex].title}
              </p>
              <p className="text-gray-400 text-sm">
                {selectedIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}