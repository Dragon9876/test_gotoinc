import {
    ColumnDef,
} from "@tanstack/react-table"
import { Request } from "@/shared/types/requests"
import { formatDate } from '@/shared/utils/format-date'
import { Button } from "@/shared/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"

export const columnsMatchedRequests: ColumnDef<Request>[] = [ {
    accessorKey: "user_id",
    header: "User id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("user_id") || '-'}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "from_city",
    header: "From city",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("from_city")  || '-'}</div>
    ),
  },
  {
    accessorKey: "to_city",
    header: "To city",
    cell: ({ row }) => <div className="lowercase">{row.getValue("to_city") || '-'}</div>,
  },
  {
    accessorKey: "type_of_package",
    header: () => <div className="text-right">Type of package</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("type_of_package") || '-'}</div>
    },
  },
  {
    accessorKey: "date_of_dispatch",
    header:({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date of dispatch
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      
      )
    },
    enableHiding: false,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.date_of_dispatch ? formatDate(row.original.date_of_dispatch) : '-'}</div>
    },
    sortingFn: (rowA, rowB) => {
      const dateA = dayjs(rowA.original.date_of_dispatch);
      const dateB = dayjs(rowB.original.date_of_dispatch);

      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    enableHiding: false,
    cell: ({ row }) => {
      return <div>{row.getValue("description")  || '-'}</div>
    }
  },
]