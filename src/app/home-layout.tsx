export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="bg-red-800 text-white py-4 shadow-md">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold tracking-wide"> Movies App</h1>
          </div>
        </header>
  
        {/* Main */}
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
  
        
      </div>
    );
  }
  