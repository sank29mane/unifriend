import { headers } from 'next/headers';

export default function Dashboard() {
  const h = headers();
  const userHeader = h.get('x-user');
  let email = 'guest';

  if (userHeader) {
    try {
      const user = JSON.parse(userHeader);
      email = user.email;
    } catch {
      // ignore parse errors
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {email}!</p>
    </div>
  );
}
