import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: string;
}

interface Action<T> {
  icon: string;
  alt: string;
  onClick: (row: T) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  showCheckbox?: boolean;
  title?: string;
  subtitle?: string;
  itemsPerPage?: number;
  showSearch?: boolean;
  showFilter?: boolean;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  actions = [],
  showCheckbox = false,
  title,
  subtitle,
  itemsPerPage = 10,
  showSearch = true,
  showFilter = true,
  onSearch,
  onFilter,
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = data.slice(start, end);

  return (
    <div className="flex flex-col gap-6">
      {(title || showSearch || showFilter) && (
        <div className="flex justify-between items-center border-b border-b-[#BCBCBC]">
          {title && (
            <div className="flex gap-6 mr-4">
              <div className="py-3 px-1 flex gap-1 border-b-[4px] border-b-[#F9CF70]">
                <span className="text-lg">{title}</span>
                {subtitle && (
                  <span className="text-lg text-[#9B9B9B]">({subtitle})</span>
                )}
              </div>
            </div>
          )}
          <div className="flex gap-6">
            {showFilter && (
              <Popover>
                <PopoverTrigger>
                  <div
                    onClick={onFilter}
                    className="py-3 px-1 flex items-center gap-1 cursor-pointer"
                  >
                    <Image
                      src="/icons/filter-icon.svg"
                      alt="filter"
                      width={16}
                      height={16}
                    />
                    <span className="text-lg">סינון</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="px-4 py-6" align="end">
                  Filter options will come here
                </PopoverContent>
              </Popover>
            )}
            {showSearch && (
              <Popover>
                <PopoverTrigger>
                  <div className="cursor-pointer py-3 px-1 flex items-center gap-1 font-light">
                    <Image
                      src="/icons/search-icon.svg"
                      alt="filter"
                      width={100}
                      height={100}
                      className="w-4 h-4"
                    />
                    <span className="text-lg">חיפוש</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-1" align="end">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="חיפוש..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        onSearch?.(e.target.value);
                      }}
                      className="w-full h-8"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="bg-white h-14 border-b border-black">
            {showCheckbox && <th className="w-10"></th>}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="text-center text-lg font-medium"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
            {actions.length > 0 && <th className="w-32"></th>}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <React.Fragment key={row.id || rowIndex}>
              <tr className="bg-white h-14 text-lg text-center">
                {showCheckbox && (
                  <td className="flex items-center justify-center">
                    <Checkbox className="h-5 w-5" />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="flex gap-2 justify-center">
                    {actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant="secondary"
                        size="icon"
                        onClick={() => action.onClick(row)}
                      >
                        <Image
                          src={action.icon}
                          alt={action.alt}
                          width={25}
                          height={25}
                        />
                      </Button>
                    ))}
                  </td>
                )}
              </tr>
              <tr className="h-1"></tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="py-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
