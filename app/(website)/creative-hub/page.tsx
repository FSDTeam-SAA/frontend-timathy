"use client";

import { Grid3x3, Zap, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Campaigns() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#4B4B4B3D]/25">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 bg-[#4B4B4B3D]/25">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage Your Advertising Management
          </p>

          {/* Tabs */}
          <div className="mt-6 flex gap-4 py-6 rounded-[8px] p-2 w-full bg-[#4B4B4B] overflow-x-auto">
            <Link href="/campaigns">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition border-b-2 whitespace-nowrap ${
                  pathname === "/campaigns"
                    ? "border-[#FF6900]"
                    : "border-transparent hover:border-slate-500"
                }`}
              >
                <Grid3x3 size={18} />
                <span className="text-sm font-medium">Campaigns</span>
              </button>
            </Link>

            <Link href="/advertise">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-gray-300 transition border-b-2 whitespace-nowrap ${
                  pathname === "/advertise"
                    ? "border-[#FF6900]"
                    : "border-transparent hover:border-slate-500"
                }`}
              >
                <Zap size={18} />
                <span className="text-sm font-medium">Advertise</span>
              </button>
            </Link>

            <Link href="/creative-hub">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-gray-300 transition border-b-2 whitespace-nowrap ${
                  pathname === "/creative-hub"
                    ? "border-[#FF6900]"
                    : "border-transparent hover:border-slate-500"
                }`}
              >
                <Zap size={18} />
                <span className="text-sm font-medium">Creative Hub</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto">
          <div className="space-y-4">
            {/* === Static Account Card 1 === */}
            <div className="w-full bg-[#5A5A5A] rounded-lg overflow-hidden">
              <div className="flex items-center h-full">
                {/* Left Section - Social Icons */}
                <div className="bg-[#4A4A4A] px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Facebook size={16} className="text-white" />
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Instagram size={16} className="text-white" />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-20 bg-[#6A6A6A]" />

                {/* User Info */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1">
                  <p className="text-gray-400 text-xs sm:text-sm font-medium">
                    User Name
                  </p>
                  <h3 className="text-white font-bold text-sm sm:text-base mt-1">
                    Joshua Naiah
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2">
                    Add Account
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    KI-CRM.io
                  </p>
                </div>

                {/* Platform Info (Hidden on Mobile) */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1 hidden sm:block">
                  <p className="text-gray-400 text-xs sm:text-sm font-medium">
                    Facebook Page
                  </p>
                  <p className="text-white font-bold text-sm sm:text-base mt-1">
                    KI-CRM.io
                  </p>
                </div>

                {/* Buttons & Arrow */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center gap-2 sm:gap-3">
                  <button className="px-4 sm:px-6 py-2 bg-[#3A3A3A] text-white text-xs sm:text-sm font-medium rounded-md hover:bg-[#4A4A4A] transition whitespace-nowrap">
                    Create Ad
                  </button>
                  <button className="px-4 sm:px-6 py-2 bg-[#E5E5E5] text-[#2A2A2A] text-xs sm:text-sm font-medium rounded-md hover:bg-white transition whitespace-nowrap">
                    Disconnected
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[#6A6A6A] transition ml-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-300"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* === Static Account Card 2 === */}
            <div className="w-full bg-[#5A5A5A] rounded-lg overflow-hidden">
              <div className="flex items-center h-full">
                {/* Left Section - Social Icons */}
                <div
                  className="bg-[#4A4A4A] px-4 sm:px-6

 py-4 sm:py-6 flex flex-col gap-3 items-center"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Facebook size={16} className="text-white" />
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Instagram size={16} className="text-white" />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-20 bg-[#6A6A6A]" />

                {/* User Info */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1">
                  <p className="text-gray-400 text-xs sm:text-sm font-medium">
                    User Name
                  </p>
                  <h3 className="text-white font-bold text-sm sm:text-base mt-1">
                    Joshua Naiah
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2">
                    Add Account
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    KI-CRM.io
                  </p>
                </div>

                {/* Platform Info (Hidden on Mobile) */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1 hidden sm:block">
                  <p className="text-gray-400 text-xs sm:text-sm font-medium">
                    Instagram Account
                  </p>
                  <p className="text-white font-bold text-sm sm:text-base mt-1">
                    ki_crm_io
                  </p>
                </div>

                {/* Buttons & Arrow */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center gap-2 sm:gap-3">
                  <button className="px-4 sm:px-6 py-2 bg-[#3A3A3A] text-white text-xs sm:text-sm font-medium rounded-md hover:bg-[#4A4A4A] transition whitespace-nowrap">
                    Create Ad
                  </button>
                  <button className="px-4 sm:px-6 py-2 bg-[#E5E5E5] text-[#2A2A2A] text-xs sm:text-sm font-medium rounded-md hover:bg-white transition whitespace-nowrap">
                    Disconnected
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[#6A6A6A] transition ml-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-300"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
