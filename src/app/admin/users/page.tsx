"use client";

import * as React from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Shield, User, Store, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Manage Users</h1>
        <p className="mt-1 text-[#64748b]">View and manage all registered users on the platform.</p>
      </div>

      <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f9fc] text-[#64748b]">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#f8f9fc]">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1a1a2e]">{u.name || "Unknown"}</div>
                    <div className="text-[#64748b]">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {u.role === "ADMIN" && <Shield className="h-4 w-4 text-purple-500" />}
                      {u.role === "DESIGNER" && <Store className="h-4 w-4 text-[#e94560]" />}
                      {u.role === "BUYER" && <User className="h-4 w-4 text-blue-500" />}
                      <select
                        value={u.role || "BUYER"}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="rounded border border-[#e2e8f0] bg-transparent text-sm p-1"
                      >
                        <option value="BUYER">Buyer</option>
                        <option value="DESIGNER">Designer</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#64748b]">{u.phone || "-"}</td>
                  <td className="px-6 py-4 text-[#64748b]">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(u.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
