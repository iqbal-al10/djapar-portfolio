'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X, ChevronLeft, ChevronRight, Video as VideoIcon } from 'lucide-react'

const videos = [
  { 
    id: 1, 
    title: 'Djapar - Dj X Saxophone Live Performance', 
    subtitle: 'Mojo Fest New Year 2025', 
    thumbnail: 'https://img.youtube.com/vi/2yunzvXXqJ0/hqdefault.jpg',
    youtubeId: '2yunzvXXqJ0'
  },
  { 
    id: 2, 
    title: 'Djapar - Dj X Saxophone Wedding Performance', 
    subtitle: 'Wedding After Party', 
    thumbnail: 'https://img.youtube.com/vi/4-ugEU4PjXw/hqdefault.jpg',
    youtubeId: '4-ugEU4PjXw'
  },
  { 
    id: 3, 
    title: 'Djapar - Solo Saxophone Performance', 
    subtitle: 'Wedding Kirab (The greatest showman - a million dreams)', 
    thumbnail: 'https://img.youtube.com/vi/dKS9uSvHVck/hqdefault.jpg',
    youtubeId: 'dKS9uSvHVck'
  },
]

function VideoPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#7B2CFF]/10 to-[#A855F7]/10">
      <VideoIcon className="w-16 h-16 text-gray-600 mb-3" />
      <span className="text-sm text-gray-500">{title}</span>
    </div>
  )
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  })

  const currentIndex = selectedVideo !== null 
    ? videos.findIndex(v => v.id === selectedVideo) 
    : -1

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedVideo(videos[currentIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setSelectedVideo(videos[currentIndex + 1].id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedVideo(null)
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === 'ArrowRight') handleNext()
  }

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id))
  }

  return (
    <section id="videos" className="py-20 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">Videos</span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            Performance <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">Highlights</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => {
            const hasError = imageErrors.has(video.id)
            
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                onClick={() => setSelectedVideo(video.id)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(123,44,255,0.3)] hover:-translate-y-2"
              >
                <div className="relative aspect-video bg-black">
                  {!hasError ? (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => handleImageError(video.id)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  ) : (
                    <VideoPlaceholder title={video.title} />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                      <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:bg-[#7B2CFF]/50 group-hover:border-[#7B2CFF] group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(123,44,255,0)] group-hover:shadow-[0_0_50px_rgba(123,44,255,0.4)]">
                        <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h4 className="text-white font-heading text-xl">{video.title}</h4>
                    <p className="text-gray-400 text-sm">{video.subtitle}</p>
                  </div>

                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-[#7B2CFF]/50 rounded-2xl transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {selectedVideo !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#7B2CFF] transition-all duration-300 hover:scale-110 z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={32} />
          </button>

          <button
            className={`absolute left-6 text-white hover:text-[#7B2CFF] transition-all duration-300 hover:scale-110 z-10 ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={40} />
          </button>

          <button
            className={`absolute right-6 text-white hover:text-[#7B2CFF] transition-all duration-300 hover:scale-110 z-10 ${
              currentIndex === videos.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            disabled={currentIndex === videos.length - 1}
          >
            <ChevronRight size={40} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(123,44,255,0.2)] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videos[currentIndex].youtubeId}?autoplay=1&rel=0`}
              title={videos[currentIndex].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
              <p className="text-white font-heading text-xl">
                {videos[currentIndex].title}
              </p>
              <p className="text-gray-400 text-sm">
                {videos[currentIndex].subtitle}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {currentIndex + 1} / {videos.length}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
