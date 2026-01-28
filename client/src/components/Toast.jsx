import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <span>{message}</span>
            <button
                onClick={onClose}
                style={{ background: 'transparent', color: 'inherit', marginLeft: '1rem', fontSize: '1.2rem' }}
            >
                &times;
            </button>
        </div>
    );
};

export default Toast;
