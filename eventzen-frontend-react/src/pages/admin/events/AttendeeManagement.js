import React, { useEffect, useState } from 'react';

function AttendeeManagement() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token') || '';

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:6008/api/attendees/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const approveBooking = async (bookingId) => {
    try {
      await fetch(`http://localhost:6008/api/attendees/approve/${bookingId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBookings();
    } catch (err) {
      console.error('Error approving booking:', err);
    }
  };

  const removeAttendee = async (userId, eventId) => {
    try {
      await fetch(`http://localhost:6008/api/attendees/remove/${userId}/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBookings();
    } catch (err) {
      console.error('Error removing attendee:', err);
    }
  };

  const approveAll = async () => {
    try {
      await fetch('http://localhost:6008/api/attendees/approve-all', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBookings();
    } catch (err) {
      console.error('Error approving all:', err);
    }
  };

  const rejectAll = async () => {
    try {
      await fetch('http://localhost:6008/api/attendees/reject-all', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBookings();
    } catch (err) {
      console.error('Error rejecting all:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Attendee Management</h2>

      <div style={{ margin: '1rem 0' }}>
        <button onClick={approveAll} style={{ marginRight: '1rem' }}>Approve All</button>
        <button onClick={rejectAll}>Reject All</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Attendee Name</th>
            <th>Attendee Email</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Venue</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.booking_id}>
              <td>{b.booking_id}</td>
              <td>{b.attendee_name}</td>
              <td>{b.attendee_email}</td>
              <td>{b.event_name}</td>
              <td>{new Date(b.event_date).toLocaleDateString()}</td>
              <td>{b.venue_name}</td>
              <td>{b.venue_location}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => approveBooking(b.booking_id)} style={{ marginRight: '0.5rem' }}>
                  Approve
                </button>
                <button onClick={() => removeAttendee(b.user_id, b.event_id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default AttendeeManagement;
