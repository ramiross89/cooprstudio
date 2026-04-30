import type { LeadFormValues } from "@/schemas/lead";

type SendLeadEmailResult =
  | { ok: true; emailId: string }
  | { ok: false; message: string };

const defaultRecipient = "cooprstudio@gmail.com";
const defaultSender = "CooprStudio <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function leadEmailHtml(lead: LeadFormValues) {
  const company = lead.company?.trim() ? escapeHtml(lead.company) : "No indicado";

  return `
    <div style="font-family: Arial, sans-serif; background: #f7f8f4; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #d9dfd7; border-radius: 8px; overflow: hidden;">
        <div style="background: #1f7a68; color: #ffffff; padding: 24px;">
          <p style="margin: 0 0 8px; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;">Nuevo lead</p>
          <h1 style="margin: 0; font-size: 26px;">Contacto desde CooprStudio</h1>
        </div>
        <div style="padding: 24px; color: #111315;">
          <p><strong>Nombre:</strong> ${escapeHtml(lead.name)}</p>
          <p><strong>Correo:</strong> ${escapeHtml(lead.email)}</p>
          <p><strong>Empresa:</strong> ${company}</p>
          <p><strong>Servicio:</strong> ${escapeHtml(lead.service)}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-line; line-height: 1.6;">${escapeHtml(lead.message)}</p>
        </div>
      </div>
    </div>
  `;
}

export async function sendLeadEmail(
  lead: LeadFormValues,
): Promise<SendLeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL_TO ?? defaultRecipient;
  const from = process.env.LEADS_EMAIL_FROM ?? defaultSender;

  if (!apiKey) {
    return {
      ok: false,
      message: "Falta configurar RESEND_API_KEY para enviar correos.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `Nuevo lead de CooprStudio: ${lead.name}`,
      html: leadEmailHtml(lead),
    }),
  });

  const data = (await response.json().catch(() => null)) as
    | { id?: string; message?: string; error?: string }
    | null;

  if (!response.ok) {
    return {
      ok: false,
      message:
        data?.message ??
        data?.error ??
        "No se pudo enviar el correo del lead.",
    };
  }

  return {
    ok: true,
    emailId: data?.id ?? "sent",
  };
}
