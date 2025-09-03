import { Metadata } from 'next';
import { getTokenFromRequest, verifyToken } from '@/server/auth';

export const metadata: Metadata = {
  title: 'Dashboard – Unifriend',
};

export default async function DashboardPage({ request }: { request: Request }) {
  const token = getTokenFromRequest(request as any);
  if (!token || !verifyToken(token)) {
    // Redirect to login when unauthenticated
    return <div>Please log in to access your dashboard.</div>;
  }

  // In a real app, fetch protected data here.
  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>You are authenticated. Replace this with real content.</p>
    </section>
  );
}
