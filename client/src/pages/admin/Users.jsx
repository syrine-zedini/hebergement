// File: src/pages/admin/Users.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fake fetch: replace with real API
    setUsers([
      { id: 1, name: "Alice", email: "alice@email.com" },
      { id: 2, name: "Bob", email: "bob@email.com" },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!form.name || !form.email) return;
    setUsers([
      ...users,
      { id: Date.now(), name: form.name, email: form.email },
    ]);
    setForm({ name: "", email: "" });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email });
  };

  const handleUpdateUser = () => {
    setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...form } : u));
    setEditingUser(null);
    setForm({ name: "", email: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion des utilisateurs</h1>

      {/* Form */}
      <div className="bg-white dark:bg-white/10 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          {editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Nom"
            className="p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          onClick={editingUser ? handleUpdateUser : handleAddUser}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
        >
          <Plus size={16} />
          {editingUser ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>

      {/* User List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white">
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white dark:bg-white/5 border-b dark:border-gray-800"
              >
                <td className="p-3 text-gray-700 dark:text-white">{user.name}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{user.email}</td>
                <td className="p-3 flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
