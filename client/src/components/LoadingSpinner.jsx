import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'var(--accent-primary)' }) => {
    const sizes = {
        small: '16px',
        medium: '24px',
        large: '40px'
    };

    return (
        <div
            className="loading-spinner"
            style={{
                width: sizes[size],
                height: sizes[size],
                borderColor: `${color} transparent ${color} transparent`
            }}
            role="status"
            aria-label="Loading"
        />
    );
};

export default LoadingSpinner;
