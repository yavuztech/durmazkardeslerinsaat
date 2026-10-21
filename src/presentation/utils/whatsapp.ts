export function getWhatsAppUrl(message: string, phone: string) {
  const number = phone.replace(/\D/g, "");
  if (!number) return undefined;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
