"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  PaginationState,
  ColumnFiltersState,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

import { useState, useMemo } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown, 
  Search, 
  Trash2, 
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileX
} from "lucide-react";
import "@/styles/DataTable.css";

interface Props<TData = any> {
  data: TData[];
  columns: any[]; 
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableFiltering?: boolean;
  enableRowSelection?: boolean;
  pageSize?: number;
  onDeleteSelected?: (rows: TData[]) => void;
  onExport?: (rows: TData[]) => void;
  isLoading?: boolean;
}

export default function DataTable<TData>({ 
  data, 
  columns,
  enableSorting = true,
  enablePagination = true,
  enableFiltering = true,
  enableRowSelection = true,
  pageSize = 10,
  onDeleteSelected,
  onExport,
  isLoading = false
}: Props<TData>) {
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const tableColumns = useMemo(() => {
    if (!enableRowSelection) return columns;

    const selectColumn: ColumnDef<TData, unknown> = {
      id: "select",
      header: ({ table }) => (
        <button
          className={`table-checkbox ${table.getIsAllPageRowsSelected() ? "checked" : ""}`}
          onClick={table.getToggleAllPageRowsSelectedHandler()}
        >
          {table.getIsAllPageRowsSelected() && "✓"}
        </button>
      ),
      cell: ({ row }) => (
        <button
          className={`table-checkbox ${row.getIsSelected() ? "checked" : ""}`}
          onClick={row.getToggleSelectedHandler()}
        >
          {row.getIsSelected() && "✓"}
        </button>
      ),
      size: 50,
    };

    return [selectColumn, ...columns];
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      pagination,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getFilteredRowModel: (enableFiltering || enableSorting) ? getFilteredRowModel() : undefined,
    enableRowSelection,
  });

  const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);
  const hasSelection = selectedRows.length > 0;

  const handleDelete = () => {
    if (onDeleteSelected && hasSelection) {
      onDeleteSelected(selectedRows);
      setRowSelection({});
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(hasSelection ? selectedRows : data);
    }
  };

  const getPageNumbers = () => {
    const total = table.getPageCount();
    const current = table.getState().pagination.pageIndex + 1;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }
    return pages;
  };

  if (isLoading) {
    return (
      <div className="table-container">
        <div className="table-loading">
          <div className="table-loading-spinner" />
          <span>Carregando dados...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      {/* Toolbar */}
      <div className="table-toolbar">
        {enableFiltering && (
          <div className="table-search">
            <input
              type="text"
              placeholder="Pesquisar em todos os campos..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Search size={16} className="table-search-icon" />
          </div>
        )}

        <div className="table-actions">
          {hasSelection && (
            <span className="table-selected-info">
              {selectedRows.length} selecionado(s)
            </span>
          )}
          
          {enableRowSelection && hasSelection && onDeleteSelected && (
            <button className="table-btn danger" onClick={handleDelete}>
              <Trash2 size={14} /> Excluir
            </button>
          )}
          
          <button className="table-btn" onClick={handleExport}>
            <Download size={14} /> Exportar
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th 
                  key={header.id}
                  className={`${enableSorting && header.column.getCanSort() ? "sortable" : ""} ${
                    header.column.getIsSorted() ? `sorted ${header.column.getIsSorted()}` : ""
                  }`}
                  onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
                  style={{ width: header.getSize() }}
                >
                  <div className="th-content">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {enableSorting && header.column.getCanSort() && (
                      <span className="sort-icon">
                        <ChevronUp size={10} />
                        <ChevronDown size={10} />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={row.getIsSelected() ? "selected" : ""}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="table-empty">
          <div className="table-empty-icon">
            <FileX size={32} />
          </div>
          <div className="table-empty-text">
            Nenhum dado encontrado
          </div>
        </div>
      )}

      {enablePagination && data.length > 0 && (
        <div className="table-pagination">
          <div className="pagination-info">
            Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            de {table.getFilteredRowModel().rows.length} registros
          </div>

          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </button>
            
            <button
              className="pagination-btn"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="pagination-pages">
              {getPageNumbers().map((page, idx) => (
                page === "..." ? (
                  <span key={idx} className="pagination-ellipsis">...</span>
                ) : (
                  <button
                    key={idx}
                    className={`pagination-btn ${page === table.getState().pagination.pageIndex + 1 ? "active" : ""}`}
                    onClick={() => table.setPageIndex((page as number) - 1)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </button>
            
            <button
              className="pagination-btn"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={16} />
            </button>
          </div>

          <select
            className="page-size-select"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / página
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}