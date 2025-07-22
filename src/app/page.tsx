"use client";

import { BookCard } from "@/components/book-card";
import { BookSkeletonGrid } from "@/components/book-skeleton";
import { Navbar } from "@/components/navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BookDTO } from "@/dtos/book-dto";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { BookModal } from "./modals/book-modal";
import { CategoryFilter } from "@/components/category-filter";
import { Category } from "@/data/categories";

export default function Home() {
  const limit = 20;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openBookModal, setOpenBookModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null);
  const [favorites, setFavorites] = useState<BookDTO[]>([]);
  const [isFavoriteView, setIsFavoriteView] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [index, setIndex] = useState<number>(-1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", selectedCategory, currentPage, limit, searchQuery],
    queryFn: () =>
      fetch(`/api/books?page=${currentPage}&limit=${limit}&q=${searchQuery}&category=${selectedCategory}`).then((r) =>
        r.json()
      ),
  });

  const [totalResults, setTotalResults] = useState<number>(0);

  const loadFavorites = () => {
    const storedFavorites = Object.keys(localStorage)
      .filter((key) => key.startsWith("favorite-"))
      .map((key) => JSON.parse(localStorage.getItem(key) || "{}") as BookDTO);
    setFavorites(storedFavorites);
  };

  const toggleFavorite = (book: BookDTO) => {
    const favKey = `favorite-${book.key}`;
    if (localStorage.getItem(favKey)) {
      localStorage.removeItem(favKey);
    } else {
      localStorage.setItem(favKey, JSON.stringify(book));
    }
    loadFavorites();
  };

  useEffect(() => {
    if (data?.docs) {
      setTotalResults(data.docs.length || 0);
      setTotalPages(Math.ceil(data.numFound / limit));
    }

    if (searchQuery.trim() !== "") {
      setCurrentPage(1);
      setTotalPages(Math.ceil(data?.numFound / limit) || 1);
    }

    loadFavorites();

    const handleStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("favorite-") || e.key === null) {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [data, searchQuery, limit]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category.id);
    setCurrentPage(1);
  };

  function handleBookClick(book: BookDTO) {
    setSelectedBook(book);
    const index = data?.docs.indexOf(book) ?? -1;
    setIndex(index);
    setOpenBookModal(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        setIsFavorite={setIsFavoriteView}
        isFavorite={isFavoriteView}
        setCurrentPage={setCurrentPage}
      />
      <main className="container mx-auto px-4 py-8">
        {!isLoading && !error && isFavoriteView && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">Meus Favoritos</h2>
            </div>
            <p className="text-gray-600 ml-4">{favorites.length.toLocaleString()} livros favoritos</p>
          </div>
        )}

        {!isLoading && !error && !isFavoriteView && (
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
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

        {!isLoading &&
          !error &&
          ((isFavoriteView && favorites.length === 0) || (!isFavoriteView && data?.docs.length === 0)) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {isFavoriteView ? "Nenhum livro favorito encontrado" : "Nenhum livro encontrado"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {isFavoriteView
                  ? "Adicione livros aos favoritos para visualizá-los aqui."
                  : "Tente pesquisar com termos diferentes ou verifique a ortografia. Que tal explorar nossa coleção em destaque?"}
              </p>
            </div>
          )}

        {!isLoading && !error && (
          <>
            {isFavoriteView ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favorites.map((book) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    onClick={() => handleBookClick(book)}
                    isFavorite={true}
                    toggleFavorite={() => toggleFavorite(book)}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {data.docs.map((book: BookDTO) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    onClick={() => handleBookClick(book)}
                    isFavorite={favorites.some((fav) => fav.key === book.key)}
                    toggleFavorite={() => toggleFavorite(book)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="fixed bottom-0 inset-x-0 mt-8 flex justify-center">
          <Pagination className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-md px-4 py-2 space-x-1">
            <PaginationContent className="flex items-center gap-1">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-md px-2 py-1 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(1)}
                  className={`rounded-md px-3 py-1 text-sm font-semibold ${
                    currentPage === 1
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage >= 1 && currentPage < 3 && totalPages > 3 && (
                <div className="flex flex-row">
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(2)}
                      className={`rounded-md px-3 py-1 text-sm font-semibold ${
                        currentPage === 2
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                          : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(3)}
                      className={`rounded-md px-3 py-1 text-sm font-semibold ${
                        currentPage === 3
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                          : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                </div>
              )}

              {currentPage >= 3 && totalPages > 3 && (
                <div className="flex flex-row">
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="rounded-md px-3 py-1 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(currentPage)}
                      className="rounded-md px-3 py-1 text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="rounded-md px-3 py-1 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                </div>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="rounded-md px-2 py-1 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <BookModal book={data?.docs[index] || null} open={openBookModal} onOpenChange={setOpenBookModal} />
      </main>
    </div>
  );
}
