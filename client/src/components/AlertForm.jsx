import React, { useState } from 'react';
import { validateAlert } from '../utils/validation';
import LoadingSpinner from './LoadingSpinner';

const AlertForm = ({ onSubmit, isSubmitting = false }) => {
    const [formData, setFormData] = useState({
        country: '',
        city: '',
        visaType: 'Tourist'
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });

        // Validate single field on blur
        const validation = validateAlert(formData);
        if (validation.errors[name]) {
            setErrors({ ...errors, [name]: validation.errors[name] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const validation = validateAlert(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            setTouched({ country: true, city: true, visaType: true });
            return;
        }

        await onSubmit(formData);
        setFormData({ country: '', city: '', visaType: 'Tourist' });
        setErrors({});
        setTouched({});
    };

    return (
        <div className="card fade-in" style={{ marginBottom: '3rem', padding: '3rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.8rem' }}>
                Create New Alert
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                        Country <span style={{ color: 'var(--danger)' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. France"
                        className={touched.country && errors.country ? 'input-error' : ''}
                        style={{ width: '100%' }}
                        aria-label="Country"
                        aria-invalid={touched.country && errors.country ? 'true' : 'false'}
                    />
                    {touched.country && errors.country && (
                        <span className="error-message" role="alert">{errors.country}</span>
                    )}
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        City <span style={{ color: 'var(--danger)' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Paris"
                        className={touched.city && errors.city ? 'input-error' : ''}
                        style={{ width: '100%' }}
                        aria-label="City"
                        aria-invalid={touched.city && errors.city ? 'true' : 'false'}
                    />
                    {touched.city && errors.city && (
                        <span className="error-message" role="alert">{errors.city}</span>
                    )}
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Visa Type <span style={{ color: 'var(--danger)' }}>*</span>
                    </label>
                    <select
                        name="visaType"
                        value={formData.visaType}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                        aria-label="Visa Type"
                    >
                        <option value="Tourist">Tourist</option>
                        <option value="Business">Business</option>
                        <option value="Student">Student</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
                >
                    {isSubmitting ? (
                        <>
                            <LoadingSpinner size="small" color="#fff" />
                            Creating...
                        </>
                    ) : (
                        '+ Create Alert'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AlertForm;
