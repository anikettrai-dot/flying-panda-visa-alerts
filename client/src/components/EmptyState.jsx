import React from 'react';

const EmptyState = ({ icon = '📋', title, message, actionText, onAction }) => {
    return (
        <div className="empty-state card">
            <div className="empty-state-icon">{icon}</div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-message">{message}</p>
            {actionText && onAction && (
                <button className="btn btn-primary" onClick={onAction} style={{ marginTop: '1rem' }}>
                    {actionText}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
