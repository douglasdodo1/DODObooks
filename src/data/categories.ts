export interface Category {
  id: string;
  name: string;
  query: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "all",
    name: "Todos os Livros",
    query: "",
    icon: "📚",
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "mystery",
    name: "Mistério",
    query: "subject:mystery",
    icon: "🔍",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "adventure",
    name: "Aventura",
    query: "subject:adventure",
    icon: "🗺️",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "romance",
    name: "Romance",
    query: "subject:romance",
    icon: "💕",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "fantasy",
    name: "Fantasia",
    query: "subject:fantasy",
    icon: "🧙‍♂️",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "science_fiction",
    name: "Ficção Científica",
    query: "subject:science_fiction",
    icon: "🚀",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "horror",
    name: "Terror",
    query: "subject:horror",
    icon: "👻",
    color: "from-red-500 to-orange-600",
  },
  {
    id: "biography",
    name: "Biografia",
    query: "subject:biography",
    icon: "👤",
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "history",
    name: "História",
    query: "subject:history",
    icon: "📜",
    color: "from-stone-500 to-amber-600",
  },
  {
    id: "philosophy",
    name: "Filosofia",
    query: "subject:philosophy",
    icon: "🤔",
    color: "from-slate-500 to-gray-600",
  },
];
