
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3x3, Zap,  } from "lucide-react";
import Allpages from "./AllPage";



export default function Campaigns() {
  const pathname = usePathname();



 

  return (
    <div className="min-h-screen bg-[#4B4B4B3D]/25">
      {/* Header & Tabs (same as before) */}
      <div className="lg:px-8 py-8 bg-[#4B4B4B3D]/25">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage Your Advertising Management
          </p>

          <div className="mt-6 flex gap-4 py-6 rounded-[8px] w-full bg-[#4B4B4B] overflow-x-auto">
            {[
              { href: "/campaigns", label: "Campaigns", icon: Grid3x3 },
              // { href: "/advertise", label: "Advertise", icon: Zap },
              { href: "/creative-hub", label: "Creative Hub", icon: Zap },
            ].map((tab) => (
              <Link key={tab.href} href={tab.href}>
                <button
                  className={`flex items-center gap-2 px-3 py-2 text-sm md:text-base font-medium transition border-b-2 whitespace-nowrap ${
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
      <div className="px-4 sm:px-6 lg:px-0 pb-12">
        {/* Search Bar */}
        {/* <div className="bg-[#1E1E1E] py-6 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-3 container">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search Campaigns"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#4B4B4B] border border-[#1A316B]/40 h-[48px] text-white pl-10 rounded-[8px]"
              />
            </div>
            <button className="flex items-center gap-2 bg-[#4B4B4B] text-gray-300 px-4 py-3 rounded-[8px] border border-[#1A316B]/40 text-sm">
              All Platforms <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 bg-[#4B4B4B] text-gray-300 px-4 py-3 rounded-[8px] border border-[#1A316B]/40 text-sm">
              All Status <ChevronDown size={16} />
            </button>
          </div>
        </div> */}

        <div>
          <Allpages/>
        </div>

    
      </div>
    </div>
  );
}