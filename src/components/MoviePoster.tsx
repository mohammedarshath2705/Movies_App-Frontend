// components/MoviePoster.tsx
"use client";

import React from "react";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
};

export default function MoviePoster({ src, alt, className }: Props) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = "/Placeholder.jpg";
  };

  return (
    <img
      src={src || "/Placeholder.jpg"}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
