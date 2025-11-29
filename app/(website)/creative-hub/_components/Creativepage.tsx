"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Grid3x3, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
  accessToken?: string | null | undefined;
}

/** Response shape of GET /connect/connect-user */
interface ConnectResponse {
  url: string;
}

// Types for Facebook data
interface FacebookPage {
  pageId: string;
  pageName: string;
  pageAccessToken: string;
  instagramBusinessId: string | null;
  tasks: string[];
}

interface FacebookBusiness {
  businessId: string;
  businessName: string;
  pages: FacebookPage[];
//   adAccounts: any[];
}

interface UserData {
  name?: string;
  email?: string;
  facebookPages?: FacebookPage[];
  facebookBusinesses?: FacebookBusiness[];
  // ... other fields
}

export default function Creativepage() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const token = (session?.user as User | undefined)?.accessToken;
  const userId = (session?.user as User | undefined)?.id;

  /* --------------------------------------------------------------1. FETCH USER-------------------------------------------------------------- */
  const {
    data: userData,
    // isLoading: userLoading,
    isError: userError,
  } = useQuery<UserData>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch user");
      }

      const body = await res.json();
      if (!body.status) throw new Error(body.message);
      return body.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!userId && !!token,
  });

  /* -------------------------------------------------------------- 2. CONNECT MUTATION (GET request)-------------------------------------------------------------- */
  const connectMutation = useMutation<ConnectResponse, Error>({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/connect/connect-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to get connect URL");
      }

      return res.json();
    },

    onSuccess: (data) => {
      toast.success("Redirecting to Facebook…");
      setTimeout(() => {
        window.location.href = data.url;
      }, 800);
    },

    onError: (error) => {
      toast.error(error.message ?? "Could not start connection");
    },
  });

  /* --------------------------------------------------------------3. LOADING / ERROR STATES-------------------------------------------------------------- */
//   if (userLoading) return <div className="text-white p-8">Loading user…</div>;
  if (userError) return <div className="text-red-500 p-8">Failed to load user</div>;

  // Helper: Get ALL page names from all businesses
  const getAllPageNames = (): string => {
    if (!userData?.facebookBusinesses || userData.facebookBusinesses.length === 0) {
      return "N/A";
    }

    const pageNames = userData.facebookBusinesses
      .flatMap((business) => business.pages ?? [])
      .map((page) => page.pageName)
      .filter((name): name is string => Boolean(name && name.trim() !== ""));

    return pageNames.length > 0 ? pageNames.join(", ") : "N/A";
  };

  return (
    <div className="bg-[#4B4B4B3D]/25">
      {/* Header */}
      <div className="lg:px-8 py-8 bg-[#4B4B4B3D]/25">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage Your Advertising Management
          </p>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 sm:gap-4 py-4 sm:py-6 rounded-[8px] w-full bg-[#4B4B4B] overflow-x-auto">
            {[
              { href: "/campaigns", label: "Campaigns", icon: Grid3x3 },
              { href: "/advertise", label: "Advertise", icon: Zap },
              { href: "/creative-hub", label: "Creative Hub", icon: Zap },
            ].map((tab) => (
              <Link key={tab.href} href={tab.href}>
                <button
                  className={`flex items-center gap-2 px-3 py-2 text-xs md:text-base font-medium transition border-b-2 whitespace-nowrap ${
                    pathname === tab.href
                      ? "border-[#FF6900] text-white"
                      : "border-transparent text-gray-300 hover:border-slate-500"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0 py-10 container mx-auto">
        <div className="space-y-4">
          <div className="w-full bg-[#4B4B4B] rounded-[8px] overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 p-4 sm:p-6">
              {/* Social icons */}
              <div className="flex gap-3 items-center flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook size={16} className="text-white" />
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Instagram size={16} className="text-white" />
                </div>
              </div>

              <div className="hidden sm:block w-px h-20 bg-[#FFFFFF] ml-5" />

              {/* User info */}
              <div className="flex-1 min-w-0 pl-5">
                <p className="text-[#AAAAAA] text-sm sm:text-base font-medium">
                  User Name
                </p>
                <h3 className="text-[#F5F5F5] font-bold text-base sm:text-lg mt-1 truncate">
                  {userData?.name ?? "—"}
                </h3>
                <p className="text-[#AAAAAA] text-xs sm:text-sm mt-2">
                  Add Account
                </p>
                <p className="text-[#F5F5F5] text-xs sm:text-sm mt-1 truncate">
                  {userData?.email ?? "—"}
                </p>
              </div>

              {/* Facebook Page - SHOW ALL PAGES */}
              <div className="flex-1 min-w-0 hidden sm:block">
                <p className="text-[#AAAAAA] text-xs sm:text-sm font-medium">
                  Facebook Pages
                </p>
                <p className="text-white font-bold text-sm sm:text-base mt-1 truncate">
                  {getAllPageNames()}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                <Link href="/page">
                  <button className="px-4 sm:px-6 h-10 sm:h-12 bg-[#1E1E1E] text-white text-xs sm:text-sm font-medium rounded-[8px] hover:bg-[#2A2A2A] transition whitespace-nowrap">
                    Create Ad
                  </button>
                </Link>

                {/* CONNECT BUTTON */}
                <Button
                  onClick={() => connectMutation.mutate()}
                  disabled={connectMutation.isPending}
                  className="px-4 sm:px-6 h-10 sm:h-12 bg-[#E5E5E5] text-[#2A2A2A] text-xs sm:text-sm font-medium rounded-[8px] hover:bg-white transition whitespace-nowrap"
                >
                  {connectMutation.isPending ? "Connecting…" : "Connected"}
                </Button>

                <Button className="flex items-center justify-center w-8 h-8 rounded-md transition ml-0 sm:ml-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-300"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}