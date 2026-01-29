import React, { useState, useEffect, useMemo, useRef } from 'react';
import AlertForm from './components/AlertForm';
import AlertList from './components/AlertList';
import GridView from './components/GridView';
import FilterBar from './components/FilterBar';
import StatsDashboard from './components/StatsDashboard';
import Pagination from './components/Pagination';
import Toast from './components/Toast';
import ActionToolbar from './components/ActionToolbar';
import ConfirmModal from './components/ConfirmModal';
import EmptyState from './components/EmptyState';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import { setupKeyboardShortcuts } from './utils/keyboard';

// Robust API URL handling
const getApiUrl = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/alerts';
  // Ensure it's a full URL
  if (url && !url.startsWith('http')) {
    url = `https://${url}`;
  }
  return url;
};

const API_URL = getApiUrl();

function App() {
  console.log('Checking API connection at:', API_URL);

  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, booked: 0, expired: 0 });
  const [filter, setFilter] = useState({ country: '', status: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New features state
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  // Production features state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: null, data: null });

  // Refs for keyboard shortcuts
  const searchInputRef = useRef(null);
  const formRef = useRef(null);

  // Toast State
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
  };

  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const removeToast = (id) => {
    setToasts(toasts.filter(t => t.id !== id));
  };

  useEffect(() => {
    fetchAlerts();
    fetchStats();
  }, [filter, page]);

  // Setup Keyboard Shortcuts
  useEffect(() => {
    const cleanup = setupKeyboardShortcuts({
      onSearch: () => searchInputRef.current?.focus(),
      onNew: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Optionally focus country input if we add a ref to it
      },
      onEscape: () => {
        setSearchQuery('');
        setConfirmModal({ isOpen: false, action: null, data: null });
      }
    });
    return cleanup;
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filter.country) params.append('country', filter.country);
      if (filter.status) params.append('status', filter.status);
      params.append('page', page);
      params.append('limit', 5);

      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();

      // Handle the new structure { data, total, page, totalPages }
      // But we need to support the old array structure if backend didn't update hot-swapped correctly yet?
      // No, we updated backend.

      if (data.data) {
        setAlerts(data.data);
        setTotalPages(data.totalPages);
      } else {
        // Fallback
        setAlerts(data);
      }
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const addAlert = async (alertData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData),
      });
      if (!response.ok) throw new Error('Failed to create alert');
      addToast('Alert created successfully!');
      setPage(1); // Reset to first page
      await fetchAlerts();
      await fetchStats();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      addToast(`Alert marked as ${status}`);
      await fetchAlerts();
      await fetchStats();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const deleteAlert = (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Alert',
      message: 'Are you sure you want to delete this alert? This action cannot be undone.',
      confirmText: 'Delete',
      type: 'danger',
      action: async () => {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete alert');
          addToast('Alert deleted', 'success');
          await fetchAlerts();
          await fetchStats();
        } catch (err) {
          addToast(err.message, 'error');
        }
      }
    });
  };

  // Filter alerts based on search query
  const filteredAlerts = useMemo(() => {
    if (!searchQuery) return alerts;
    const query = searchQuery.toLowerCase();
    return alerts.filter(alert =>
      alert.country.toLowerCase().includes(query) ||
      alert.city.toLowerCase().includes(query) ||
      alert.visaType.toLowerCase().includes(query) ||
      alert.status.toLowerCase().includes(query)
    );
  }, [alerts, searchQuery]);

  // Selection handlers
  const handleSelectToggle = (alertId) => {
    setSelectedAlerts(prev =>
      prev.includes(alertId)
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAlerts.length === filteredAlerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(filteredAlerts.map(a => a.id));
    }
  };

  // Bulk action handlers
  const handleBulkDelete = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Multiple Alerts',
      message: `Are you sure you want to delete ${selectedAlerts.length} selected alerts? This action cannot be undone.`,
      confirmText: 'Delete All',
      type: 'danger',
      action: async () => {
        try {
          await Promise.all(
            selectedAlerts.map(id =>
              fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            )
          );
          addToast(`Deleted ${selectedAlerts.length} alerts`, 'success');
          setSelectedAlerts([]);
          await fetchAlerts();
          await fetchStats();
        } catch (err) {
          addToast(err.message, 'error');
        }
      }
    });
  };

  const handleBulkStatusChange = async (newStatus) => {
    try {
      await Promise.all(
        selectedAlerts.map(id =>
          fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          })
        )
      );
      addToast(`Updated ${selectedAlerts.length} alerts to ${newStatus}`, 'success');
      setSelectedAlerts([]);
      await fetchAlerts();
      await fetchStats();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Edit handler (could open a modal in future)
  const handleEdit = (alert) => {
    addToast('Edit feature - Coming soon!', 'success');
    console.log('Edit alert:', alert);
  };

  // Duplicate handler
  const handleDuplicate = async (alert) => {
    const duplicateData = {
      country: alert.country,
      city: alert.city,
      visaType: alert.visaType
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicateData),
      });
      if (!response.ok) throw new Error('Failed to duplicate alert');
      addToast('Alert duplicated successfully!');
      await fetchAlerts();
      await fetchStats();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <header style={{ marginBottom: '3rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Flying Panda Visa Alerts
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track and manage your visa slots efficiently.</p>
      </header>

      <main>
        <StatsDashboard alerts={stats} />

        <AlertForm onSubmit={addAlert} isSubmitting={isSubmitting} />

        <div style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>All Alerts</h2>
          </div>

          <ActionToolbar
            ref={searchInputRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            alerts={filteredAlerts}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedCount={selectedAlerts.length}
            onBulkDelete={handleBulkDelete}
            onBulkStatusChange={handleBulkStatusChange}
          />

          <FilterBar filter={filter} setFilter={(f) => { setFilter(f); setPage(1); setSearchQuery(''); }} />

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block' }}>
                <LoadingSpinner size="large" />
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading your alerts...</p>
              </div>
            </div>
          ) : error ? (
            <div className="card" style={{ color: 'var(--danger)', textAlign: 'center', padding: '3rem', border: '1px solid var(--danger)' }}>
              <p style={{ marginBottom: '1rem' }}>Failed to load alerts: {error}</p>
              <button className="btn btn-primary" onClick={() => fetchAlerts()}>Retry</button>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <EmptyState
              title={searchQuery || filter.country || filter.status ? "No matching alerts found" : "No alerts yet"}
              message={searchQuery || filter.country || filter.status ? "Try adjusting your search or filters to find what you're looking for." : "Start tracking visa slots by creating your first alert above!"}
              icon={searchQuery || filter.country || filter.status ? "🔍" : "🐼"}
              actionText={searchQuery || filter.country || filter.status ? "Clear all filters" : "Create first alert"}
              onAction={() => {
                if (searchQuery || filter.country || filter.status) {
                  setFilter({ country: '', status: '' });
                  setSearchQuery('');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          ) : (
            <>
              {viewMode === 'table' ? (
                <AlertList
                  alerts={filteredAlerts}
                  onUpdateStatus={updateStatus}
                  onDelete={deleteAlert}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  selectedAlerts={selectedAlerts}
                  onSelectToggle={handleSelectToggle}
                  onSelectAll={handleSelectAll}
                />
              ) : (
                <GridView
                  alerts={filteredAlerts}
                  onUpdateStatus={updateStatus}
                  onDelete={deleteAlert}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  selectedAlerts={selectedAlerts}
                  onSelectAlert={handleSelectToggle}
                />
              )}
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </main>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={async () => {
          if (confirmModal.action) {
            await confirmModal.action();
          }
          setConfirmModal({ isOpen: false, action: null, data: null });
        }}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        type={confirmModal.type}
      />
    </div>
  );
}

export default App;
