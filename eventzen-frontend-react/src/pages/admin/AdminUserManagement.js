import React, { useEffect, useState } from 'react';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [roleUpdates, setRoleUpdates] = useState({});

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:6002/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleProfileApproval = async (userId, approve) => {
    const endpoint = approve
      ? `http://localhost:6002/api/admin/profile/approve/${userId}`
      : `http://localhost:6002/api/admin/profile/reject/${userId}`;

    try {
      await fetch(endpoint, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleRoleChange = async (userId) => {
    const newRole = roleUpdates[userId];
    if (!newRole) return;

    try {
      await fetch(`http://localhost:6002/api/admin/user/role/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      setRoleUpdates((prev) => ({ ...prev, [userId]: '' }));
      fetchUsers();
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin – User Management</h2>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
  <tr>
    <th style={thStyle}>ID</th>
    <th style={thStyle}>Name</th>
    <th style={thStyle}>Email</th>
    <th style={thStyle}>Role</th>
    <th style={thStyle}>Pending Profile Changes</th>
    <th style={thStyle}>Actions</th>
  </tr>
</thead>
<tbody>
  {users.map((user) => (
    <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
      <td style={tdStyle}>{user.id}</td> {/* ✅ ID column added */}
      <td style={tdStyle}>{user.name}</td>
      <td style={tdStyle}>{user.email}</td>
      <td style={tdStyle}>
        <select
          value={roleUpdates[user.id] || user.role}
          onChange={(e) =>
            setRoleUpdates({ ...roleUpdates, [user.id]: e.target.value })
          }
        >
          <option value="admin">admin</option>
          <option value="customer">customer</option>
        </select>
        <button onClick={() => handleRoleChange(user.id)} style={smallBtn}>
          Update
        </button>
      </td>
      <td style={tdStyle}>
        {user.pending_profile_changes ? (
          <pre style={{ backgroundColor: '#f9f9f9', padding: '5px' }}>
            {JSON.stringify(user.pending_profile_changes, null, 2)}
          </pre>
        ) : (
          'None'
        )}
      </td>
      <td style={tdStyle}>
        {user.pending_profile_changes && (
          <>
            <button
              onClick={() => handleProfileApproval(user.id, true)}
              style={{ ...btn, backgroundColor: 'green' }}
            >
              Approve
            </button>
            <button
              onClick={() => handleProfileApproval(user.id, false)}
              style={{ ...btn, backgroundColor: 'crimson' }}
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

const thStyle = {
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '10px',
  verticalAlign: 'top',
};

const btn = {
  padding: '6px 10px',
  color: 'white',
  border: 'none',
  margin: '4px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const smallBtn = {
  padding: '4px 8px',
  marginLeft: '6px',
  fontSize: '12px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AdminUserManagement;
