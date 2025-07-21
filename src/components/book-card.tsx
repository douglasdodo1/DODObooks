"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star } from "lucide-react";
import { BookDTO } from "@/dtos/book-dto";
import { Button } from "./ui/button";
import { useState } from "react";

interface BookCardProps {
  book: BookDTO;
  onClick: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export function BookCard({ book, onClick, isFavorite, toggleFavorite }: BookCardProps) {
  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite();

    if (isFavorite) {
      setConfirmationMessage(`Livro "${book.title}" removido dos favoritos!`);
    } else {
      setConfirmationMessage(`Livro "${book.title}" adicionado aos favoritos!`);
    }

    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <>
      <Card
        className="rounded-2xl group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg overflow-hidden"
        onClick={onClick}
      >
        <CardContent className="p-0">
          <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl">
            {coverUrl ? (
              <div className="absolute inset-0">
                <Image
                  src={coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
                <BookOpen className="w-16 h-16 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
            )}

            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleFavorite}
                title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Star className={`w-4 h-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : "text-yellow-500"}`} />
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-sm leading-tight line-clamp-2 min-h-[2.5rem] text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {book.title}
            </h3>

            {book.author_name && book.author_name.length > 0 && (
              <p className="text-xs text-gray-600 line-clamp-2 font-medium">
                {book.author_name.map((author) => author).join(", ")}
              </p>
            )}

            <div className="flex items-center justify-between">
              {book.first_publish_year && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 hover:from-blue-200 hover:to-purple-200 transition-colors duration-200"
                >
                  {book.first_publish_year}
                </Badge>
              )}

              {book.edition_count && (
                <span className="text-xs text-gray-500 font-medium">{book.edition_count} edições</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showConfirmation && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-md px-6 py-3 shadow-lg z-50 animate-fade-in-out">
          {confirmationMessage}
        </div>
      )}
    </>
  );
}
