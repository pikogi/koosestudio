"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    title: "Producción Audiovisual",
    icon: "🎬",
    features: ["Direccion creativa", "Video", "Fotografia", "Scouting y Locaciones","Renta de Equipos"],
  },
  {
    title: "Casting de Talentos",
    icon: "👥",
    features: ["Modelos", "Gestión de Talento", "Influencers", "Edecanes"],
  },
  {
    title: "Publicidad BTL",
   icon: "✨",
    features: ["Espectaculares", "Vallas", "Buses", "Pantallas"],
  },
  {
    title: "Estrategia Digital",
    icon: "📱",
    features: ["Redes Sociales", "Marketing Digital","Contenido Estratégico", "Pauta Publicitaria"],
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("servicios")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-16 ${isVisible ? "animate-text-reveal" : "opacity-0"}`}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Servicios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`glass hover-lift ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center ml-8">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}