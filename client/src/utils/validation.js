// Form validation utilities

export const validateAlert = (formData) => {
    const errors = {};

    // Country validation
    if (!formData.country || formData.country.trim() === '') {
        errors.country = 'Country is required';
    } else if (formData.country.trim().length < 2) {
        errors.country = 'Country name must be at least 2 characters';
    }

    // City validation
    if (!formData.city || formData.city.trim() === '') {
        errors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
        errors.city = 'City name must be at least 2 characters';
    }

    // Visa type validation
    if (!formData.visaType || formData.visaType.trim() === '') {
        errors.visaType = 'Visa type is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
