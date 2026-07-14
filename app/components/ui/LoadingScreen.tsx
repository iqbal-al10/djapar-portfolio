'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [barHeights, setBarHeights] = useState<number[]>([])

  useEffect(() => {
    // Generate random heights sekali di mount
    const heights = Array.from({ length: 12 }, () => 40 + Math.random() * 40)
    setBarHeights(heights)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  if (!loading) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
        exit={{ opacity: 0, y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-44 h-32 md:w-64 md:h-48">
            <Image
              src="/assets/images/djapar-logo-hero.png"
              alt="D.japar Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 160px, 224px"
              priority
              unoptimized
            />
          </div>
          <div className="absolute -inset-8 -z-10 opacity-20 blur-3xl bg-[#7B2CFF] rounded-full animate-pulse" />
        </motion.div>

        <div className="flex items-end gap-1 h-16 mb-8">
          {barHeights.map((height, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-to-t from-[#7B2CFF] to-[#9D4DFF] rounded-full"
              initial={{ height: 20 }}
              animate={{
                height: [20, height, 20],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7B2CFF] via-[#9D4DFF] to-[#A855F7] rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <p className="mt-4 text-sm text-gray-400 font-mono">
          {Math.floor(Math.min(progress, 100))}%
        </p>

        <motion.p
          className="mt-2 text-xs text-gray-500 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Experience
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}
