import { NextResponse } from "next/server";
import { checkLeadAntiSpam } from "@/lib/antiSpam";
import { sendLeadEmail } from "@/lib/email";
import { leadSchema } from "@/schemas/lead";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const spamCheck = checkLeadAntiSpam(request, payload);

  if (!spamCheck.ok) {
    return NextResponse.json(
      {
        message: spamCheck.message,
      },
      { status: spamCheck.status },
    );
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Los datos enviados no son válidos.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const emailResult = await sendLeadEmail(parsed.data);

  if (!emailResult.ok) {
    return NextResponse.json(
      {
        message: "No se pudo enviar el lead por correo.",
        detail: emailResult.message,
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      message: "Lead enviado correctamente.",
      leadId: crypto.randomUUID(),
      emailId: emailResult.emailId,
    },
    { status: 201 },
  );
}
