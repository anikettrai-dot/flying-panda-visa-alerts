import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-desc">
                <div className="modal-header">
                    <h3 id="modal-title" className="modal-title">{title}</h3>
                    <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
                </div>
                <div className="modal-body">
                    <p id="modal-desc" className="modal-message">{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={onClose} style={{ background: '#fff', border: '1px solid var(--glass-border)' }}>
                        {cancelText}
                    </button>
                    <button
                        className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                        onClick={onConfirm}
                        autoFocus
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
