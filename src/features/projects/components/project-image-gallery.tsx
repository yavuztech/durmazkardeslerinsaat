"use client";

import { useEffect, useRef, useState } from "react";
import { getProjectImageStyle } from "@/features/projects/utils";

export function ProjectImageGallery({
  title,
  location,
  category,
  images,
}: {
  title: string;
  location: string;
  category: string;
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isLightboxOpen && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!isLightboxOpen && dialog.open) {
      dialog.close();
    }
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen || images.length < 2) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % images.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + images.length) % images.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, isLightboxOpen]);

  function closeLightbox() {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    } else {
      setIsLightboxOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div
      className="project-art project-photo project-gallery"
      style={getProjectImageStyle(images[activeIndex])}
      role="group"
      aria-label={`${title} proje fotoğrafları`}
    >
      <button
        ref={triggerRef}
        type="button"
        className="project-gallery-trigger"
        aria-label={`${title}, ${activeIndex + 1}. fotoğrafı büyüt`}
        onClick={() => setIsLightboxOpen(true)}
      />
      <span className="art-label">{category}</span>
      {images.length > 1 && (
        <div className="project-gallery-controls">
          <button
            type="button"
            aria-label="Önceki proje fotoğrafı"
            onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)}
          >
            ‹
          </button>
          <span aria-live="polite">{activeIndex + 1} / {images.length}</span>
          <button
            type="button"
            aria-label="Sonraki proje fotoğrafı"
            onClick={() => setActiveIndex((index) => (index + 1) % images.length)}
          >
            ›
          </button>
        </div>
      )}
      {isLightboxOpen && (
        <dialog
          ref={dialogRef}
          className="project-lightbox"
          aria-label={`${title} fotoğraf galerisi`}
          onClose={() => {
            setIsLightboxOpen(false);
            triggerRef.current?.focus();
          }}
          onClick={(event) => {
            if (event.target === dialogRef.current) closeLightbox();
          }}
        >
          <div className="project-lightbox-toolbar">
            <span>{title} · {location}</span>
            {images.length > 1 && <span aria-live="polite">{activeIndex + 1} / {images.length}</span>}
            <button ref={closeButtonRef} type="button" aria-label="Galeriyi kapat" onClick={closeLightbox}>×</button>
          </div>
          <img
            className="project-lightbox-image"
            src={images[activeIndex]}
            alt={`${title} - ${location}, fotoğraf ${activeIndex + 1}`}
          />
          {images.length > 1 && (
            <div className="project-lightbox-controls">
              <button
                type="button"
                aria-label="Önceki proje fotoğrafı"
                onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Sonraki proje fotoğrafı"
                onClick={() => setActiveIndex((index) => (index + 1) % images.length)}
              >
                ›
              </button>
            </div>
          )}
        </dialog>
      )}
    </div>
  );
}
