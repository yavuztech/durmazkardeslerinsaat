type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
  lastSeenAt: number;
};

type JsonBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; reason: "too-large" | "invalid" };

const rateLimitEntries = new Map<string, RateLimitEntry>();
let rateLimitChecks = 0;
const maxRateLimitEntries = 10_000;

function getClientKey(request: Request) {
  const clientAddress = request.headers.get("x-real-ip")?.trim();
  return clientAddress ? `${request.url.split("/api/")[0]}:${clientAddress}` : "unknown";
}

export function isRateLimited(
  request: Request,
  scope: string,
  maxRequests: number,
  windowMs: number,
) {
  const now = Date.now();
  const key = `${scope}:${getClientKey(request)}`;
  const entry = rateLimitEntries.get(key);

  rateLimitChecks += 1;
  if (rateLimitChecks % 256 === 0) {
    rateLimitEntries.forEach((candidate, entryKey) => {
      if (now - candidate.lastSeenAt >= windowMs * 2) {
        rateLimitEntries.delete(entryKey);
      }
    });
  }

  if (entry && now - entry.windowStartedAt < windowMs) {
    entry.lastSeenAt = now;
    entry.count += 1;
    return entry.count > maxRequests;
  }

  if (!entry && rateLimitEntries.size >= maxRateLimitEntries) {
    const oldestKey = rateLimitEntries.keys().next().value;
    if (oldestKey) rateLimitEntries.delete(oldestKey);
  }

  rateLimitEntries.set(key, { count: 1, windowStartedAt: now, lastSeenAt: now });
  return false;
}

export function clearRateLimit(request: Request, scope: string) {
  rateLimitEntries.delete(`${scope}:${getClientKey(request)}`);
}

export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<JsonBodyResult> {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const declaredLength = Number(contentLength);
    if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
      return { ok: false, reason: "too-large" };
    }
  }

  if (!request.body) return { ok: false, reason: "invalid" };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false, reason: "too-large" };
      }
      chunks.push(value);
    }

    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(body);
    return { ok: true, value: JSON.parse(decoded) as unknown };
  } catch {
    return { ok: false, reason: "invalid" };
  } finally {
    reader.releaseLock();
  }
}
