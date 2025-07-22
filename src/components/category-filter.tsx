"use client";

import { categories, type Category } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Explorar por Categoria</h3>
      </div>

      <ScrollArea className="w-full">
        <div className="flex flex-row gap-3 pb-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className={`
                flex items-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105
                ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-0`
                    : "bg-white/80 border-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-300"
                }
              `}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
