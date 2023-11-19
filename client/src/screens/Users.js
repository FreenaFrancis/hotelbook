import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get('http://localhost:5000/api/users/getallusers'); // Removed unnecessary await and data
        setUsers(data.data); // Extract data from the response
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>UserId</th>
              <th>Name</th>
              <th>Email</th>
              <th>IsAdmin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {/* <td>{user._id}</td> */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td> {/* Corrected to 'Yes' and 'No' */}
              </tr>
            ))}
          </tbody>
        </table>
        {error && <Error error={error} />}
      </div>
    </div>
  );
}

export default Users;
