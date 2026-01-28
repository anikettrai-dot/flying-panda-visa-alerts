import React from 'react';

const AlertItem = ({ alert, onUpdateStatus, onDelete, onEdit, onDuplicate, isSelected, onSelectToggle }) => {
    const getBadgeClass = (status) => {
        switch (status) {
            case 'Active': return 'badge-active';
            case 'Booked': return 'badge-booked';
            default: return 'badge-expired';
        }
    };

    return (
        <tr className="fade-in" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '1rem', width: '40px' }} data-label="">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectToggle(alert.id)}
                    className="alert-checkbox"
                />
            </td>
            <td style={{ padding: '1rem' }} data-label="Location">
                <div style={{ fontWeight: '600' }}>{alert.country}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{alert.city}</div>
            </td>
            <td style={{ padding: '1rem' }} data-label="Visa Type">{alert.visaType}</td>
            <td style={{ padding: '1rem' }} data-label="Status">
                <span className={`badge ${getBadgeClass(alert.status)}`}>
                    {alert.status}
                </span>
            </td>
            <td style={{ padding: '1rem', textAlign: 'right' }} data-label="Actions">
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', width: '100%', flexWrap: 'wrap' }}>
                    {alert.status === 'Active' && (
                        <button
                            className="btn btn-sm"
                            style={{ background: 'var(--success)', color: '#fff', border: 'none' }}
                            onClick={() => onUpdateStatus(alert.id, 'Booked')}
                            title="Mark as Booked"
                        >
                            ✓ Book
                        </button>
                    )}
                    {alert.status !== 'Expired' && (
                        <button
                            className="btn btn-sm"
                            style={{ background: 'var(--warning)', color: '#fff', border: 'none' }}
                            onClick={() => onUpdateStatus(alert.id, 'Expired')}
                            title="Mark as Expired"
                        >
                            ⏱
                        </button>
                    )}
                    <button
                        className="btn btn-sm"
                        onClick={() => onEdit && onEdit(alert)}
                        style={{ background: '#fff', border: '1px solid var(--glass-border)' }}
                        title="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        className="btn btn-sm"
                        onClick={() => onDuplicate && onDuplicate(alert)}
                        style={{ background: '#fff', border: '1px solid var(--glass-border)' }}
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
            </td>
        </tr>
    );
};

export default AlertItem;
