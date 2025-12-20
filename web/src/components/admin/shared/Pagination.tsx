"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-[#2A2A2A] bg-[var(--color-surface)] px-6 py-4">
      <div className="text-sm text-[var(--color-text-secondary)]">
        Showing <span className="font-medium text-[var(--color-text-primary)]">{startItem}</span> to{" "}
        <span className="font-medium text-[var(--color-text-primary)]">{endItem}</span> of{" "}
        <span className="font-medium text-[var(--color-text-primary)]">{totalItems}</span> items
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded border transition-colors",
            currentPage === 1
              ? "cursor-not-allowed border-[#2A2A2A] text-[var(--color-text-muted)] opacity-50"
              : "border-[#2A2A2A] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex h-8 w-8 items-center justify-center text-[var(--color-text-muted)]"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isCurrentPage = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={cn(
                  "inline-flex h-8 min-w-[2rem] items-center justify-center rounded px-2 text-sm font-medium transition-colors",
                  isCurrentPage
                    ? "bg-[var(--color-gold)] text-[var(--color-background)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[#2A2A2A] hover:text-[var(--color-text-primary)]"
                )}
                aria-label={`Page ${pageNum}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded border transition-colors",
            currentPage === totalPages
              ? "cursor-not-allowed border-[#2A2A2A] text-[var(--color-text-muted)] opacity-50"
              : "border-[#2A2A2A] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
