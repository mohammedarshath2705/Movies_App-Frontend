import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Discover amazing movies",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="bg-red-900 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Movies App</h1>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-red-900 text-white p-4 text-center mt-8">
          <p>© {new Date().getFullYear()} Movies App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
