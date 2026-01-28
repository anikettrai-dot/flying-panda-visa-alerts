const { v4: uuidv4 } = require('uuid');

const localTime = new Date().toISOString();

// In-memory data store
let alerts = [
  {
    id: uuidv4(),
    country: 'France',
    city: 'Paris',
    visaType: 'Tourist',
    status: 'Active',
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: uuidv4(),
    country: 'USA',
    city: 'New York',
    visaType: 'Business',
    status: 'Booked',
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: uuidv4(),
    country: 'Japan',
    city: 'Tokyo',
    visaType: 'Tourist',
    status: 'Expired',
    createdAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  }
];

module.exports = {
  getAlerts: () => alerts,
  addAlert: (alert) => {
    alerts.push(alert);
    return alert;
  },
  updateAlert: (id, updates) => {
    const index = alerts.findIndex(a => a.id === id);
    if (index === -1) return null;
    alerts[index] = { ...alerts[index], ...updates };
    return alerts[index];
  },
  deleteAlert: (id) => {
    const index = alerts.findIndex(a => a.id === id);
    if (index === -1) return false;
    alerts = alerts.filter(a => a.id !== id);
    return true;
  }
};
