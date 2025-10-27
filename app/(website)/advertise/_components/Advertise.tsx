

"use client"
import Link from "next/link"
import { Grid3x3, Zap } from "lucide-react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import AdvertiseCard from "./AdvertiseCard"
import CampaignForm from "./Froms"
import { useSession } from "next-auth/react"


// Types (keep them in the same file or move to a shared types file)

interface FacebookPage {
  pageId: string
  pageName: string
  pageAccessToken: string
  adAccountId: string | null
  instagramBusinessId: string | null
  tasks: string[]
}

interface BusinessPage {
  pageId: string
  pageName: string
  pageAccessToken: string
  instagramBusinessId: string | null
  tasks: string[]
}

interface ApiResponse {
  status: boolean
  message: string
  data: {
    facebookBusinesses: {
      businessId: string
      businessName: string
      pages: BusinessPage[]
      adAccounts: Array<{
        account_id: string
        id: string
        name: string
        currency: string
      }>
    }[]
  }
}
interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
  accessToken?: string | null | undefined;
}
// Component
export default  function Advertise() {
  const pathname = usePathname()
  const { data: session } = useSession();
    const token = (session?.user as User | undefined)?.accessToken;
    const userId = (session?.user as User | undefined)?.id;

  // ───── Fetch user data ─────
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
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
      )

      if (!res.ok) throw new Error("Failed to fetch user data")
      return res.json()
    },
    enabled: !!userId && !!token, // only run when we have both
    staleTime: 5 * 60 * 1000, // 5 min
    retry: 1,
  })

  // ───── Extract ONLY the pages from facebookBusinesses ─────
  const businessPages: FacebookPage[] = data?.data?.facebookBusinesses
    .flatMap(b => b.pages)
    .map(p => ({
      pageId: p.pageId,
      pageName: p.pageName,
      pageAccessToken: p.pageAccessToken,
      adAccountId: null,               // not present in business pages → keep null
      instagramBusinessId: p.instagramBusinessId,
      tasks: p.tasks,
    })) ?? []

  // ───── UI ─────
  return (
    <div className="min-h-screen bg-[#4B4B4B3D]/25">
      {/* Header + Tabs (unchanged) */}
      <div className="lg:px-8 py-8 bg-[#4B4B4B3D]/25">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage Your Advertising Management</p>

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

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12 mt-14 container">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Sidebar with Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg p-6 h-screen overflow-y-auto hide-scrollbar">
              <CampaignForm />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FF6900]" />
              </div>
            ) : isError ? (
              <div className="text-red-400 text-center p-4">
                Error: {(error as Error)?.message || "Failed to load pages"}
              </div>
            ) : businessPages.length === 0 ? (
              <div className="text-gray-400 text-center p-8">
                No business pages connected.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessPages.map((page) => (
                  <AdvertiseCard key={page.pageId} page={page} />
                ))}
              </div>
            )}

            {/* Create Button */}
            <button className="w-full mt-6 bg-[#FF6900] text-white h-[48px] rounded-[8px] font-semibold hover:bg-orange-600 transition">
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}