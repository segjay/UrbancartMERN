import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';            
import { useNavigate } from 'react-router-dom';

function AdminUsers() {
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) { navigate('/'); return; }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.message === 'User removed') {
        setUsers(users.filter((u) => u._id !== id));
      } else {
        alert(data.message);
      }
    } catch {
      alert('Something went wrong');
    }
  };

  if (loading) return <p className="p-8 text-purple-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Users</h2>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm">Name</th>
              <th className="px-4 py-3 text-left text-sm">Email</th>
              <th className="px-4 py-3 text-left text-sm">Role</th>
              <th className="px-4 py-3 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm text-gray-700">{u.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                    {u.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {!u.isAdmin && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;