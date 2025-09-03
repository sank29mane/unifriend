// src/app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/auth/login';
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Sign out
      </button>
    </div>
  );
}
