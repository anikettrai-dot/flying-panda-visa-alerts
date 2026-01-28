const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

// Validations
const VALID_VISA_TYPES = ['Tourist', 'Business', 'Student'];
const VALID_STATUSES = ['Active', 'Booked', 'Expired'];

exports.getAlerts = (req, res, next) => {
    try {
        let alerts = store.getAlerts();
        const { country, status } = req.query;

        if (country) {
            alerts = alerts.filter(a => a.country.toLowerCase().includes(country.toLowerCase()));
        }
        if (status) {
            alerts = alerts.filter(a => a.status.toLowerCase() === status.toLowerCase());
        }

        // Sort by createdAt desc
        alerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const total = alerts.length;
        const paginatedAlerts = alerts.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            count: paginatedAlerts.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: paginatedAlerts
        });
    } catch (error) {
        next(error);
    }
};

exports.createAlert = (req, res, next) => {
    try {
        const { country, city, visaType, status } = req.body;

        // Basic Validation
        if (!country || !city || !visaType) {
            const error = new Error('Missing required fields: country, city, visaType');
            error.statusCode = 400;
            throw error;
        }

        if (!VALID_VISA_TYPES.includes(visaType)) {
            const error = new Error(`Invalid visaType. Allowed: ${VALID_VISA_TYPES.join(', ')}`);
            error.statusCode = 400;
            throw error;
        }

        const newAlert = {
            id: uuidv4(),
            country,
            city,
            visaType,
            status: status && VALID_STATUSES.includes(status) ? status : 'Active',
            createdAt: new Date().toISOString()
        };

        const created = store.addAlert(newAlert);
        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
};

exports.updateAlert = (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Prevent updating id or createdAt
        delete updates.id;
        delete updates.createdAt;

        if (updates.status && !VALID_STATUSES.includes(updates.status)) {
            const error = new Error(`Invalid status. Allowed: ${VALID_STATUSES.join(', ')}`);
            error.statusCode = 400;
            throw error;
        }

        if (updates.visaType && !VALID_VISA_TYPES.includes(updates.visaType)) {
            const error = new Error(`Invalid visaType. Allowed: ${VALID_VISA_TYPES.join(', ')}`);
            error.statusCode = 400;
            throw error;
        }

        const updatedAlert = store.updateAlert(id, updates);

        if (!updatedAlert) {
            const error = new Error('Alert not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(updatedAlert);
    } catch (error) {
        next(error);
    }
};

exports.deleteAlert = (req, res, next) => {
    try {
        const { id } = req.params;
        const success = store.deleteAlert(id);

        if (!success) {
            const error = new Error('Alert not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(204).send(); // No content
    } catch (error) {
        next(error);
    }
};

exports.getStats = (req, res, next) => {
    try {
        const alerts = store.getAlerts();
        const stats = {
            total: alerts.length,
            active: alerts.filter(a => a.status === 'Active').length,
            booked: alerts.filter(a => a.status === 'Booked').length,
            expired: alerts.filter(a => a.status === 'Expired').length
        };
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};
