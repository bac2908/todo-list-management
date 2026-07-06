import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className="ghost-button"
        type="button"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={17} />
        Prev
      </button>
      <span>
        Page {page + 1} of {totalPages}
      </span>
      <button
        className="ghost-button"
        type="button"
        disabled={page + 1 >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

export default Pagination;
