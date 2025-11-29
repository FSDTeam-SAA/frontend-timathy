



/* eslint-disable */

'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Facebook } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Types
interface FacebookPage {
  pageId: string;
  pageName: string;
  pageAccessToken: string;
  instagramBusinessId: string | null;
  tasks: string[];
}

interface Business {
  businessId: string;
  businessName: string;
  adAccounts: any;
  pages: FacebookPage[];
}

interface UserData {
  adAccountId: string[];
  facebookBusinesses: Business[];
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: UserData;
}

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
  accessToken?: string | null | undefined;
}

const AdvertiseCard: React.FC<{
  page: FacebookPage & { businessName: string };
  adAccounts: string[];
}> = ({ page, adAccounts }) => {
  const router = useRouter();
  const canAdvertise = page.tasks.includes('ADVERTISE');

  const handleClick = () => {
   

    const params = new URLSearchParams({
      pageId: page.pageId,
      adAccountId: adAccounts as any,
    });

    router.push(`/create-campaigs?${params.toString()}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 `}
    >
      <div className="absolute inset-0 rounded-xl bg-[#FF6900] opacity-0 group-hover:opacity-10 transition-opacity" />

      <div className="relative flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
          <Facebook className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg truncate">{page.pageName}</h3>
          <p className="text-gray-500 text-xs mt-1">Business: {page.businessName}</p>
          <p className="text-gray-500 text-sm">ID: {page.pageId}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-800">
          Connected
        </span>
        {canAdvertise ? (
          <span className="text-xs text-green-400">Can Run Ads</span>
        ) : (
          <span className="text-xs text-orange-400">No Ad Permission</span>
        )}
      </div>

      {page.instagramBusinessId && (
        <div className="mt-3 flex items-center text-pink-400 text-xs">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162-2.759-6.163-6.162-6.163zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram Connected
        </div>
      )}
    </div>
  );
};

const AdvertiseSection: React.FC = () => {
  const { data: session } = useSession();
  const token = (session?.user as User | undefined)?.accessToken;
  const userId = (session?.user as User | undefined)?.id;

  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ['user-business-pages', userId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${userId}`, {
        headers: {
  'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch user data');
      return res.json();
    },
    enabled: !!userId && !!token,
    staleTime: 10 * 60 * 1000,
  });

  const pages = data?.data?.facebookBusinesses?.flatMap(business =>
    business.pages.map(page => ({
      ...page,
      businessName: business.businessName,
    }))
  ) || [];


const adAccounts = data?.data?.facebookBusinesses?.[0]?.adAccounts?.[0]?.id;
console.log(adAccounts)



  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Your Business Pages</h2>
        <p className="text-gray-400">Select a page to create ad campaigns</p>
      </div>

      <div className="bg-gray-950/50 backdrop-blur border border-gray-800 rounded-2xl p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6900] mb-4" />
            <p className="text-gray-400">Loading your pages...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-400">
            Failed to load pages: {(error as Error)?.message}
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Facebook className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl mb-2">No Business Pages Connected</h3>
            <p>Connect your Facebook Business Manager to run ads.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pages.map(page => (
              <AdvertiseCard
                key={page.pageId}
                page={page}
                adAccounts={adAccounts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseSection;