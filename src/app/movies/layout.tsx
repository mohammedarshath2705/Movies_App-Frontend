// app/movies/layout.tsx

import SearchBar from "@/components/SearchBar";

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* Top SearchBar, NOT inside <header> */}
      <div className="w-full flex justify-center sm:justify-start sm:pl-24 px-4">
        <SearchBar />
      </div>
      <main >{children}</main>
    </div>
  );
}
