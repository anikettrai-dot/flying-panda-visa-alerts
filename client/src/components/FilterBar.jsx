import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
    return (
        <div className="filter-bar fade-in">
            <input
                type="text"
                className="filter-input"
                placeholder="Filter by Country..."
                value={filter.country}
                onChange={(e) => setFilter({ ...filter, country: e.target.value })}
            />
            <select
                className="filter-select"
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Booked">Booked</option>
                <option value="Expired">Expired</option>
            </select>
        </div>
    );
};

export default FilterBar;
