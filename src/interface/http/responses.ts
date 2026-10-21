export function jsonResponse(
  body: unknown,
  status = 200,
  headers?: HeadersInit,
) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  responseHeaders.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}

export function errorResponse(message: string, status: number) {
  return jsonResponse({ error: message }, status);
}
