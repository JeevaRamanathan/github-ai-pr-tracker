import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/lib/constants/columns";
import { useData } from "@/lib/hooks/use-data";
import { Skeleton } from "./ui/skeleton";
import { transformDataToResultTable } from "@/lib/utils";

export function ResultTable() {
  const { searchedData, loadingState } = useData();

  const transformedData = transformDataToResultTable(searchedData);
  return (
    <div className="container mx-auto p-5">
      {loadingState != "idle" && searchedData.length > 0 && (
        <DataTable columns={columns} data={transformedData}  />
      )}

      {loadingState == "completed" && searchedData.length == 0 && (
        <div className="text-center text-2xl mt-5"> No Data Found</div>
      )}
    </div>
  );
}
