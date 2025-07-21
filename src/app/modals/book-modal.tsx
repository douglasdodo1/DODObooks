"use client";

import { useState, useEffect, Key } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, Users, Building, FileText } from "lucide-react";
import { BookDTO } from "@/dtos/book-dto";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BookModalProps {
  book: BookDTO | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookModal({ book, open, onOpenChange }: BookModalProps) {
  const [bookDetails, setBookDetails] = useState<BookDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book && open) {
      fetchBookDetails(book.key);
    }
  }, [book, open]);

  const fetchBookDetails = async (bookKey: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org${bookKey}.json`);
      if (response.ok) {
        const details = await response.json();
        setBookDetails({ ...book!, ...details });
      } else {
        setBookDetails(book!);
      }
    } catch (error) {
      setBookDetails(book!);
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null;

  const getDescription = (desc: string | { value: string } | undefined) => {
    if (!desc) return null;
    if (typeof desc === "string") return desc;
    return desc.value;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent line-clamp-2">
            {book.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-[350px_1fr] gap-8">
          <div className="flex justify-center">
            <div className="w-full max-w-[350px] aspect-[3/4] relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-xl">
              {coverUrl ? (
                <Image
                  src={coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="350px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-blue-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 rounded-lg" />
                <Skeleton className="h-6 w-1/2 rounded-lg" />
                <Skeleton className="h-6 w-1/3 rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            ) : (
              <div>
                {book.author_name && book.author_name.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <Users className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-blue-700 mb-1">Autores</p>
                      <p className="text-sm text-gray-700 font-medium">{book.author_name.join(", ")}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {book.first_publish_year && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <Calendar className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="font-semibold text-sm text-green-700 mb-1">Publicação</p>
                        <p className="text-sm text-gray-700 font-medium">{book.first_publish_year}</p>
                      </div>
                    </div>
                  )}

                  {book.author_name && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                      <FileText className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="font-semibold text-sm text-orange-700 mb-1">Páginas</p>
                        <p className="text-sm text-gray-700 font-medium">{book.author_name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/*book.publisher && book.publisher.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <Building className="w-6 h-6 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-purple-700 mb-1">Editoras</p>
                      <p className="text-sm text-gray-700 font-medium">
                        {book.first_publish_year.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </div>
                )*/}

                {bookDetails?.title && (
                  <div className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                    <p className="font-semibold text-sm text-gray-700">Descrição</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{getDescription(bookDetails.title)}</p>
                  </div>
                )}

                {/* {bookDetails?.subjects && bookDetails.subjects.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-semibold text-sm text-gray-700">Assuntos</p>
                    <div className="flex flex-wrap gap-2">
                      {bookDetails.subjects.slice(0, 10).map((subject: BookDetails, index: Key) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border-indigo-200 hover:from-indigo-100 hover:to-blue-100 transition-colors duration-200"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )*/}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
