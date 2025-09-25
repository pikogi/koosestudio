"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
        <div className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold gradient-text">
             KOOS ESTUDIO
            </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#servicios" className="text-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </div>

          <a href="https://wa.me/5215515811884?text=Hola!%20trabajemos%20juntos💪" target="_blank" rel="noopener noreferrer">
         <Button className="bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow">
        Trabajemos Juntos
        </Button>
        </a>

        </div>
      </div>
    </nav>
  )
}
