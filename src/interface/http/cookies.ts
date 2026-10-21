export function getCookieValue(
  cookieHeader: string | null,
  cookieName: string,
): string | undefined {
  const cookie = cookieHeader
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${cookieName}=`));
  return cookie?.slice(cookieName.length + 1);
}
