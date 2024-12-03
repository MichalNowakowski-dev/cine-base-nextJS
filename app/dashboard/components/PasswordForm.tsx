"use client";
import { useState } from "react";

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit password change logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 p-2 w-full bg-gray-800 text-white rounded"
        />
      </div>
      <div>
        <label className="block text-sm">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 p-2 w-full bg-gray-800 text-white rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-green-600 text-white rounded"
      >
        Change Password
      </button>
    </form>
  );
};

export default PasswordForm;
