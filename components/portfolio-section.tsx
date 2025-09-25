"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const portfolioItems = [
  {
    title: "Campaña Publicitaria - Marca de Moda",
    category: "Comercial",
    image: "/fashion-commercial-video-production-behind-the-sce.jpg",
    description: "Producción completa para campaña de moda con modelos profesionales",
  },
  {
    title: "Documental Corporativo",
    category: "Corporativo",
    image: "/corporate-documentary-filming-professional-setup.jpg",
    description: "Documental sobre la historia y valores de empresa líder en tecnología",
  },
  {
    title: "Video Musical",
    category: "Musical",
    image: "/music-video-production-colorful-lighting-setup.jpg",
    description: "Producción audiovisual para artista emergente con efectos visuales",
  },
  {
    title: "Contenido para Redes Sociales",
    category: "Digital",
    image: "/social-media-content-creation-studio-setup.jpg",
    description: "Serie de videos para campaña digital de marca de lifestyle",
  },
  {
    title: "Evento Corporativo",
    category: "Eventos",
    image: "/corporate-event-filming-professional-cameras.jpg",
    description: "Cobertura completa de evento empresarial con múltiples cámaras",
  },
  {
    title: "Casting de Modelos",
    category: "Casting",
    image: "/professional-model-casting-session-studio.jpg",
    description: "Sesión de casting para campaña internacional de belleza",
  },
]

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
      { threshold: 0.1 },
    )

    const section = document.getElementById("portfolio")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const filteredItems =
    selectedCategory === "Todos" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "animate-text-reveal" : "opacity-0"}`}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Nuestro Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explora algunos de nuestros trabajos más destacados en producción audiovisual y casting
          </p>
        </div>

        {/* Category filters */}
        <div
          className={`hidden flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
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
            <Card
              key={index}
              className={`glass hover-lift overflow-hidden transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-pretty">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
