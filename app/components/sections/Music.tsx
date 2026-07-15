'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Pause, SkipForward, SkipBack, Music as MusicIcon } from 'lucide-react'
import Image from 'next/image'

const tracks = [
  {
    id: 1,
    title: 'Djapar - MixTape Open Format',
    subtitle: 'Djapar.inst',
    duration: '12:16',
    audioUrl: '/assets/music/track-1.mp3',
    cover: '/assets/images/music/music-icon.jpg'
  },
  {
    id: 2,
    title: 'Djapar - MixTape Bailee Funk',
    subtitle: 'Djapar.inst',
    duration: '17:21',
    audioUrl: '/assets/music/track-2.mp3',
    cover: '/assets/images/music/music-icon.jpg'
  },
  {
    id: 3,
    title: 'Djapar - MixTape Bigroom',
    subtitle: 'Djapar.inst',
    duration: '11:39',
    audioUrl: '/assets/music/track-3.mp3',
    cover: '/assets/images/music/music-icon.jpg'
  },
]

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [coverError, setCoverError] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  })

  const changeTrack = useCallback((index: number) => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
    setCurrentTrack(index)
  }, [isPlaying])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    
    const audio = audioRef.current
    
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {
        audio.src = tracks[currentTrack].audioUrl
        audio.load()
        setTimeout(() => {
          audio.play().catch(() => {
            setIsPlaying(false)
          })
        }, 100)
      })
      setIsPlaying(true)
    }
  }, [isPlaying, currentTrack])

  const nextTrack = useCallback(() => {
    const next = (currentTrack + 1) % tracks.length
    changeTrack(next)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }, 200)
  }, [currentTrack, changeTrack])

  const prevTrack = useCallback(() => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length
    changeTrack(prev)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }, 200)
  }, [currentTrack, changeTrack])

  // KEYBOARD SHORTCUTS - HANYA BERFUNGSI SAAT MUSIC SECTION VISIBLE
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CEK APAKAH MUSIC SECTION ADA DI VIEWPORT
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      
      // JALANKAN SHORTCUT HANYA JIKA SECTION VISIBLE
      if (!isVisible) return
      
      // Cegah konflik dengan input/form
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return
      }

      // SPACE = Play/Pause
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      }
      
      // ARROW RIGHT = Next Track
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextTrack()
      }
      
      // ARROW LEFT = Previous Track
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevTrack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, nextTrack, prevTrack])

  // Inisialisasi audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      
      const audio = audioRef.current
      
      const handleTimeUpdate = () => {
        if (audio) {
          setCurrentTime(audio.currentTime)
          if (audio.duration) {
            setProgress((audio.currentTime / audio.duration) * 100)
          }
        }
      }
      
      const handleLoadedMetadata = () => {
        if (audio) {
          setDuration(audio.duration)
          setAudioLoaded(true)
        }
      }
      
      const handleEnded = () => {
        setIsPlaying(false)
        setProgress(0)
        setCurrentTime(0)
        const next = (currentTrack + 1) % tracks.length
        setCurrentTrack(next)
      }
      
      const handleError = () => {
        console.log('Audio not available')
        setAudioLoaded(false)
      }
      
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)
        audio.pause()
        audio.src = ''
      }
    }
  }, [currentTrack])

  // Load track ketika berubah
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      audio.src = tracks[currentTrack].audioUrl
      audio.load()
      setProgress(0)
      setCurrentTime(0)
      setAudioLoaded(false)
      setCoverError(false)
      
      if (isPlaying) {
        audio.play().catch(() => {
          setIsPlaying(false)
          setAudioLoaded(false)
        })
      }
    }
  }, [currentTrack, isPlaying])

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const newTime = x * audioRef.current.duration
    audioRef.current.currentTime = newTime
    setProgress(x * 100)
  }

  const currentTrackData = tracks[currentTrack]

  return (
    <section 
      id="music" 
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7B2CFF] font-semibold text-sm tracking-widest uppercase">Music</span>
          <h2 className="text-4xl md:text-5xl font-heading mt-2">
            Latest <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] bg-clip-text text-transparent">Tracks</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative rounded-2xl p-6 md:p-8 hover:shadow-[0_0_40px_rgba(123,44,255,0.2)] transition-all duration-500 overflow-hidden bg-black/60 backdrop-blur-xl border border-white/5"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#7B2CFF]/12 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B2CFF]/5 via-transparent to-[#A855F7]/5" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#7B2CFF] to-[#A855F7]">
                  {!coverError ? (
                    <Image
                      src={currentTrackData.cover}
                      alt={currentTrackData.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      onError={() => setCoverError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MusicIcon className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading">{currentTrackData.title}</h3>
                  <p className="text-gray-400 text-sm">{currentTrackData.subtitle}</p>
                </div>
                <span className="text-sm text-gray-500">{currentTrackData.duration}</span>
              </div>

              <div className="space-y-1">
                <div 
                  className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer relative group"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#7B2CFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(123,44,255,0.5)]"
                    style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={prevTrack}
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110"
                  title="Previous track (Arrow Left)"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-[#7B2CFF] to-[#9D4DFF] flex items-center justify-center hover:shadow-[0_0_30px_rgba(123,44,255,0.5)] transition-all duration-300 hover:scale-105"
                  title="Play/Pause (Space)"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110"
                  title="Next track (Arrow Right)"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Keyboard Shortcut Info - HANYA TAMPIL JIKA SECTION VISIBLE */}
              {(() => {
                if (!sectionRef.current) return null
                const rect = sectionRef.current.getBoundingClientRect()
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0
                
                if (!isVisible) return null
                
                return (
                  <div className="flex justify-center gap-4 text-xs text-gray-500 animate-fade-in">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Space</kbd>
                      Play/Pause
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">←</kbd>
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">→</kbd>
                      Prev/Next
                    </span>
                  </div>
                )
              })()}

              <p className="text-center text-xs text-gray-500">
                {audioLoaded ? '🎵 Ready to play' : 'Loading...'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 space-y-2"
          >
            {tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => changeTrack(index)}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  currentTrack === index
                    ? 'glass border border-[#7B2CFF]/30 shadow-[0_0_20px_rgba(123,44,255,0.1)]'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#7B2CFF]/30 to-[#A855F7]/30">
                    <Image
                      src={track.cover}
                      alt={track.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${currentTrack === index ? 'text-white' : 'text-gray-300'}`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-500">{track.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{track.duration}</span>
                  {currentTrack === index && isPlaying && (
                    <div className="flex gap-0.5 h-3">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-[#7B2CFF] rounded-full"
                          animate={{ height: [6, 12, 6] }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}