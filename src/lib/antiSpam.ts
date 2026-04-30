type SpamCheckResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;
const minimumCompletionMs = 2500;
const maximumCompletionMs = 60 * 60 * 1000;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return realIp ?? "unknown";
}

function asRecord(payload: unknown): Record<string, unknown> {
  return payload && typeof payload === "object"
    ? (payload as Record<string, unknown>)
    : {};
}

export function checkLeadAntiSpam(
  request: Request,
  payload: unknown,
): SpamCheckResult {
  const body = asRecord(payload);
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  if (honeypot.length > 0) {
    return {
      ok: false,
      status: 400,
      message: "Solicitud bloqueada por protección anti-spam.",
    };
  }

  const startedAt =
    typeof body.startedAt === "number"
      ? body.startedAt
      : Number.parseInt(String(body.startedAt ?? ""), 10);
  const elapsedMs = Date.now() - startedAt;

  if (
    !Number.isFinite(startedAt) ||
    elapsedMs < minimumCompletionMs ||
    elapsedMs > maximumCompletionMs
  ) {
    return {
      ok: false,
      status: 400,
      message: "Solicitud bloqueada por validación anti-spam.",
    };
  }

  const now = Date.now();
  const ip = getClientIp(request);
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });

    return { ok: true };
  }

  existing.count += 1;

  if (existing.count > maxRequestsPerWindow) {
    return {
      ok: false,
      status: 429,
      message: "Demasiados intentos. Intenta de nuevo en unos minutos.",
    };
  }

  return { ok: true };
}
