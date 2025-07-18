"use client";
import { BookCard } from "@/components/book-card";
import { BookSkeletonGrid } from "@/components/book-skeleton";
import { Navbar } from "@/components/navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pagination } from "@/components/ui/pagination";
import { BookDTO } from "@/dtos/book-dto";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["books", "mystery"],
    queryFn: () => fetch("/api/books").then((r) => r.json()),
  });

  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    console.log(data);

    if (data) {
      setTotalResults(data.works?.numFound || 0);
    }
  }, [data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  function handleBookClick(book: BookDTO) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      <Navbar searchQuery={searchQuery} handleSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        {!isLoading && !error && (
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
        {error && (
          <Alert variant="destructive" className="mb-8 border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-red-700 font-medium">
              {error instanceof Error ? error.message : String(error)}. Tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        )}

        {isLoading && <BookSkeletonGrid />}

        {!isLoading && !error && data.docs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Nenhum livro encontrado</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Tente pesquisar com termos diferentes ou verifique a ortografia. Que tal explorar nossa coleção em
              destaque?
            </p>
          </div>
        )}

        {!isLoading && !error && data.docs.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.docs.map((book: BookDTO) => (
                <BookCard key={book.key} book={book} onClick={() => handleBookClick(book)} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
