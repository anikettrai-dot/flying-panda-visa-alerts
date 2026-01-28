import React from 'react';

const SearchBar = React.forwardRef(({ searchQuery, setSearchQuery }, ref) => {
    const handleClear = () => {
        setSearchQuery('');
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flex: '1',
            maxWidth: '400px'
        }}>
            <div style={{
                position: 'relative',
                flex: '1',
                display: 'flex',
                alignItems: 'center'
            }}>
                <span style={{
                    position: 'absolute',
                    left: '1rem',
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    pointerEvents: 'none'
                }}>🔍</span>
                <input
                    ref={ref}
                    type="text"
                    placeholder="Search alerts... (Ctrl+K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        paddingLeft: '2.5rem',
                        paddingRight: searchQuery ? '2.5rem' : '1rem'
                    }}
                    aria-label="Search alerts"
                />
                {searchQuery && (
                    <button
                        onClick={handleClear}
                        className="btn-clear"
                        style={{
                            position: 'absolute',
                            right: '0.5rem',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                            transition: 'var(--transition-fast)'
                        }}
                        title="Clear search (ESC)"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
