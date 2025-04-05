import React, { useEffect, useState } from 'react';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    venueId: '',
    createdBy: '',
    cost: '',
  });
  const [editingEvent, setEditingEvent] = useState(null);

  const token = localStorage.getItem('token');

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:6004/api/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async () => {
    try {
      const response = await fetch('http://localhost:6004/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newEvent.name,
          date: newEvent.date,
          venueId: parseInt(newEvent.venueId),
          createdBy: parseInt(newEvent.createdBy),
          cost: parseFloat(newEvent.cost),
        }),
      });

      if (response.ok) {
        alert('Event created successfully!');
        setNewEvent({ name: '', date: '', venueId: '', createdBy: '', cost: '' });
        fetchEvents();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to create event.'}`);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const startEdit = (event) => {
    setEditingEvent({ ...event });
  };

  const handleEditChange = (e) => {
    setEditingEvent({
      ...editingEvent,
      [e.target.name]: e.target.value,
    });
  };

  const updateEvent = async () => {
    try {
      const response = await fetch(`http://localhost:6004/api/events/${editingEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editingEvent.name,
          date: editingEvent.date,
          venueId: parseInt(editingEvent.venueId),
          createdBy: parseInt(editingEvent.createdBy),
          cost: parseFloat(editingEvent.cost),
        }),
      });

      if (response.ok) {
        alert('Event updated successfully!');
        setEditingEvent(null);
        fetchEvents();
      } else {
        alert('Failed to update event.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`http://localhost:6004/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Event deleted.');
        fetchEvents();
      } else {
        alert('Failed to delete event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin - Manage Events</h2>

      {/* Create Event Form */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Create New Event</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="datetime-local"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Venue ID"
          value={newEvent.venueId}
          onChange={(e) => setNewEvent({ ...newEvent, venueId: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Created By"
          value={newEvent.createdBy}
          onChange={(e) => setNewEvent({ ...newEvent, createdBy: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Cost"
          value={newEvent.cost}
          onChange={(e) => setNewEvent({ ...newEvent, cost: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={createEvent}>Create</button>
      </div>

      {/* Edit Section */}
      {editingEvent && (
        <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Edit Event ID: {editingEvent.id}</h3>
          <input
            type="text"
            name="name"
            value={editingEvent.name}
            onChange={handleEditChange}
            placeholder="Event Name"
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="datetime-local"
            name="date"
            value={editingEvent.date}
            onChange={handleEditChange}
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="number"
            name="venueId"
            value={editingEvent.venueId}
            onChange={handleEditChange}
            placeholder="Venue ID"
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="number"
            name="createdBy"
            value={editingEvent.createdBy}
            onChange={handleEditChange}
            placeholder="Created By"
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="number"
            name="cost"
            value={editingEvent.cost}
            onChange={handleEditChange}
            placeholder="Cost"
            style={{ marginRight: '0.5rem' }}
          />
          <button onClick={updateEvent} style={{ marginRight: '0.5rem' }}>Save</button>
          <button onClick={() => setEditingEvent(null)}>Cancel</button>
        </div>
      )}

      {/* Events Table */}
      <h3>All Events</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Venue ID</th>
            <th>Created By</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleString()}</td>
              <td>{event.venueId}</td>
              <td>{event.createdBy}</td>
              <td>₹{event.cost}</td>
              <td>
                <button onClick={() => startEdit(event)} style={{ marginRight: '0.5rem' }}>Edit</button>
                <button onClick={() => deleteEvent(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEvents;
