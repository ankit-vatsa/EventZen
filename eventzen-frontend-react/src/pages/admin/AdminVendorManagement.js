import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:6006';

const AdminVendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', serviceType: '', contactInfo: '' });
  const [editingId, setEditingId] = useState(null);

  const [eventIdForLinked, setEventIdForLinked] = useState('');
  const [linkedVendors, setLinkedVendors] = useState([]);

  const [linkForm, setLinkForm] = useState({ eventId: '', vendorId: '' });

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/vendors`);
      setVendors(response.data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${baseURL}/api/vendors/${editingId}`, {
          ...form,
          id: editingId.toString(),
        });
      } else {
        await axios.post(`${baseURL}/api/vendors`, form);
      }
      setForm({ id: '', name: '', serviceType: '', contactInfo: '' });
      setEditingId(null);
      fetchVendors();
    } catch (err) {
      console.error('Error saving vendor:', err);
    }
  };

  const handleEdit = (vendor) => {
    setForm({
      id: vendor.id.toString(),
      name: vendor.name,
      serviceType: vendor.serviceType,
      contactInfo: vendor.contactInfo,
    });
    setEditingId(vendor.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/vendors/${id}`);
      fetchVendors();
    } catch (err) {
      console.error('Error deleting vendor:', err);
    }
  };

  const fetchLinkedVendors = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/event-vendors/${eventIdForLinked}`);
      setLinkedVendors(response.data);
    } catch (err) {
      console.error('Error fetching linked vendors:', err);
      setLinkedVendors([]);
    }
  };

  const handleLinkChange = (e) => {
    setLinkForm({ ...linkForm, [e.target.name]: e.target.value });
  };

  const handleLinkSubmit = async () => {
    try {
      await axios.post(`${baseURL}/api/event-vendors`, {
        vendorId: parseInt(linkForm.vendorId),
        eventId: parseInt(linkForm.eventId),
      });
      setLinkForm({ eventId: '', vendorId: '' });
      if (eventIdForLinked === linkForm.eventId) {
        fetchLinkedVendors(); // refresh if same event is selected
      }
    } catch (err) {
      console.error('Error linking vendor to event:', err);
    }
  };

  const handleUnlinkVendor = async (eventId, vendorId) => {
    try {
      await axios.delete(`${baseURL}/api/event-vendors/${eventId}/${vendorId}`);
      fetchLinkedVendors();
    } catch (err) {
      console.error('Error unlinking vendor:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎯 Vendor Management</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={form.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="serviceType"
          placeholder="Service Type"
          value={form.serviceType}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={form.contactInfo}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'} Vendor</button>
      </div>

      <h3>📦 All Vendors</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Service Type</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.name}</td>
              <td>{vendor.serviceType}</td>
              <td>{vendor.contactInfo}</td>
              <td>
                <button onClick={() => handleEdit(vendor)}>Edit</button>{' '}
                <button onClick={() => handleDelete(vendor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ margin: '40px 0' }} />

      <h2>🔗 Link Vendor to Event</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="number"
          name="eventId"
          placeholder="Event ID"
          value={linkForm.eventId}
          onChange={handleLinkChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          name="vendorId"
          placeholder="Vendor ID"
          value={linkForm.vendorId}
          onChange={handleLinkChange}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleLinkSubmit}>Link Vendor</button>
      </div>

      <h2>🔍 View & Unlink Linked Vendors</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter Event ID"
          value={eventIdForLinked}
          onChange={(e) => setEventIdForLinked(e.target.value)}
        />
        <button onClick={fetchLinkedVendors}>Fetch Linked Vendors</button>
      </div>

      {linkedVendors.length > 0 ? (
        <table border="1" cellPadding="8" style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Service Type</th>
              <th>Contact Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {linkedVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.name}</td>
                <td>{vendor.serviceType}</td>
                <td>{vendor.contactInfo}</td>
                <td>
                  <button onClick={() => handleUnlinkVendor(eventIdForLinked, vendor.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No linked vendors found.</p>
      )}
    </div>
  );
};

export default AdminVendorManagement;
