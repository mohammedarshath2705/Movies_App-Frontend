"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const userId = params.get("userId");
    const username = params.get("username");
    const email = params.get("email");

    if (!token || !userId) {
      router.push("/login?error=OAuth failed");
      return;
    }

    localStorage.setItem("jwt", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", username || "");
    localStorage.setItem("userEmail", email || "");

    window.dispatchEvent(new Event("storage"));

    router.push("/movies");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p className="text-lg">Finishing Google login...</p>
    </div>
  );
}
