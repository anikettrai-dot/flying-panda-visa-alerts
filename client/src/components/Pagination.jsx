import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination fade-in">
            <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                &lt;
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            <button
                className="page-btn"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
