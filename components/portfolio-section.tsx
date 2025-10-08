"use client"

import { useEffect, useState, useRef } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import Player from "@vimeo/player"

const portfolioItems = [
  { title: "Chavas", category: "Comercial", type: "image", src: "/havoc.jpg" },
  { title: "Havoc", category: "Corporativo", type: "image", src: "/havoc.jpg" },
  { title: "Avante", category: "Musical", type: "image", src: "beli.JPG" },
  { title: "SHEIN", category: "Digital", type: "image", src: "btl.jpg" },
  { title: "Hollander", category: "Eventos", type: "image", src: "/hollander.jpg" },
  { title: "Modelos", category: "Casting", type: "video", src: "/video.mp4" },
  { title: "Hollander", category: "Eventos", type: "image", src: "/hollander.jpg" },
  { title: "Hollander", category: "Eventos", type: "image", src: "/hollander.jpg" },
]

type PortfolioItem = typeof portfolioItems[number]

function PortfolioItemMedia({ item, index, isVisible }: { item: PortfolioItem; index: number; isVisible: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const vimeoRef = useRef<HTMLIFrameElement | null>(null)
  const isMobile = useIsMobile()
  const vimeoPlayerRef = useRef<any>(null)
  const [isVimeoPlaying, setIsVimeoPlaying] = useState(false)

  // Autoplay con scroll (móvil y desktop)
  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      let isPlaying = false
      const video = videoRef.current

      const handleIntersect: IntersectionObserverCallback = ([entry]) => {
        if (!video) return

        if (entry.isIntersecting && !isPlaying) {
          isPlaying = true
          video.play().catch(() => { isPlaying = false })
        } else if (!entry.isIntersecting && isPlaying) {
          isPlaying = false
          video.pause()
          video.currentTime = 0
        }
      }

      const observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 })
      observer.observe(video)
      return () => observer.disconnect()
    }

    if (item.type === "vimeo" && vimeoRef.current) {
      vimeoPlayerRef.current = new Player(vimeoRef.current)
      vimeoPlayerRef.current.on("pause", () => {
        vimeoPlayerRef.current.setCurrentTime(0).catch(() => {})
        setIsVimeoPlaying(false)
      })
    }
  }, [item.type])

  // Hover en desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      if (item.type === "video" && videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {})
      }
      if (item.type === "vimeo" && vimeoPlayerRef.current && !isVimeoPlaying) {
        vimeoPlayerRef.current.play().then(() => setIsVimeoPlaying(true)).catch(() => {})
      }
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      if (item.type === "video" && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      if (item.type === "vimeo" && vimeoPlayerRef.current && isVimeoPlaying) {
        vimeoPlayerRef.current.pause().catch(() => {})
      }
    }
  }

  return (
    <div
      className={`relative overflow-hidden transition-transform duration-500 hover:scale-[1.03] ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.type === "video" && (
        <video
          ref={videoRef}
          muted
          loop
          autoPlay={false}
          preload="metadata"
          playsInline
          className="w-full h-full object-cover aspect-square"
        >
          <source src={item.src} type="video/mp4" />
        </video>
      )}

      {item.type === "vimeo" && (
        <iframe
          ref={vimeoRef}
          src={`${item.src}&title=0&byline=0&portrait=0&controls=0&muted=1`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="object-cover w-full h-full aspect-square"
          title={item.title}
        />
      )}

      {item.type === "image" && (
        <img src={item.src} alt={item.title} className="w-full h-full object-cover aspect-square" />
      )}

      {/* Título */}
      <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm md:text-base p-1 md:p-2 text-center">
        {item.title}
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const categories = ["Todos", "Comercial", "Corporativo", "Musical", "Digital", "Eventos", "Casting"]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    const section = document.getElementById("portfolio")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const filteredItems =
    selectedCategory === "Todos"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" className="py-8 md:py-12 bg-black">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Portfolio</h2>
          <p className="text-white text-sm md:text-base max-w-xl mx-auto">
            Galería de trabajos y producciones audiovisuales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2 md:gap-3">
          {filteredItems.map((item, index) => (
            <PortfolioItemMedia key={index} item={item} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
