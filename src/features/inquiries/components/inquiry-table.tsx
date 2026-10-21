"use client";

import type { Inquiry } from "@/domain/entities/cms-content";
import { Badge, Empty, Table, TableWrap } from "@/features/inquiries/styles/inquiry-table.styles";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function InquiryTable({
  inquiries,
  onUpdate,
  onDelete,
}: {
  inquiries: Inquiry[];
  onUpdate: (inquiry: Inquiry, status: Inquiry["status"]) => void;
  onDelete: (inquiry: Inquiry) => void;
}) {
  if (!inquiries.length) {
    return <Empty>Henüz teklif talebi yok. İletişim formundan gelen talepler burada görünür.</Empty>;
  }
  const labels: Record<Inquiry["status"], string> = {
    new: "Yeni",
    contacted: "İletişime geçildi",
    completed: "Tamamlandı",
  };
  return (
    <TableWrap>
      <Table>
        <thead><tr><th>Müşteri</th><th>Hizmet</th><th>Telefon</th><th>Tarih</th><th>Durum</th><th>Güncelle</th></tr></thead>
        <tbody>{inquiries.map((inquiry) => (
          <tr key={inquiry.id}>
            <td><strong>{inquiry.name}</strong>{inquiry.details && <div style={{ maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis", marginTop: 4 }}>{inquiry.details}</div>}</td>
            <td>{inquiry.service}</td>
            <td><a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a></td>
            <td>{formatDate(inquiry.createdAt)}</td>
            <td><Badge $tone={inquiry.status === "new" ? "amber" : inquiry.status === "completed" ? "green" : "gray"}>{labels[inquiry.status]}</Badge></td>
            <td><div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <select aria-label={`${inquiry.name} talep durumu`} value={inquiry.status} onChange={(event) => onUpdate(inquiry, event.target.value as Inquiry["status"])} style={{ border: "1px solid #e2e5df", padding: "7px", fontSize: 10, background: "#fff" }}>
                <option value="new">Yeni</option><option value="contacted">İletişime geçildi</option><option value="completed">Tamamlandı</option>
              </select>
              <button type="button" aria-label={`${inquiry.name} talebini sil`} onClick={() => onDelete(inquiry)} style={{ border: "1px solid #e2e5df", background: "#fff", padding: "6px 8px", cursor: "pointer" }}>×</button>
            </div></td>
          </tr>
        ))}</tbody>
      </Table>
    </TableWrap>
  );
}
