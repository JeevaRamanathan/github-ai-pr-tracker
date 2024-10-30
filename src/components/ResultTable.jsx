import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/lib/constants/columns";
import { useData } from "@/lib/hooks/use-data";
import { Button } from "./ui/button";
import { transformDataToResultTable, downloadCSV } from "@/lib/utils";
import { useToast } from "@/lib/hooks/use-toast";

export function ResultTable() {
  const { searchedData, loadingState } = useData();
  const { toast } = useToast();

  const transformedData = transformDataToResultTable(searchedData);
  return (
    <div className="container mx-auto p-5">
      {loadingState != "idle" && searchedData.length > 0 && (
        <>
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => downloadCSV(transformedData, toast)}
            >
              Download
            </Button>
          </div>
          <DataTable columns={columns} data={transformedData} />
        </>
      )}

      {loadingState == "completed" && searchedData.length == 0 && (
        <div className="text-center text-2xl mt-5"> No Data Found</div>
      )}
    </div>
  );
}
