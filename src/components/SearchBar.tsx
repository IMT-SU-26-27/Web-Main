"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { SearchableItem } from "@/types/dashboard";

interface CategoryFilter extends SearchableItem<number> {
  id: number;
  name: string;
}

interface SearchSectionProps<T, C extends CategoryFilter> {
  items: T[];
  categories?: C[];
  children: (filteredItems: T[]) => React.ReactNode;
  className?: string;
  placeholder?: string;
  getSearchValue?: (item: T) => string;
  getItemCategoryId?: (item: T) => string | number;
  additionalElements?: React.ReactNode;
  childrenOverflow?: boolean;
  isCentered?: boolean;
}

export default function SearchBar<T extends SearchableItem, C extends CategoryFilter = CategoryFilter>({
  items,
  categories,
  children,
  className,
  placeholder = "Search Here...",
  getSearchValue = (item) => item.title ?? item.name ?? "",
  getItemCategoryId = (item) => (item as T & { categoryId?: string | number }).categoryId ?? "",
  additionalElements = null,
  childrenOverflow = false,
  isCentered = false,
}: SearchSectionProps<T, C>) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<(string | number)[]>([]);

  // handle category toggle
  const toggleCategory = (categoryId: string | number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = getSearchValue(item)
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(getItemCategoryId(item));

      return matchesSearch && matchesCategory;
    });
  }, [items, search, selectedCategories, getSearchValue, getItemCategoryId]);

  return (
    <div className={`w-full ${className ?? ""}`}>
      {/* Search bar */}
      <div
        className={`my-1 ${isCentered ? "m-auto justify-center" : "justify-start"} flex items-center gap-2 w-full`}
      >
        <div className="relative w-full">
          <Image
            src="/logos/SearchIcon.webp"
            alt="Search Icon"
            width={18}
            height={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border-[2.5px] border-[#840D1] rounded-full bg-white focus:outline-none placeholder-gray-400 text-sm"
          />
        </div>
        
        {additionalElements}
      </div>

      {/* Category filter buttons */}
      {categories  && (
          <div className="flex flex-wrap gap-2 justify-center my-2">
            {categories.map((cat) => {
              const isActive = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1 rounded-full border transition ${
                    isActive
                      ? "bg-[#FF4712] text-white border-[#FF4712]"
                      : "bg-white text-black border-[#FF4712] hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )
      }

      {/* Render children */}
      <div className={`w-full ${childrenOverflow ? "overflow-x-auto" : ""}`}>
        {children(filteredItems)}
      </div>
    </div>
  );
}
