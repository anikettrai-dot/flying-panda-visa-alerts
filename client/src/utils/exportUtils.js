// Export utility functions for CSV and JSON downloads

export const exportToCSV = (data, filename = 'visa-alerts.csv') => {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }

    // Define CSV headers
    const headers = ['Country', 'City', 'Visa Type', 'Status', 'Created Date'];

    // Convert data to CSV rows
    const rows = data.map(alert => [
        alert.country,
        alert.city,
        alert.visaType,
        alert.status,
        new Date(alert.createdAt).toLocaleString()
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToJSON = (data, filename = 'visa-alerts.json') => {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }

    // Create formatted JSON
    const jsonContent = JSON.stringify(data, null, 2);

    // Create and trigger download
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
