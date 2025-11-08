
import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import { Users, UserCheck, UserX, UserPlus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import UserDetailModal from '../components/UserDetailModal';
import UserForm from '../components/UserForm';
import { userAPI, authAPI } from '../../services/api';
import toast from 'react-hot-toast';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getAllUsers();
      setUsers(data.users);
      setPagination(data.pagination);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleOpenUserForm = (user = null) => {
    setEditingUser(user);
    setIsUserFormOpen(true);
    setSelectedUser(null);
  };

  const handleCloseUserForm = () => {
    setIsUserFormOpen(false);
    setEditingUser(null);
  };

  const handleCreateOrUpdateUser = async (userData) => {
    try {
      if (editingUser) {
        // Assuming update user role is the only editable field for now
        await userAPI.updateUserRole(editingUser.id, { role: userData.role });
        toast.success('User updated successfully!');
      } else {
        await authAPI.register(userData);
        toast.success('User created successfully!');
      }
      fetchUsers();
    } catch (err) {
      toast.error(`Failed to ${editingUser ? 'update' : 'create'} user: ${err.message}`);
    } finally {
      handleCloseUserForm();
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(userId);
        fetchUsers();
        toast.success('User deleted successfully!');
      } catch (err) {
        toast.error(`Failed to delete user: ${err.message}`);
      }
    }
  };

  const totalUsers = pagination ? pagination.total : 0;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const blockedUsers = users.filter(user => user.status === 'Blocked').length;
  // This would require a 'createdAt' field and logic to compare against the current month
  const newThisMonth = 0; 

  if (loading) return <div className="text-center py-8">Loading users...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleOpenUserForm()}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add User
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Export Users
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={<Users size={24} className="text-blue-500" />}
          title="Total Users"
          value={totalUsers}
        />
        <StatCard
          icon={<UserCheck size={24} className="text-green-500" />}
          title="Active Users"
          value={activeUsers}
        />
        <StatCard
          icon={<UserX size={24} className="text-red-500" />}
          title="Blocked Users"
          value={blockedUsers}
        />
        <StatCard
          icon={<UserPlus size={24} className="text-yellow-500" />}
          title="New This Month"
          value={newThisMonth}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>All Roles</option>
              <option>Citizen</option>
              <option>Operator</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Blocked</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>Sort by Name</option>
            <option>Sort by Created date</option>
            <option>Sort by Last active</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">
                  <input type="checkbox" />
                </th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Zone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Reports</th>
                <th className="p-3 text-left">Last Active</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 flex items-center">
                    <img
                      src={user.avatar || 'https://i.pravatar.cc/150?u=' + user.id}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <span className="font-medium">{user.fullName}</span>
                  </td>
                  <td className="p-3">
                    <div>{user.email}</div>
                    <div>{user.phone}</div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.role === 'Admin'
                          ? 'bg-red-200 text-red-800'
                          : user.role === 'Operator'
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">{user.zone || 'N/A'}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.status === 'Active'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {user.status || 'N/A'}
                    </span>
                  </td>
                  <td className="p-3">{user.reportsSubmitted || 0}</td>
                  <td className="p-3">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
                  <td className="p-3">
                    <div className="relative flex items-center space-x-2">
                      <button
                        className="p-2 rounded-full hover:bg-gray-200"
                        onClick={() => handleViewUser(user)}
                      >
                        <MoreVertical size={20} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-gray-200"
                        onClick={() => handleOpenUserForm(user)}
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-gray-200 text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserDetailModal
        user={selectedUser}
        onClose={handleCloseModal}
        onUserUpdate={fetchUsers}
        onUserDelete={fetchUsers}
      />
      {isUserFormOpen && (
        <UserForm
          user={editingUser}
          onCancel={handleCloseUserForm}
          onSubmit={handleCreateOrUpdateUser}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
