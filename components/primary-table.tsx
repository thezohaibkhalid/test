"use client"

import React, { useEffect, useState } from "react"
import {
  type ColumnDef,
  type VisibilityState,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

import { useRouter, useSearchParams } from "next/navigation"

interface Column<T> {
  dataField: keyof T | string
  text: string
  formatter?: (cell: any, row: T, rowIndex: number) => React.ReactNode
  width?: string | number
  sortable?: boolean
  visible?: boolean
}

interface PrimaryTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T | string
  bordered?: boolean
  responsive?: boolean
  showColumnToggle?: boolean
  onRowClick?: (row: T) => void
}

export function PrimaryTable<T>({
  columns,
  data,
  keyField,
  bordered = true,
  responsive = false,
  showColumnToggle = true,
  onRowClick,
}: PrimaryTableProps<T>) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Sorting (from URL)
  const sort = searchParams.get("sort")
  const order = searchParams.get("order")
  const initialSorting: SortingState = sort ? [{ id: sort, desc: order === "desc" }] : []

  // Column Filters (kept simple)
  const initialFilters: ColumnFiltersState = []

  // Column Visibility (from URL or defaults)
  const allColumnIds = columns.map((c) => c.dataField as string)
  const colsParam = searchParams.get("cols")
  const initialVisibility: VisibilityState = React.useMemo(() => {
    if (colsParam) {
      const visibleCols = new Set(colsParam.split(","))
      const vis: VisibilityState = {}
      allColumnIds.forEach((id) => {
        vis[id] = visibleCols.has(id)
      })
      return vis
    }
    const defaultVis: VisibilityState = {}
    columns.forEach((col) => {
      defaultVis[col.dataField as string] = col.visible !== false
    })
    return defaultVis
  }, [columns, colsParam, allColumnIds])

  // Controlled states (no pagination)
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialFilters)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibility)

  const columnDefs = React.useMemo<ColumnDef<T, any>[]>(
    () =>
      columns.map((col) => ({
        accessorKey: col.dataField as string,
        header: col.text,
        cell: ({ row, getValue }) =>
          col.formatter ? col.formatter(getValue(), row.original, row.index) : getValue(),
        enableSorting: col.sortable ?? false,
        enableHiding: true,
      })),
    [columns],
  )

  const table = useReactTable({
    data,
    columns: columnDefs,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams)

  //   if (sorting.length > 0) {
  //     params.set("sort", sorting[0].id)
  //     params.set("order", sorting[0].desc ? "desc" : "asc")
  //   } else {
  //     params.delete("sort")
  //     params.delete("order")
  //   }

  //   const visibleColumnIds = Object.keys(columnVisibility).filter((key) => columnVisibility[key])
  //   if (visibleColumnIds.length < allColumnIds.length) {
  //     params.set("cols", visibleColumnIds.join(","))
  //   } else {
  //     params.delete("cols")
  //   }

  //   router.replace(`?${params.toString()}`, { scroll: false })
  // }, [sorting, columnVisibility, router, searchParams, allColumnIds])

  return (
    <div className={responsive ? "overflow-x-auto" : undefined}>
      {showColumnToggle && (
        <div className="flex justify-end mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <Table className={`${bordered ? "border rounded-lg" : ""}`}>
        <TableHeader className="border rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
