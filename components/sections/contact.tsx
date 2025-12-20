"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { siteConfig } from "@/lib/site-data"

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactSection() {
  const { ref, isInView } = useScrollAnimation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const subject = `[Les Caducées] ${formData.subject}`.trim()
    const body = [
      `Prénom: ${formData.firstName}`,
      `Nom: ${formData.lastName}`,
      `Email: ${formData.email}`,
      "",
      formData.message,
    ].join("\n")

    const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">Contact</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Rejoignez-nous
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed text-pretty">
            Intéressé(e) par notre association ? Contactez-nous pour en savoir plus sur nos activités et comment devenir
            membre.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div
              className="text-center py-12 px-6 bg-card border border-border rounded-lg"
              role="status"
              aria-live="polite"
            >
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-gold" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">Presque fini</h3>
              <p className="text-muted-foreground">
                Votre client email va s’ouvrir avec un message pré-rempli. Si rien ne se passe, écrivez-nous à{" "}
                <a className="text-gold hover:underline" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className={cn("bg-card border-border focus:border-gold", errors.firstName && "border-destructive")}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    className={cn("bg-card border-border focus:border-gold", errors.lastName && "border-destructive")}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn("bg-card border-border focus:border-gold", errors.email && "border-destructive")}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Objet de votre message"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={cn("bg-card border-border focus:border-gold", errors.subject && "border-destructive")}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Votre message..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(
                    "bg-card border-border focus:border-gold resize-none",
                    errors.message && "border-destructive",
                  )}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                Envoyer par email
                <Send className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
