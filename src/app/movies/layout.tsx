import AuthHeader from "@/components/AuthHeader";
import SearchBar from "@/components/SearchBar";

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* ✅ IMDB-style Top Bar */}
      <header className="
        sticky top-0 z-50
        w-full
        bg-gray-900/95 backdrop-blur-md 
        border-b border-gray-800
        px-4 py-3
        flex items-center justify-between
      ">
        {/* Search Left */}
        <div className="flex-1 flex justify-start">
          <SearchBar />
        </div>

        {/* Profile Right */}
        <div className="ml-4">
          <AuthHeader />
        </div>
      </header>

      {/* Page Content */}
      <main className="px-4 py-4 sm:px-6 lg:px-12">
        {children}
      </main>
    </div>
  );
}
