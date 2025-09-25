"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-text-reveal" : "opacity-0"}`}>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 text-balance">
            CREAMOS
            <br />
            <span className="text-[#B5CEA4]">EXPERIENCIAS</span>
            <br />
            AUDIOVISUALES
          </h1>
        </div>

        <div className={`transition-all duration-1000 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Somos una agencia especializada en producción audiovisual y modelos. Transformamos ideas en contenido visual
            impactante que conecta con tu audiencia.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
            <a href="#portfolio">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 hover-lift"
          >
            Ver Nuestro Trabajo
          </Button>
          </a>
          <a href="#servicios">
          <Button size="lg" variant="outline" className="text-lg px-8 py-4 glass hover-lift hover:text-white">
            Conoce Nuestros Servicios
          </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
