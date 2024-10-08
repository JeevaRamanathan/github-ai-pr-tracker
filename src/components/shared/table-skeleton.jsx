import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows = 5, columns = 7 }) {
  return (
    <div className="space-y-3">
      <div className="flex space-x-3">
        {[...Array(columns)].map((_, colIndex) => (
          <Skeleton
            key={`header-${colIndex}`}
            className="h-6 w-[150px] rounded-md"
          />
        ))}
      </div>

      {[...Array(rows)].map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-3 mt-3">
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-8 w-[150px] rounded-md"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
