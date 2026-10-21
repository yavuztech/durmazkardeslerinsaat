"use client";

import type { Inquiry } from "@/domain/entities/cms-content";
import {
  Actions,
  Badge,
  CustomerDetails,
  DeleteButton,
  Empty,
  StatusSelect,
  Table,
  TableWrap,
} from "@/features/inquiries/styles/inquiry-table.styles";

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
            <td data-label="Müşteri"><strong>{inquiry.name}</strong>{inquiry.details && <CustomerDetails>{inquiry.details}</CustomerDetails>}</td>
            <td data-label="Hizmet">{inquiry.service}</td>
            <td data-label="Telefon"><a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a></td>
            <td data-label="Tarih">{formatDate(inquiry.createdAt)}</td>
            <td data-label="Durum"><Badge $tone={inquiry.status === "new" ? "amber" : inquiry.status === "completed" ? "green" : "gray"}>{labels[inquiry.status]}</Badge></td>
            <td data-label="İşlemler"><Actions>
              <StatusSelect aria-label={`${inquiry.name} talep durumu`} value={inquiry.status} onChange={(event) => onUpdate(inquiry, event.target.value as Inquiry["status"])}>
                <option value="new">Yeni</option><option value="contacted">İletişime geçildi</option><option value="completed">Tamamlandı</option>
              </StatusSelect>
              <DeleteButton type="button" aria-label={`${inquiry.name} talebini sil`} onClick={() => onDelete(inquiry)}>Sil</DeleteButton>
            </Actions></td>
          </tr>
        ))}</tbody>
      </Table>
    </TableWrap>
  );
}
