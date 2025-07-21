import { BookOpen, Search, Star } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  searchQuery: string;
  handleSearch: (query: string) => void;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  isFavorite?: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Navbar = ({ searchQuery, handleSearch, setIsFavorite, isFavorite, setCurrentPage }: Props) => {
  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
    setCurrentPage(1);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dodo Library
              </h1>
              <p className="text-sm text-gray-500 font-medium">Descubra seu próximo livro favorito</p>
            </div>
          </div>

          <div className="flex-1 max-w-lg ml-auto flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Pesquisar por título, autor ou termo..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 h-12 bg-white/80 border-gray-200 rounded-xl shadow-sm focus:shadow-md transition-shadow duration-200 text-gray-700 placeholder:text-gray-400 w-full"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className={`rounded-full transition-colors ${
                isFavorite ? "bg-yellow-100 text-yellow-500" : "text-gray-400 hover:text-yellow-500"
              }`}
              title="Ver favoritos"
            >
              <Star className={`w-5 h-5 ${isFavorite ? "fill-yellow-500" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
