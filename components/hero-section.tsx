"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    return () => {}
  }, [])

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Capa general de oscurecimiento */}
<div className="absolute inset-0 bg-black/40"></div>

{/* Capa con foco oscuro en el centro */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-transparent"></div>

      {/* Fondo animado extra */}
      <div className="absolute inset-0 overflow-visible">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`${isVisible ? "animate-text-reveal" : "opacity-0"}`}>
          <h1 className="text-5xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-balance">
            AGENCIA DE
            <br />
            <span className="text-[#B5CEA4]">PRODUCCIÓN</span>
            <br />
            INTEGRAL
          </h1>
        </div>

        <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty text-white">
            Hacemos realidad tu visión de principio a fin, conectamos el talento adecuado para dar vida a tus campañas.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <a href="#portfolio">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 hover-lift"
            >
              Conoce Nuestro Trabajo
            </Button>
          </a>
          <a href="#servicios">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 glass hover-lift hover:text-white"
            >
              Nuestros Servicios
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
