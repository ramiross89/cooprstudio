import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo."),
  email: z.string().trim().email("Escribe un correo válido."),
  company: z.string().trim().optional(),
  service: z.string().trim().min(1, "Selecciona el servicio de interés."),
  message: z
    .string()
    .trim()
    .min(15, "Cuéntanos un poco más sobre tu proyecto."),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
