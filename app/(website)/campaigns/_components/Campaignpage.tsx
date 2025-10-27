"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3x3, Zap, Search, ChevronDown } from "lucide-react";
import CampaignCard from "./CampaignCard";
import { Input } from "@/components/ui/input";

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#4B4B4B3D]/25">
      <div>
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
          <div className="mt-6 flex gap-2 sm:gap-4 py-4 sm:py-6 rounded-[8px]   w-full bg-[#4B4B4B] overflow-x-auto">
            {[
              { href: "/campaigns", label: "Campaigns", icon: Grid3x3 },
              { href: "/advertise", label: "Advertise", icon: Zap },
              { href: "/creative-hub", label: "Creative Hub", icon: Zap },
            ].map((tab) => (
              <Link key={tab.href} href={tab.href}>
                <button
                  className={`flex items-center gap-2 px-3  py-2 text-xs  md:text-base font-medium transition border-b-2 whitespace-nowrap ${
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
          {/* Search and Filters */}
          <div className="bg-[#1E1E1E] py-6  p-4 rounded-lg w-full">
            <div className="flex flex-col sm:flex-row gap-3  container ">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search Campaigns"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4B4B4B] border border-[#1A316B]/40 h-[48px] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-[8px] placeholder:text-[#AAAAAA] text-sm"
                />
              </div>
              <button className="flex items-center border border-[#1A316B]/40 gap-2 bg-[#4B4B4B] text-gray-300 px-4 py-2 rounded-[8px] text-sm hover:bg-slate-600 transition">
                All Platforms
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center border border-[#1A316B]/40 gap-2 bg-[#4B4B4B] text-gray-300 px-4 py-2 rounded-[8px] text-sm hover:bg-slate-600 transition">
                All Status
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Campaign Cards Grid */}
          <div className="bg-[#4B4B4B3D]/25  py-[56px] rounded-lg">
          <div className=" container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <CampaignCard key={i} />
            ))}
          </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="w-8 h-8 rounded bg-slate-700 text-gray-400 hover:bg-slate-600 transition text-sm">
              1
            </button>
            <button className="w-8 h-8 rounded bg-slate-700 text-gray-400 hover:bg-slate-600 transition text-sm">
              2
            </button>
            <button className="w-8 h-8 rounded bg-slate-700 text-gray-400 hover:bg-slate-600 transition text-sm">
              3
            </button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 rounded bg-slate-700 text-gray-400 hover:bg-slate-600 transition text-sm">
              10
            </button>
            <button className="w-8 h-8 rounded bg-blue-600 text-white hover:bg-blue-500 transition text-sm">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
