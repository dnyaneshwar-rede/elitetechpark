
import { Skeleton } from "@/components/ui/skeleton";

const RecipeSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-card shadow-md">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
