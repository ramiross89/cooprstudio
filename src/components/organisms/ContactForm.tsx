"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Input } from "@/components/atoms/Input";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Textarea } from "@/components/atoms/Textarea";
import { Field } from "@/components/molecules/Field";
import { leadSchema, type LeadFormValues } from "@/schemas/lead";

type SubmitState = "idle" | "success" | "error";
const formStartedAt = Date.now();

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [website, setWebsite] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "Diseño y desarrollo web desde cero",
      message: "",
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitState("idle");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        website,
        startedAt: formStartedAt,
      }),
    });

    if (!response.ok) {
      setSubmitState("error");
      return;
    }

    setSubmitState("success");
    reset();
    setWebsite("");
  };

  return (
    <section id="contacto" className="bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Contacto"
              title="Cuéntanos qué quieres construir."
              description="Respondemos con una primera lectura del proyecto, alcance sugerido y siguientes pasos para llevarlo a producción."
              tone="dark"
            />
            <div className="mt-8 rounded-[8px] border border-white/12 bg-white/7 p-5 text-sm leading-7 text-white/76">
              Ideal para marcas que necesitan una web nueva, una landing de
              campaña o una base técnica más robusta para crecer.
            </div>
          </div>

          <form
            className="rounded-[8px] bg-background p-5 text-foreground shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:p-8"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div
              className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="website">Sitio web</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" error={errors.name?.message}>
                <Input
                  placeholder="Tu nombre"
                  autoComplete="name"
                  hasError={Boolean(errors.name)}
                  {...register("name")}
                />
              </Field>
              <Field label="Correo" error={errors.email?.message}>
                <Input
                  type="email"
                  placeholder="tu@empresa.com"
                  autoComplete="email"
                  hasError={Boolean(errors.email)}
                  {...register("email")}
                />
              </Field>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Empresa ó Negocio">
                <Input
                  placeholder="Nombre de empresa"
                  autoComplete="organization"
                  {...register("company")}
                />
              </Field>
              <Field label="Servicio" error={errors.service?.message}>
                <select
                  className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm text-foreground outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
                  {...register("service")}
                >
                  <option>Diseño y desarrollo web desde cero</option>
                  <option>Lanzamiento web y SEO</option>
                  <option>Seguimiento, soporte y mantenimiento</option>
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Mensaje" error={errors.message?.message}>
                <Textarea
                  placeholder="Cuéntanos sobre el proyecto, fechas, objetivos y cualquier referencia importante."
                  hasError={Boolean(errors.message)}
                  {...register("message")}
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" aria-hidden="true" size={18} />
                ) : (
                  <Send aria-hidden="true" size={18} />
                )}
                Enviar proyecto
              </Button>

              {submitState === "success" ? (
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  <CheckCircle2 aria-hidden="true" size={18} />
                  Recibido. Te contactaremos pronto.
                </p>
              ) : null}
              {submitState === "error" ? (
                <p className="text-sm font-semibold text-red-600">
                  No pudimos enviar el formulario. Intenta de nuevo.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
