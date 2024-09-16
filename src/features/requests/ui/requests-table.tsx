import { FC, useMemo, useState, HTMLAttributes } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card"
import { Table, TableCaption, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/shared/ui/dialog"
import { columnsRequests } from '@/features';
import { ReactNode, useParams } from "@tanstack/react-router";
import { Request } from "@/shared/types/requests";
import { useStore } from "@/app/store";
import { Pencil1Icon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";

import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

interface RequestsTableProps extends HTMLAttributes<'div'> {
    renderEditModal: (request: Request, closeModal: () => void) => ReactNode,
    renderMatchedRequestsModal: (request: Request) => ReactNode,
}

export const RequestsTable: FC<RequestsTableProps> = ({ renderEditModal, renderMatchedRequestsModal }) => {
    const { userId } = useParams({ strict: false });
    const { requests, deletePackage } = useStore();
    const [sorting, setSorting] = useState<SortingState>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<string>('');

    const requestsMemo = useMemo(() => userId ? requests.filter(req => req.user_id === userId)  : requests, [requests, userId])

    const table = useReactTable({
        data: requestsMemo,
        columns: columnsRequests,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          sorting,
        },
    })

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const changeModal = (isOpen: boolean, rowId: string) => {
        setIsModalOpen(isOpen);

        setCurrentRow(rowId);
    }

    return <Card>
        <CardHeader>
            <CardTitle>Packages</CardTitle>
            <CardDescription>
                Manage your packages and view their details.
            </CardDescription>
        </CardHeader>
        <CardContent>
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

                                <TableHead className="text-right">Actions</TableHead>
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

                                <TableCell className="flex justify-end gap-2">
                                    <Dialog>
                                        <DialogTrigger className="text-left" asChild>
                                            <Button 
                                                variant={'default'} 
                                                className="max-w-[45px] px-3 py-2"
                                            >
                                                <UploadIcon />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="min-w-[800px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Matched requests
                                                </DialogTitle>
                                            </DialogHeader>
                                            {renderMatchedRequestsModal(row.original)}
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog open={row.original.id === currentRow && isModalOpen} onOpenChange={(isOpen) => changeModal(isOpen, row.original.id!)}>
                                        <DialogTrigger className="text-left" asChild>
                                            <Button variant={'outline'} className="max-w-[45px] px-3 py-2">
                                                <Pencil1Icon />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Edit request
                                                </DialogTitle>
                                            </DialogHeader>
                                            {renderEditModal(row.original, closeModal)}
                                        </DialogContent>
                                    </Dialog>
                                
                                    <Button variant={'destructive'} className="max-w-[45px] px-3 py-2" onClick={() => deletePackage(row.original.id!)}>
                                        <TrashIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columnsRequests.length + 1} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}