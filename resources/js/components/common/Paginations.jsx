import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

const Paginations = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [page, setPage] = useState(currentPage);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      onPageChange(page + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    onPageChange(pageNumber);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`${page === 1 ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
          />
        </PaginationItem>
        {totalPages === 0 && (
          <PaginationItem>
            <PaginationEllipsis className="opacity-50" />
          </PaginationItem>
        )}
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              onClick={() => handlePageClick(pageNumber)}
              isActive={pageNumber === page}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNextPage}
            disabled={
              page === totalPages || totalPages === 0
            }
            className={`${page === totalPages || totalPages === 0 ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
