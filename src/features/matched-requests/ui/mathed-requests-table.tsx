import { Store, useStore } from "@/app/store";
import { FC, HTMLAttributes } from "react"
import { Request } from "@/shared/types/requests";
import { Table, TableCaption, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { columnsMatchedRequests } from "@/features";
import dayjs from "dayjs";
 

interface MatchedRequestsTableProps extends HTMLAttributes<'div'> {
    request: Request
}

const getMatchedRequests = (state: Store, currentRequest: Request) => {
    const filterRequests = (request: Request) => {
        return request.user_id !== currentRequest.user_id 
            && request.from_city?.toLocaleLowerCase() === currentRequest.from_city?.toLocaleLowerCase() 
            && request.to_city?.toLocaleLowerCase() === currentRequest.to_city?.toLocaleLowerCase()
            && dayjs(request.date_of_dispatch).isBefore(currentRequest.date_of_dispatch)
    }

    return state.requests.filter(filterRequests)
}

export const MatchedRequestsTable: FC<MatchedRequestsTableProps> = ({ request }) => {
    const matchedRequests = useStore((state) => getMatchedRequests(state, request));

    const table = useReactTable({
        data: matchedRequests,
        columns: columnsMatchedRequests,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
      })

    return <div>
            <Table>
                <TableCaption>
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </TableCaption>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getAllCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columnsMatchedRequests.length + 1} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                    )}
                </TableBody>
            </Table>
    </div>
}