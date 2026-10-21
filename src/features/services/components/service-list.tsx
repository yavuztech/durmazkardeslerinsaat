import type { Service } from "@/domain/entities/cms-content";
import { Actions, Badge, Empty, Icon, Item, Panel } from "@/features/services/styles/service-list.styles";

export function ServiceList({
  services,
  onEdit,
  onDelete,
}: {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Panel>
      <header><h2>Hizmet kataloğu</h2><span>{services.length} kayıt</span></header>
      {services.length ? services.map((service) => (
        <Item key={service.id}>
          <Icon>{service.icon}</Icon>
          <div><strong>{service.title}</strong><small>{service.description}</small></div>
          <span><Badge $active={service.active}>{service.active ? "Yayında" : "Gizli"}</Badge></span>
          <Actions>
            <button type="button" aria-label={`${service.title} düzenle`} onClick={() => onEdit(service)}>✎</button>
            <button type="button" aria-label={`${service.title} sil`} onClick={() => onDelete(service.id)}>×</button>
          </Actions>
        </Item>
      )) : <Empty>Henüz hizmet eklenmemiş. Yeni hizmet ekleyerek kataloğunuzu oluşturun.</Empty>}
    </Panel>
  );
}
