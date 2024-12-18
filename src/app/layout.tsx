import { headers } from 'next/headers';

import MainClient from '@/components/MainClient/MainClient';

import './globals.css';
import { IUserDB } from '@/types/Expenses';
import { connectDB } from '@/lib/mongooseDB';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB()
  const headersList = await headers();

  const user: IUserDB = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    method: 'GET',
    headers: {
      cookie: headersList.get('cookie') || '',
    },

    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return null;
  });

  return (
    <html lang='en'>
      <body>
        <MainClient user={user} />
        {children}
        <div id='modal-root'></div>
      </body>
    </html>
  );
}
