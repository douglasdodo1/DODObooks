import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookSkeleton() {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg">
      <CardContent className="p-0">
        <Skeleton className="aspect-[3/4] w-full mb-3 rounded-none bg-gradient-to-br from-gray-200 to-gray-300" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
          <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-16 rounded-full bg-gradient-to-r from-blue-200 to-purple-200" />
            <Skeleton className="h-4 w-8 bg-gradient-to-r from-gray-200 to-gray-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BookSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );
}
