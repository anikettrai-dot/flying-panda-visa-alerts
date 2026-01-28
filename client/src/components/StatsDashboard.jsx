import React from 'react';

const StatsDashboard = ({ alerts }) => {
    // We can't calculate full stats easily if we only have paginated data on the frontend. 
    // Ideally, the backend should return stats. 
    // However, for this UI polish, let's create a visual component that *would* receive stats, 
    // or we can request a separate 'all' fetch for stats if we want to be 100% accurate, 
    // OR we just calculate based on the current view (which is misleading),
    // OR we update the backend to return stats in the metadata.

    // Let's assume for now we will pass 'total' counts from the backend metadata later,
    // but to prevent complexity explosion in this turn, I'll update the backend to returning overall stats 
    // or just use this component to display what we have if the user loads all.

    // WAIT: PROPOSAL. 
    // Let's make this a "Summary of Current View" or handle the stats in the Controller response (best).
    // Current step is just creating the file. I'll make it presentational.

    return (
        <div className="stats-grid fade-in">
            <div className="stat-card">
                <h3>Total Alerts</h3>
                <p className="stat-value">{alerts.total || 0}</p>
            </div>
            <div className="stat-card">
                <h3>Active</h3>
                <p className="stat-value text-accent">{alerts.active || '-'}</p>
            </div>
            <div className="stat-card">
                <h3>Booked</h3>
                <p className="stat-value text-success">{alerts.booked || '-'}</p>
            </div>
        </div>
    );
};

export default StatsDashboard;
