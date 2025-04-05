import React, { useState } from 'react';

function ManageBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleRetrieveBookings = async () => {
    if (!email) {
      alert('Please enter an email');
      return;
    }

    try {
      const response = await fetch(`http://localhost:6007/api/bookings/${email}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to retrieve bookings.');
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBookingId) {
      alert('Please select a booking to delete');
      return;
    }

    try {
      const response = await fetch(`http://localhost:6007/api/bookings/${selectedBookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Booking deletion requested (pending approval)');
        handleRetrieveBookings(); // Refresh bookings
      } else {
        alert('Failed to delete booking.');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Manage Your Bookings</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleRetrieveBookings} style={{ marginRight: '1rem' }}>
          Retrieve Bookings
        </button>
        <button onClick={handleDeleteBooking}>
          Delete Selected Booking
        </button>
      </div>

      {bookings.length > 0 && (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Event Name</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <input
                    type="radio"
                    name="selectedBooking"
                    onChange={() => setSelectedBookingId(booking.id)}
                  />
                </td>
                <td>{booking.event_name}</td>
                <td>{booking.venue_name}</td>
                <td>{new Date(booking.event_date).toLocaleDateString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageBookings;
