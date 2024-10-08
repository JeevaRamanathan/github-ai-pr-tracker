import { getLinesChanged, getPRStateIcon, getPRStatusBadge } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "prStatus",
    header: "",
    size: 20,
    cell: ({ cell }) => {
      return getPRStateIcon(cell.getValue());
    },
  },
  {
    accessorKey: "title",

    header: "PR Title",
    size: 200,
    cell: ({ cell, row }) => (
      <a
        href={row.original.url}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-normal break-words text-blue-500 hover:underline"
      >
        {cell.getValue()}
      </a>
    ),
  },

  {
    accessorKey: "state",
    header: "PR State",
    cell: ({ cell }) => {
      return getPRStatusBadge(cell.getValue());
    },
    //filter function to be added
    // size: 40,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    // size: 100,
  },
  {
    accessorKey: "mergedAt",
    header: "Merged At",
    // size: 100,
  },
  {
    accessorKey: "linesChanged",
    header: "Lines Changed",
    cell: ({ row }) => {
      const { additions, deletions } = row.original.linesChanged;
      return getLinesChanged(additions, deletions);
    },
    // size: 50,
  },
  {
    accessorKey: "repoOwner",
    header: "Repository Owner",
    cell: ({ cell }) => (
      <a
        href={`https://github.com/${cell.getValue()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-normal break-words text-blue-500 hover:underline"
      >
        {cell.getValue()}
      </a>
    ),
    // size:120,
  },
  {
    accessorKey: "diffLink",
    header: "Diff Checker",
    cell: ({ cell }) => (
      <a
        href={cell.getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-normal break-words text-blue-500 hover:underline"
      >
        {cell.getValue()}
      </a>
    ),
    size: 200,
  },
];
