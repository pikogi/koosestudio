"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from "@emailjs/browser"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [sending, setSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  
  // ✅ USAR ESTADO EN VEZ DE REFS
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Producción Audiovisual",
    message: ""
  })

  // ✅ INICIALIZAR EMAILJS
  useEffect(() => {
    emailjs.init("GCfCK9LTsdv50vcQB")
    console.log("✅ EmailJS inicializado")
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById("contacto")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setSuccessMessage("")

    console.log("📤 Intentando enviar email...")
    console.log("📋 Datos del formulario:", formData)

    const templateParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      project_type: formData.projectType,
      message: formData.message,
    }

    try {
      const response = await emailjs.send(
        "service_9oqlbeu",
        "template_zfoi9cs",
        templateParams
      )
      
      console.log("✅ Email enviado:", response)
      setSending(false)
      setSuccessMessage("¡Tu mensaje fue enviado con éxito!")
      
      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "Producción Audiovisual",
        message: ""
      })

      setTimeout(() => setSuccessMessage(""), 5000)
      
    } catch (error) {
      console.error("❌ Error al enviar:", error)
      setSending(false)
      setSuccessMessage(`Error: ${error instanceof Error ? error.message : "Intenta nuevamente"}`)
      setTimeout(() => setSuccessMessage(""), 5000)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "animate-text-reveal" : "opacity-0"}`}>
          <h2 className="text-5xl font-bold mb-6 gradient-text">Trabajemos Juntos</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            ¿Tienes un proyecto en mente? Contáctanos y hagamos realidad tu visión audiovisual
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className={`glass hover-lift transition-all duration-1000 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Envíanos un mensaje</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Nombre</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre" 
                      className="glass" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com" 
                      className="glass" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Empresa</label>
                  <Input 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa" 
                    className="glass" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Tipo de proyecto</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg glass bg-background text-foreground border border-border"
                  >
                    <option>Producción Audiovisual</option>
                    <option>Casting de Modelos</option>
                    <option>Post-Producción</option>
                    <option>Estrategia Digital</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Mensaje</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu proyecto..." 
                    rows={4} 
                    className="glass" 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-lift" 
                  disabled={sending}
                >
                  {sending ? "Enviando..." : "Enviar Mensaje"}
                </Button>
                {successMessage && (
                  <p className={`mt-4 text-center font-medium ${successMessage.includes("Error") || successMessage.includes("error") ? "text-red-500" : "text-green-500"}`}>
                    {successMessage}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <Card className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Teléfono</h4>
                    <p className="text-muted-foreground">+ 52 1 55 1581 1884</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">Koos@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Ubicación</h4>
                    <p className="text-muted-foreground">Ciudad de México, México</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}