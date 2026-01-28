import React from 'react';

const GridView = ({ alerts, onUpdateStatus, onDelete, onEdit, onDuplicate, selectedAlerts, onSelectAlert }) => {
    if (alerts.length === 0) {
        return (
            <div className="card fade-in" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>No alerts found. Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid-view fade-in">
            {alerts.map(alert => (
                <div key={alert.id} className="grid-card card">
                    <div className="grid-card-header">
                        <input
                            type="checkbox"
                            checked={selectedAlerts.includes(alert.id)}
                            onChange={() => onSelectAlert(alert.id)}
                            className="alert-checkbox"
                        />
                        <span className={`badge badge-${alert.status.toLowerCase()}`}>
                            {alert.status}
                        </span>
                    </div>

                    <div className="grid-card-body">
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '0.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            {alert.country}
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '0.75rem',
                            fontSize: '0.9rem'
                        }}>
                            📍 {alert.city}
                        </p>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem'
                        }}>
                            <strong>Type:</strong> {alert.visaType}
                        </p>
                    </div>

                    <div className="grid-card-actions">
                        {alert.status === 'active' && (
                            <button
                                className="btn btn-sm"
                                onClick={() => onUpdateStatus(alert.id, 'booked')}
                                style={{
                                    background: 'var(--success)',
                                    color: '#fff',
                                    border: 'none',
                                    flex: 1
                                }}
                                title="Mark as Booked"
                            >
                                ✓ Book
                            </button>
                        )}
                        {alert.status === 'booked' && (
                            <button
                                className="btn btn-sm"
                                onClick={() => onUpdateStatus(alert.id, 'expired')}
                                style={{
                                    background: 'var(--warning)',
                                    color: '#fff',
                                    border: 'none',
                                    flex: 1
                                }}
                                title="Mark as Expired"
                            >
                                ⏱ Expire
                            </button>
                        )}
                        <button
                            className="btn btn-sm"
                            onClick={() => onEdit && onEdit(alert)}
                            style={{
                                background: '#fff',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-primary)'
                            }}
                            title="Edit"
                        >
                            ✏️
                        </button>
                        <button
                            className="btn btn-sm"
                            onClick={() => onDuplicate && onDuplicate(alert)}
                            style={{
                                background: '#fff',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-primary)'
                            }}
                            title="Duplicate"
                        >
                            📋
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => onDelete(alert.id)}
                            title="Delete"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GridView;
