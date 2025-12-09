


// components/CampaignCard.tsx
"use client";

import Image from "next/image";
import { ClipboardPenLine,  } from "lucide-react";

interface Campaign {
  _id: string;
  name: string;
  status: string;
  objective: string;
  adSets: Array<{
    dailyBudget?: number;
    status: string;
    creatives: Array<{
      mediaUrls?: string[];
    }>;
  }>;
}

interface CampaignCardProps {
  campaign: Campaign;
  onEdit?: (id: string) => void;
}

export default function CampaignCard({ campaign, onEdit }: CampaignCardProps) {
  // Get first image
  const imageUrl =
    campaign.adSets
      .flatMap((adSet) => adSet.creatives)
      .find((creative) => creative.mediaUrls?.length)
      ?.mediaUrls?.[0] || "/assets/campain.png";

  // Calculate total budget
  const totalBudget = campaign.adSets.reduce(
    (sum, adSet) => sum + (adSet.dailyBudget || 0),
    0
  );

  // Mock stats
  const spent = Math.round(totalBudget * 0.3);
  const leads = Math.floor(Math.random() * 50) + 10;
  const costPerLead = leads > 0 ? (spent / leads).toFixed(2) : "0.00";

  const isActive = campaign.status === "ACTIVE";
  const isPaused = campaign.status === "PAUSED";

  return (
    <div className="overflow-hidden bg-[#2C2C2C] hover:shadow-xl transition rounded-[12px] border border-[#3A3A3A]">
      {/* Image */}
      <div className="w-full h-[240px] relative">
        <Image
          src={imageUrl}
          alt={campaign.name}
          fill
          className="object-cover rounded-t-[12px]"
        />

        {/* Edit Button */}
        <button
          onClick={() => onEdit?.(campaign._id)}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 transition text-white p-2 rounded-full"
        >
          <ClipboardPenLine size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[22px] text-white font-semibold leading-tight">
              {campaign.name}
            </h3>
            <p className="text-gray-400 text-sm">Facebook • Instagram</p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              isActive
                ? "bg-green-900/30 text-green-400"
                : isPaused
                ? "bg-orange-900/30 text-orange-400"
                : "bg-red-900/30 text-red-400"
            }`}
          >
            {campaign.status}
          </span>
        </div>

        {/* Stats Row 1 */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-400 text-sm">Total Budget</p>
            <p className="text-[22px] text-white font-semibold">
              ${totalBudget.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Spent</p>
            <p className="text-[22px] text-white font-semibold">
              ${spent.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Stats Row 2 */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-400 text-sm">Leads</p>
            <p className="text-[22px] text-white font-semibold">{leads}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Cost per Lead</p>
            <p className="text-[22px] text-white font-semibold">
              ${costPerLead}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
