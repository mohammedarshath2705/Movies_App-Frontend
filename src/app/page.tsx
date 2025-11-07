// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "white",
          textAlign: "center",
          top: "50%",
          transform: "translateY(-50%)",
          padding: "0 1rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Welcome to Movies App
        </h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
          Discover top-rated and trending movies in one place.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="/movies"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "9999px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "background-color 0.3s",
            }}
          >
             Explore Movies
          </Link>
        </div>
      </div>
    </div>
  );
}