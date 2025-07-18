"use client";
import { Navbar } from "@/components/navbar";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen  bg-gray-50">
      <Navbar searchQuery={searchQuery} handleSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        {!loading && !error && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">
                {searchQuery.trim() ? `Resultados para "${searchQuery}"` : "Livros em Destaque"}
              </h2>
            </div>
            <p className="text-gray-600 ml-4">
              {totalResults > 0 && `${totalResults.toLocaleString()} livros encontrados`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
