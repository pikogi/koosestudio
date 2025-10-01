"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

const portfolioItems = [
  {
    title: "Campaña Comercial - Chavas",
    category: "Comercial",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1QNeKBVczdZtc8mWdNMLG37-Re1mUtk6G",
    description: "Producción completa para campaña de moda con modelos profesionales",
  },
  {
    title: "Producción - Havoc",
    category: "Corporativo",
    type: "image",
    src: "/havoc.jpg",
    description: "Documental sobre la historia y valores de empresa líder en tecnología",
  },
  {
    title: "Producción Audiovisual - Avante",
    category: "Musical",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1QNeKBVczdZtc8mWdNMLG37-Re1mUtk6G",
    description: "Producción audiovisual para artista emergente con efectos visuales",
  },
  {
    title: "Campaña Comercial - Clases",
    category: "Digital",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1QNeKBVczdZtc8mWdNMLG37-Re1mUtk6G",
    description: "Serie de videos para campaña digital de marca de lifestyle",
  },
  {
    title: "Ecommerce - Hollander",
    category: "Eventos",
    type: "image",
    src: "/hollander.jpg",
    description: "Cobertura completa de evento empresarial con múltiples cámaras",
  },
  {
    title: "Casting de Modelos - Modelos",
    category: "Casting",
    type: "video",
    src: "/video.mp4",
    description: "Sesión de casting para campaña internacional de belleza",
  },
]

type PortfolioItem = typeof portfolioItems[number]

function PortfolioItemCard({ item, index, isVisible }: { item: PortfolioItem; index: number; isVisible: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (item.type !== "video") return
    const video = videoRef.current
    if (!video) return
    if (!isMobile) return

    let isPlaying = false

    const handleIntersect: IntersectionObserverCallback = ([entry]) => {
      if (entry.isIntersecting && !isPlaying) {
        isPlaying = true
        video.play().catch(() => {
          isPlaying = false
        })
      } else if (!entry.isIntersecting && isPlaying) {
        isPlaying = false
        video.pause()
        video.currentTime = 0
      }
    }

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 })
    observer.observe(video)

    return () => observer.disconnect()
  }, [isMobile])

  return (
    <Card
      className={`glass hover-lift overflow-hidden transition-all duration-1000 ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="relative overflow-hidden"
        onMouseEnter={item.type === "video" ? () => {
          const video = videoRef.current
          if (video && video.paused) {
            video.play().catch(() => {})
          }
        } : undefined}
        onMouseLeave={item.type === "video" ? () => {
          const video = videoRef.current
          if (video && !video.paused) {
            video.pause()
            video.currentTime = 0
          }
        } : undefined}
      >
        {item.type === "video" ? (
          <video
            ref={videoRef}
            muted
            loop
            autoPlay={false}
            preload="metadata"
            playsInline
            className="w-full h-64 object-cover"
          >
            <source src={item.src} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        ) : (
          <img src={item.src} alt={item.title} className="w-full h-64 object-cover" />
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
      </CardContent>
    </Card>
  )
}

export function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const categories = ["Todos", "Comercial", "Corporativo", "Musical", "Digital", "Eventos", "Casting"]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById("portfolio")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const filteredItems =
    selectedCategory === "Todos"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-text-reveal" : "opacity-0"
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Portfolio</h2>
        </div>

        {/* Category filters */}
        <div
          className={`hidden flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="glass hover-lift"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioItemCard key={index} item={item} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
