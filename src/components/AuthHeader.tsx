"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AuthHeader() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("jwt");
      const name = localStorage.getItem("userName");
      const email = localStorage.getItem("userEmail");

      if (token && name) setUser({ name, email: email || "" });
      else setUser(null);
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("storage"));
    router.push("/movies");
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div ref={dropdownRef} className="relative">
      {user ? (
        <>
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="
              w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 
              flex items-center justify-center text-white text-lg font-semibold 
              shadow-lg transition
            "
          >
            {getInitial(user.name)}
          </button>

          {dropdownOpen && (
            <div
              className="
                absolute right-0 mt-3 w-64 rounded-xl bg-gray-800 
                border border-gray-700 shadow-2xl p-4 animate-fadeIn
              "
            >
              <div className="flex items-center gap-3 border-b border-gray-700 pb-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                  {getInitial(user.name)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center gap-2 px-3 py-2 text-sm 
                  text-red-400 hover:bg-gray-700 rounded-lg transition
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link href="/login">
          <button
            className="
              px-6 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition shadow-lg
            "
          >
            Login
          </button>
        </Link>
      )}
    </div>
  );
}
