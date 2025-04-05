import React, { useState } from 'react';

function EventUserAttendeeFetcher() {
  const [eventId, setEventId] = useState('');
  const [userId, setUserId] = useState('');
  const [eventAttendees, setEventAttendees] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchEventAttendees = async () => {
    try {
      const response = await fetch(`http://localhost:6008/api/attendees/event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setEventAttendees(data);
    } catch (error) {
      console.error('Error fetching event attendees:', error);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await fetch(`http://localhost:6008/api/attendees/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUserEvents(data);
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Attendee Insights</h2>

      {/* 🔍 Search by Event ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Enter Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={fetchEventAttendees}>Get Attendees by Event</button>

        {eventAttendees.length > 0 && (
          <>
            <h4 style={{ marginTop: '1rem' }}>Attendees for Event #{eventId}</h4>
            <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '0.5rem' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventAttendees.map((attendee, idx) => (
                  <tr key={idx}>
                    <td>{attendee.attendee_name}</td>
                    <td>{attendee.attendee_email}</td>
                    <td>{attendee.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* 🔍 Search by User ID */}
      <div>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={fetchUserEvents}>Get Events for User</button>

        {userEvents.length > 0 && (
          <>
            <h4 style={{ marginTop: '1rem' }}>Registered Events for User #{userId}</h4>
            <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '0.5rem' }}>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userEvents.map((event, idx) => (
                  <tr key={idx}>
                    <td>{event.event_name}</td>
                    <td>{new Date(event.event_date).toLocaleDateString()}</td>
                    <td>{event.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default EventUserAttendeeFetcher;
