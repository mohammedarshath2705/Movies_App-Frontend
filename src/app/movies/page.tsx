// src/movies/page.tsx
"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MoviesPage from "@/components/MoviesPage";
import { AUTH_URL} from "@/lib/config";


function MoviesContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    localStorage.setItem("jwt", token);

    fetch(`${AUTH_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userId", data.userId || "");
        localStorage.setItem("userName", data.username || data.name || "User");
        localStorage.setItem("userEmail", data.email || "");

        window.dispatchEvent(new Event("storage"));
      })
      .catch(() => {
        localStorage.setItem("userName", "User");
        localStorage.setItem("userEmail", "");
      });

    window.history.replaceState({}, "", window.location.origin + "/movies");
  }, []); // ✅ empty array = NO infinite loop

  return <MoviesPage />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-6">Loading movies...</div>}>
      <MoviesContent />
    </Suspense>
  );
}
