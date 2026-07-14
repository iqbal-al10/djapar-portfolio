'use client'

import { useEffect, useState } from 'react'
import LoadingScreen from './components/ui/LoadingScreen'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Services from './components/sections/Services'
import PerformanceStyle from './components/sections/PerformanceStyle'
import GalleryNew from './components/sections/GalleryNew'
// import Gallery from './components/sections/Gallery'
import Videos from './components/sections/Videos'
import Music from './components/sections/Music'
import Testimonials from './components/sections/Testimonials'
import Booking from './components/sections/Booking'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let isMounted = true
    
    // Initialize Lenis smooth scroll
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        
        if (isMounted) {
          setMounted(true)
        }
      } catch {
        if (isMounted) {
          setMounted(true)
        }
      }
    }

    initLenis()
    
    return () => {
      isMounted = false
    }
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Services />
        <PerformanceStyle />
        {/* <Gallery /> */}
        <GalleryNew />
        <Videos />
        <Music />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
