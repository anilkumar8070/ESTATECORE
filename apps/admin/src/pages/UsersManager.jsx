import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, UserCheck, UserX, Search } from 'lucide-react';
import api from '../api';

const UsersManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const toggleStatus = async (user) => {
    try {
      const newStatus = user.isActive ? false : true;
      const { data } = await api.put(`/users/${user._id}`, { isActive: newStatus });
      setUsers(users.map(u => u._id === user._id ? data : u));
    } catch (error) {
      console.error('Failed to update user status', error);
    }
  };

  const changeRole = async (user, newRole) => {
    try {
      const { data } = await api.put(`/users/${user._id}`, { role: newRole });
      setUsers(users.map(u => u._id === user._id ? data : u));
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Manager</h1>
          <p className="text-gray-500 mt-1">Manage platform users, roles, and account statuses.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="relative w-72">
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-accent text-gray-600 text-sm border-b border-gray-100">
              <th className="py-4 px-6 font-medium">User</th>
              <th className="py-4 px-6 font-medium">Role</th>
              <th className="py-4 px-6 font-medium">Joined Date</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-prime text-gold flex items-center justify-center font-bold mr-3">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <select 
                    value={user.role}
                    onChange={(e) => changeRole(user, e.target.value)}
                    className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-gold capitalize"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-4 px-6 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center ${
                    user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.isActive ? <UserCheck size={12} className="mr-1" /> : <UserX size={12} className="mr-1" />}
                    {user.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button 
                    onClick={() => toggleStatus(user)} 
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center inline-flex ${
                      user.isActive 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {user.isActive ? (
                      <><ShieldAlert size={14} className="mr-1" /> Suspend</>
                    ) : (
                      <><Shield size={14} className="mr-1" /> Activate</>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManager;
