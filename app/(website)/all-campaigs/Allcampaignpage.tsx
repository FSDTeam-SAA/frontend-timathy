/* eslint-disable */
"use client";
import { useSession } from 'next-auth/react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CampaignCard from '../campaigns/_components/CampaignCard';
import { useSearchParams } from "next/navigation";

// Types
interface Creative {
    mediaUrls?: string[];
}

interface AdSet {
    dailyBudget?: number;
    status: string;
    creatives: Creative[];
}

interface Campaign {
    _id: string;
    name: string;
    status: string;
    objective: string;
    adSets: AdSet[];
}

interface ApiResponse {
    pageId: { pageId: string; pageName: string };
    campaigns: Campaign[];
}

// Campaign Card Component (assuming you have this)


const AllCampaigns = () => {
    const { data: session, status } = useSession();
    const userId = (session?.user as any)?.id;
    const token = (session?.user as any)?.accessToken;
    const searchParams = useSearchParams();
    const urlPageId = searchParams.get("pageId");
    const pageId = urlPageId || "";
    console.log(pageId)

    // TanStack Query to fetch campaigns
    const {
        data: response,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<ApiResponse, Error>({
        queryKey: ['campaigns', userId],
        queryFn: async () => {
            if (!userId || !token) throw new Error('User not authenticated');

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/get?userId=${userId}&pageId=${pageId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch campaigns: ${res.status} ${errorText}`);
            }

            return res.json();
        },
        enabled: status === 'authenticated' && !!userId && !!token,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const campaigns = response?.campaigns || [];
    const filteredCampaigns = campaigns;

    // Handle authentication loading state
    if (status === 'loading') {
        return (
            <div className="container py-[56px] text-center">
                <p className="text-gray-400">Authenticating...</p>
            </div>
        );
    }

    // Handle unauthenticated state
    if (status === 'unauthenticated') {
        return (
            <div className="container py-[56px] text-center">
                <p className="text-gray-400">Please sign in to view your campaigns.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header or Refresh Button */}
            <div className="container py-[56px]">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">All Campaigns</h1>

                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div>

                        <div className="animate-spin rounded-full mx-auto h-16 w-16  border-t-4 border-b-4 border-[#FF6900] mb-4" />
                        <p className="text-center text-gray-400">Loading campaigns...</p>
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500">
                        <p>Error loading campaigns</p>
                        <p className="text-sm mt-2">{(error as Error)?.message}</p>
                        <button
                            onClick={() => refetch()}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredCampaigns.length === 0 ? (
                    <p className="text-center text-gray-400">No campaigns found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCampaigns.map((campaign) => (
                            <CampaignCard key={campaign._id} campaign={campaign} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCampaigns;