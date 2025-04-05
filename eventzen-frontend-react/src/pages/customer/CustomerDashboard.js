import React from 'react';

function CustomerDashboard() {
  const userEmail = localStorage.getItem('userEmail') || 'Guest';

  const buttonStyle = {
    margin: '0 10px',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem'
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem'
  };

  return (
    <div style={containerStyle}>
      <h2>Welcome, {userEmail}!</h2>
      <div style={buttonGroupStyle}>
        <button style={buttonStyle} onClick={() => window.location.href = '/customer/events'}>
          View Events
        </button>
        <button style={buttonStyle} onClick={() => window.location.href = '/customer/book'}>
          Book a Seat
        </button>
        <button style={buttonStyle} onClick={() => window.location.href = '/customer/bookings'}>
          Manage Bookings
        </button>
        <button style={buttonStyle} onClick={() => window.location.href = '/customer/profile'}>
          Profile Management
        </button>
      </div>
    </div>
  );
}

export default CustomerDashboard;
