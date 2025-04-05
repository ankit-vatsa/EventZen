import React, { useState } from 'react';

function CustomerBooking() {
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [venueName, setVenueName] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      email,
      eventName,
      venueName,
    };

    try {
      const response = await fetch('http://localhost:6007/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('✅ Booking request submitted successfully!');
      } else {
        setMessage(result.message || '❌ Failed to submit booking.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('❌ Error occurred while submitting booking.');
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  };

  const messageStyle = {
    marginTop: '1rem',
    textAlign: 'center',
    color: message.includes('successfully') ? 'green' : 'red',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Create a Booking</h2>
      <form onSubmit={handleBooking}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Venue Name"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Book Now</button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
}

export default CustomerBooking;
