import type { Project } from "@/domain/entities/cms-content";
import { ProjectCard } from "@/features/projects/components/project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="detail-empty">Gösterilecek proje bulunmuyor.</p>;
  }

  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          featured={index === 0}
          showDescription
        />
      ))}
    </div>
  );
}
