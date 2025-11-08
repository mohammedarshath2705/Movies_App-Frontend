// components/FilterDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { FilterType } from "@/types/movie";
import { useRouter } from "next/navigation";

type FilterDropdownProps = {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export function FilterDropdown({ currentFilter, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filters = [
    { value: "default", label: "Featured" },
    { value: "imdb", label: "IMDb Rating" },
    { value: "release", label: "Release Date" },
    { value: "today release", label: "Today's Releases" },
    { value: "favourites", label: "My Favourites" }
  ];

  const currentLabel =
    filters.find((f) => f.value === currentFilter)?.label || "Featured";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Safe filter handler with login check
  const handleSelect = (value: FilterType) => {
    if (value === "favourites") {
      const token = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        router.push("/login");
        return;
      }
    }

    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-end mb-8" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          aria-expanded={isOpen}
        >
          <span className="font-medium text-gray-700">{currentLabel}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  className={`w-full text-left px-4 py-2.5 text-sm ${
                    currentFilter === filter.value
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelect(filter.value as FilterType)}
                >
                  {filter.label}
                  {currentFilter === filter.value && (
                    <svg
                      className="inline-block ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
