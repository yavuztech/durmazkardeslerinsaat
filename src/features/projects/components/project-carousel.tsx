"use client";

import Slider from "react-slick";
import type { Project } from "@/domain/entities/cms-content";
import { ProjectCard } from "@/features/projects/components/project-card";

const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 450,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 700, settings: { slidesToShow: 1, arrows: false, dots: true } },
    { breakpoint: 1000, settings: { slidesToShow: 2 } },
  ],
};

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  return (
    <Slider {...sliderSettings} className="project-slider">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          featured={index === 0}
        />
      ))}
    </Slider>
  );
}
