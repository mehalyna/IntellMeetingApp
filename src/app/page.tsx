'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the meeting creation page
    router.push('/meeting/create');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-medium">Redirecting to Meeting Creation...</h1>
        <p className="mt-2 text-gray-500">Please wait...</p>
      </div>
    </div>
  );
}