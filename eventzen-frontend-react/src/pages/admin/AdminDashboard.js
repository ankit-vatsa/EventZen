import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/admin/users')} style={buttonStyle}>
          Manage Users
        </button>
        <button onClick={() => navigate('/admin/events')} style={buttonStyle}>
          Manage Events
        </button>
        <button onClick={() => navigate('/admin/venues')} style={buttonStyle}>
          Manage Venues
        </button>
        <button onClick={() => navigate('/admin/vendors')} style={buttonStyle}>
          Manage Vendors
        </button>
        <button onClick={() => navigate('/admin/attendees')} style={buttonStyle}>
          Manage Attendees
        </button>
        <button onClick={() => navigate('/admin/attendeesevent')} style={buttonStyle}>
          Attendees by Single
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #007bff',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  minWidth: '200px',
};

export default AdminDashboard;
