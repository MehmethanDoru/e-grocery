const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsis = totalPages > 5;
    
    if (!showEllipsis) {
      // If total pages are 4 or less, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push('...');
    }

    // Calculate middle pages
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    }
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }

    // Always show last page
    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 my-10 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-md bg-[#064c4f] text-white disabled:opacity-50 text-sm"
      >
        &lt;
      </button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-[#064c4f]">...</span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded-md min-w-[2.5rem] text-sm ${
              currentPage === page
                ? 'bg-[#064c4f] text-white'
                : 'bg-gray-100 text-[#064c4f] hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-md bg-[#064c4f] text-white disabled:opacity-50 text-sm"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;