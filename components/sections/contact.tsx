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
import type { Dictionary } from "@/lib/i18n/get-dictionary"

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface ContactSectionProps {
  email: string
  dictionary: Dictionary
}

export function ContactSection({ email, dictionary }: ContactSectionProps) {
  const { ref, isInView } = useScrollAnimation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const t = dictionary.contact

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t.form.nameRequired
    }

    if (!formData.email.trim()) {
      newErrors.email = t.form.emailRequired
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = t.form.emailInvalid
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.form.subjectRequired
    }

    if (!formData.message.trim()) {
      newErrors.message = t.form.messageRequired
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
      `${t.form.name}: ${formData.name}`,
      `${t.form.email}: ${formData.email}`,
      "",
      formData.message,
    ].join("\n")

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">{t.eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance caducees-underline">
            {t.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed text-pretty">
            {t.description}
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
              <h3 className="text-2xl font-semibold text-foreground mb-3">{t.form.successTitle}</h3>
              <p className="text-muted-foreground">
                {t.form.success} {t.form.fallbackMessage}{" "}
                <a className="text-gold hover:underline" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">{t.form.name}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t.form.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn("bg-card border-border focus:border-gold", errors.name && "border-destructive")}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.form.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.form.emailPlaceholder}
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
                <Label htmlFor="subject">{t.form.subject}</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t.form.subjectPlaceholder}
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
                <Label htmlFor="message">{t.form.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t.form.messagePlaceholder}
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
                {t.form.submit}
                <Send className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
