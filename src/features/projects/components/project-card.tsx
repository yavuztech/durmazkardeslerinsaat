import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/domain/entities/cms-content";
import {
  getProjectAnchorId,
  getProjectImageStyle,
  getProjectStatusLabel,
} from "@/features/projects/utils";

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

  return (
    <article
      className={featured ? "project-card project-featured" : "project-card"}
      id={anchorId}
    >
      <Link
        className="project-link"
        href={`/projeler#${anchorId}`}
        aria-label={`${project.title}, ${project.location} projesi`}
      >
        <div
          className="project-art project-photo"
          style={getProjectImageStyle(project.image)}
          role="img"
          aria-label={`${project.title} - ${project.location}`}
        >
          <span className="art-label">{project.category}</span>
          <span className="art-plus" aria-hidden="true">↗</span>
        </div>
        <div className="project-meta">
          <span>{project.location} / {getProjectStatusLabel(project.status)}</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
        <h3>{project.title}</h3>
        {showDescription && <p className="project-description">{project.description}</p>}
      </Link>
    </article>
  );
}
