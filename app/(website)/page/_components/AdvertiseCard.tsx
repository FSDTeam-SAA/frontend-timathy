"use client";

import React from "react";
import { Facebook } from "lucide-react";
import { useRouter } from "next/navigation";

interface FacebookPage {
  pageId: string;
  pageName: string;
  pageAccessToken: string;
  instagramBusinessId: string | null;
  tasks: string[];
}

interface AdvertiseCardProps {
  page: FacebookPage;
  businessName: string;
  adAccounts?: string[];
}

export default function AdvertiseCard({
  page,
  businessName,
  adAccounts = [],
}: AdvertiseCardProps) {
  const router = useRouter();

  const canAdvertise = page.tasks.includes("ADVERTISE");

  const handleClick = () => {
    router.push(
      `/create-campaigns?pageId=${page.pageId}&adAccounts=${encodeURIComponent(JSON.stringify(adAccounts))}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-[#FF6900] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="absolute inset-0 rounded-xl bg-[#FF6900] opacity-0 group-hover:opacity-10 transition-opacity" />

      <div className="relative flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
          <Facebook className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1">
          <h3 className="text-white font-bold text-lg">{page.pageName}</h3>
          <p className="text-gray-500 text-xs mt-1">Business: {businessName}</p>
          <p className="text-gray-500 text-sm">ID: {page.pageId}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="px-3 py-1.5 text-xs bg-green-900/50 text-green-300 border border-green-800 rounded-full">
          Connected
        </span>

        {canAdvertise ? (
          <span className="text-xs text-green-400">Can Run Ads</span>
        ) : (
          <span className="text-xs text-orange-400">No Ad Permission</span>
        )}
      </div>

      {page.instagramBusinessId && (
        <div className="mt-3 text-pink-400 text-xs flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
          </svg>
          Instagram Connected
        </div>
      )}
    </div>
  );
}
