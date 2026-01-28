import React from 'react';
import AlertItem from './AlertItem';

const AlertList = ({ alerts, onUpdateStatus, onDelete, onEdit, onDuplicate, selectedAlerts, onSelectToggle, onSelectAll }) => {
    if (alerts.length === 0) {
        return (
            <div className="card fade-in" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>No alerts found. Create one to get started!</p>
            </div>
        );
    }

    const allSelected = alerts.length > 0 && selectedAlerts.length === alerts.length;

    return (
        <div className="card fade-in" style={{ overflowX: 'auto', padding: 0 }}>
            {/* Added table-responsive for CSS media query targeting */}
            <table className="table-responsive" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-color)' }}>
                    <tr>
                        <th style={{ padding: '1rem', width: '40px' }}>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={onSelectAll}
                                className="alert-checkbox"
                                title="Select all"
                            />
                        </th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.875rem' }}>Location</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.875rem' }}>Visa Type</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.875rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.875rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map(alert => (
                        <AlertItem
                            key={alert.id}
                            alert={alert}
                            onUpdateStatus={onUpdateStatus}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onDuplicate={onDuplicate}
                            isSelected={selectedAlerts.includes(alert.id)}
                            onSelectToggle={onSelectToggle}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlertList;
