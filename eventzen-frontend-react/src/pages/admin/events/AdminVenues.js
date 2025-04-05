import React, { useEffect, useState } from 'react';

function AdminVenues() {
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', capacity: '' });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchVenues = async () => {
    try {
      const res = await fetch('http://localhost:6003/api/venues', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setVenues(data);
    } catch (err) {
      console.error('Error fetching venues:', err);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:6003/api/venues/${editingId}`
      : 'http://localhost:6003/api/venues';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setForm({ name: '', location: '', capacity: '' });
        setEditingId(null);
        fetchVenues();
      } else {
        console.error('Failed to save venue');
      }
    } catch (err) {
      console.error('Error saving venue:', err);
    }
  };

  const handleEdit = (venue) => {
    setForm({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity
    });
    setEditingId(venue.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:6003/api/venues/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchVenues();
    } catch (err) {
      console.error('Error deleting venue:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Venue Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Venue Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit">
          {editingId ? 'Update Venue' : 'Add Venue'}
        </button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.id}</td>
              <td>{venue.name}</td>
              <td>{venue.location}</td>
              <td>{venue.capacity}</td>
              <td>
                <button onClick={() => handleEdit(venue)} style={{ marginRight: '0.5rem' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(venue.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminVenues;
