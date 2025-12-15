import React, { useState, useEffect } from 'react';
import API from '../api';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await API.get('/users/getUser');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user info');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <h3><center>How's You</center></h3>
      <div className="profile-container">
        <h2 className="profile-heading"><center>Profile😊</center></h2>

        <div className="profile-card">
          {loading ? (
            <p>Loading...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : (
            <>
              <h3>Username: {user.username}</h3>
              <p>Email: {user.email}</p>
              <p>Joined: {user.createdAt ? formatDate(user.createdAt) : 'N/A'}</p>
            </>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
