import React from 'react';
import SearchBar from './SearchBar';
import ExportButtons from './ExportButtons';

const ActionToolbar = React.forwardRef(({
    searchQuery,
    setSearchQuery,
    alerts,
    viewMode,
    setViewMode,
    selectedCount,
    onBulkDelete,
    onBulkStatusChange
}, searchRef) => {
    return (
        <div className="action-toolbar">
            <div className="toolbar-left">
                <SearchBar ref={searchRef} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="toolbar-right">
                {selectedCount > 0 && (
                    <div className="bulk-actions">
                        <span className="selection-count">{selectedCount} selected</span>
                        <button
                            className="btn btn-sm btn-toolbar btn-bulk-success"
                            onClick={() => onBulkStatusChange('booked')}
                            title="Mark selected as booked"
                            aria-label="Mark selected alerts as booked"
                        >
                            ✓ Mark Booked
                        </button>
                        <button
                            className="btn btn-sm btn-toolbar btn-bulk-danger"
                            onClick={onBulkDelete}
                            title="Delete selected alerts"
                            aria-label="Delete selected alerts"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                )}

                <div className="view-toggle">
                    <button
                        className={`btn btn-sm btn-toolbar ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setViewMode('table')}
                        title="Table View"
                        aria-label="Switch to table view"
                    >
                        📋
                    </button>
                    <button
                        className={`btn btn-sm btn-toolbar ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                        aria-label="Switch to grid view"
                    >
                        ▦
                    </button>
                </div>

                <ExportButtons data={alerts} />
            </div>
        </div>
    );
});

ActionToolbar.displayName = 'ActionToolbar';

export default ActionToolbar;
