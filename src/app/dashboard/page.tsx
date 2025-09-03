import { headers } from 'next/headers';

export default async function Dashboard() {
  // Await the promise to get the Headers instance.
  const h = await headers();

  // Safely retrieve the custom header. `get` returns a string | null.
  const userHeader = h.get('x-user');

  let email = 'guest';
  if (userHeader) {
    email = userHeader;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {email}!</p>
    </div>
  );
}
