"use client";
import { Suspense } from "react";
import MoviesPage from "@/components/MoviesPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-6">Loading movies...</div>}>
      <MoviesPage />
    </Suspense>
  );
}
