import {
    ColumnDef,
} from "@tanstack/react-table"
import { Request } from "@/shared/types/requests"
import { formatDate } from '@/shared/utils/format-date'

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
    header: "Date of dispatch",
    enableHiding: false,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.date_of_dispatch ? formatDate(row.original.date_of_dispatch) : '-'}</div>
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    enableHiding: false,
    cell: ({ row }) => {
      return <div>{row.getValue("description")  || '-'}</div>
    }
  },]