import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import UsersList from '../../components/UsersList/UsersList';

const Users = () => {
  const [USERS, setUsers] = useState([]);

  const { user } = useSelector((state) => state.authReducer);
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth');
      const data = await response.json();
      if (user.id) {
        const usersWithoutLoged = data.users.filter((el) => el._id !== user.id);
        setUsers(usersWithoutLoged);
        return;
      }
      setUsers(data.users);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return <UsersList items={USERS} />;
};

export default Users;
