import React, { useEffect, useState } from 'react';

function CustomerProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ name: '', email: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // user management module fetching 
        const response = await fetch('http://localhost:6002/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.user;
          setProfile(userData);
          setUpdatedProfile({ name: userData.name, email: userData.email });
        } else {
          console.error('Failed to fetch profile.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:6002/api/user/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        alert('Profile update request submitted.');
        setEditMode(false);
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginTop: '1rem',
    display: 'block',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.6rem',
    margin: '0.4rem 0 1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    marginRight: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Profile Management</h2>

      {profile ? (
        <div>
          {editMode ? (
            <>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                value={updatedProfile.name}
                onChange={handleChange}
                style={inputStyle}
              />

              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={updatedProfile.email}
                onChange={handleChange}
                style={inputStyle}
              />

              <div style={{ textAlign: 'center' }}>
                <button onClick={handleUpdate} style={buttonStyle}>Submit</button>
                <button onClick={() => setEditMode(false)} style={cancelButtonStyle}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p>
                <strong>Pending Changes:</strong>{' '}
                {profile.pending_profile_changes
                  ? JSON.stringify(profile.pending_profile_changes)
                  : 'None'}
              </p>
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button onClick={() => setEditMode(true)} style={buttonStyle}>
                  Request Profile Update
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default CustomerProfile;
