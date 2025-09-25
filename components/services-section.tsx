"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    title: "Producción Audiovisual",
    description:
      "Videos corporativos, comerciales, documentales y contenido para redes sociales con la más alta calidad.",
    icon: "🎬",
    features: ["Videos Corporativos", "Comerciales", "Documentales", "Contenido Social"],
  },
  {
    title: "Casting de Modelos",
    description: "Selección y gestión de modelos profesionales para campañas publicitarias y eventos.",
    icon: "👥",
    features: ["Casting Profesional", "Gestión de Talento", "Campañas Publicitarias", "Eventos"],
  },
  {
    title: "Post-Producción",
    description: "Edición, efectos visuales, corrección de color y sonorización para resultados impecables.",
    icon: "✨",
    features: ["Edición Avanzada", "Efectos Visuales", "Corrección de Color", "Audio Profesional"],
  },
  {
    title: "Estrategia Digital",
    description: "Desarrollo de contenido estratégico para maximizar el impacto en plataformas digitales.",
    icon: "📱",
    features: ["Contenido Estratégico", "Redes Sociales", "Marketing Digital", "Análisis de Métricas"],
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
          className={'<div className="opacity-0 animate-fade-in-up [animation-fill-mode:forwards]'}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Nuestros Servicios</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ofrecemos soluciones integrales para todas tus necesidades audiovisuales y de casting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`glass hover-lift transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center justify-center">
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
