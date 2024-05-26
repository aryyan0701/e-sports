import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashNavbar from '../components/DashNavbar';

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/all');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!users.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DashNavbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-4">Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
