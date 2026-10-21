import type { Project } from "@/domain/entities/cms-content";
import { getProjectAnchorId, getProjectStatusLabel } from "@/features/projects/utils";
import { ProjectImageGallery } from "@/features/projects/components/project-image-gallery";

export function ProjectCard({
  project,
  featured = false,
  showDescription = false,
}: {
  project: Project;
  featured?: boolean;
  showDescription?: boolean;
}) {
  const anchorId = getProjectAnchorId(project.id);
  const images = project.images?.length ? project.images : [project.image];

  return (
    <article
      className={featured ? "project-card project-featured" : "project-card"}
      id={anchorId}
    >
      <ProjectImageGallery
        title={project.title}
        location={project.location}
        category={project.category}
        images={images}
      />
      <div className="project-meta">
        <span>{project.location} / {getProjectStatusLabel(project.status)}</span>
      </div>
      <h3>{project.title}</h3>
      {showDescription && <p className="project-description">{project.description}</p>}
    </article>
  );
}
