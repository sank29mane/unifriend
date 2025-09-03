// src/app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: 'STUDENT' | 'HELPER';
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          const userData = data.user as User;
          setUser(userData);
          
          // Redirect to role-specific dashboard
          if (userData.role === 'STUDENT') {
            window.location.href = '/dashboard/student';
          } else if (userData.role === 'HELPER') {
            window.location.href = '/dashboard/helper';
          }
        } else {
          window.location.href = '/auth/login';
        }
      })
      .catch(() => {
        window.location.href = '/auth/login';
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Redirecting...</p>
    </div>
  );
}
