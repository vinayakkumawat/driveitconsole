"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopupModule from "./PopupModule";
import { Column, Action } from "@/lib/types";

interface FilterOption {
  key: string;
  label: string;
  type: "text" | "checkbox";
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
  filterOptions?: FilterOption[];
  onApplyFilter?: (filters: Record<string, string | boolean>) => void;
  extraButton?: React.ReactNode;
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
  filterOptions,
  onApplyFilter,
  extraButton,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});

  const handleInputChange = useCallback(
    (key: string, value: string | boolean) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );
  useEffect(() => {
    if (onApplyFilter) {
      onApplyFilter(filters);
    }
  }, [filters, onApplyFilter]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = data.slice(start, end);

  const toggleFilter = (key: string) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
          <div className="flex items-center gap-6">
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
                  <div className="flex flex-col gap-4">
                    {filterOptions?.map(({ key, label, type }) => (
                      <div key={key} className="flex flex-col gap-2">
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => toggleFilter(key)}
                        >
                          <Image
                            src={"/icons/arrow-down.svg"}
                            alt="toggle"
                            width={12}
                            height={12}
                            className={`${
                              openFilters[key] ? "" : "rotate-90"
                            } w-4 h-4 transition-transform duration-300`}
                          />
                          <span className="text-lg">{label}</span>
                        </div>
                        {openFilters[key] && (
                          <div>
                            {type === "text" ? (
                              <Input
                                placeholder={label}
                                value={(filters[key] as string) || ""}
                                onChange={(e) =>
                                  handleInputChange(key, e.target.value)
                                }
                                className="w-full h-8"
                              />
                            ) : (
                              <Checkbox
                                checked={!!filters[key]}
                                onCheckedChange={(checked) =>
                                  handleInputChange(key, checked)
                                }
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
            {extraButton && extraButton}
          </div>
        </div>
      )}

      <table className="w-full">
        {columns[0].header.length > 0 && (
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
        )}

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
                  <td className="flex gap-2 justify-center w-full">
                    {actions.map((action, actionIndex) => (
                      <PopupModule key={actionIndex} form={action.form}>
                        <Button variant="secondary" size="icon" className="w-full">
                          <Image
                            src={action.icon}
                            alt={action.alt}
                            width={25}
                            height={25}
                          />
                          {action.text && (
                            <span className="text-lg">{action.text}</span>
                          )}
                        </Button>
                      </PopupModule>
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
