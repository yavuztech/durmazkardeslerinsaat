import type { Project } from "@/domain/entities/cms-content";
import { Actions, Badge, Empty, Item, List, Panel } from "@/features/projects/styles/project-list.styles";

export function ProjectList({
  projects,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Panel>
      <header><h2>Proje portföyü</h2><span>{projects.length} kayıt</span></header>
      <List>
        {projects.length ? projects.map((project) => (
          <Item key={project.id}>
            <img src={project.image} alt="" />
            <div><strong>{project.title}</strong><small>{project.category} · {project.location}</small></div>
            <span><Badge $tone={project.status === "completed" ? "green" : "amber"}>{project.status === "completed" ? "Tamamlandı" : "Devam ediyor"}</Badge></span>
            <Actions>
              <button type="button" aria-label={`${project.title} düzenle`} onClick={() => onEdit(project)}>✎</button>
              <button type="button" aria-label={`${project.title} sil`} onClick={() => onDelete(project.id)}>×</button>
            </Actions>
          </Item>
        )) : <Empty>Henüz proje eklenmemiş. Yeni proje ekleyerek portföyünüzü oluşturun.</Empty>}
      </List>
    </Panel>
  );
}
