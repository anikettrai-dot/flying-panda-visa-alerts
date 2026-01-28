import React from 'react';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

const ExportButtons = ({ data, disabled = false }) => {
    const handleExportCSV = () => {
        const timestamp = new Date().toISOString().split('T')[0];
        exportToCSV(data, `visa-alerts-${timestamp}.csv`);
    };

    const handleExportJSON = () => {
        const timestamp = new Date().toISOString().split('T')[0];
        exportToJSON(data, `visa-alerts-${timestamp}.json`);
    };

    return (
        <div className="export-container">
            <button
                className="btn btn-sm btn-toolbar"
                onClick={handleExportCSV}
                disabled={disabled || !data || data.length === 0}
                title="Export to CSV"
            >
                <span>📊</span>
                CSV
            </button>
            <button
                className="btn btn-sm btn-toolbar"
                onClick={handleExportJSON}
                disabled={disabled || !data || data.length === 0}
                title="Export to JSON"
            >
                <span>📄</span>
                JSON
            </button>
        </div>
    );
};

export default ExportButtons;
