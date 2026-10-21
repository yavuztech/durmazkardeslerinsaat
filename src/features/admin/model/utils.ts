import type { Inquiry } from "@/domain/entities/cms-content";

export function getAdminActionError(error: unknown, fallback: string) {
  if (typeof error === "string" && error.trim()) return error;
  if (error && typeof error === "object" && "response" in error) {
    const response = error.response;
    if (response && typeof response === "object" && "data" in response) {
      const data = response.data;
      if (data && typeof data === "object" && "error" in data &&
        typeof data.error === "string") return data.error;
    }
  }
  return error instanceof Error ? error.message : fallback;
}

export function getInquiryWeekSeries(inquiries: Inquiry[], now = new Date()) {
  const labels: string[] = [];
  const values: number[] = [];
  for (let day = 6; day >= 0; day--) {
    const date = new Date(now);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - day);
    labels.push(new Intl.DateTimeFormat("tr-TR", { weekday: "short" }).format(date));
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    values.push(inquiries.filter((inquiry) => {
      const createdAt = new Date(inquiry.createdAt);
      return createdAt >= date && createdAt < nextDay;
    }).length);
  }
  return { labels, values };
}
