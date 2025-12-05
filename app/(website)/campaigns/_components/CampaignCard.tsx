// "use client"
// import Image from "next/image"

// export default function CampaignCard() {
//   return (
//     <div className=" overflow-hidden hover:shadow-lg transition bg-[#4B4B4B] rounded-[8px]">
//       {/* Image */}
//       <div className="w-full h-[264px]">
//         <Image src="/assets/campain.png" alt="Campaign" width={1000} height={1000} className="w-full h-full object-cover rounded-[8px]" />
//       </div>

//       {/* Content */}
//       <div className="p-4  space-y-3">
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="text-[24px] text-[#F5F5F5] font-midium">Summer Sale 2023</h3>
//             <p className="text-[#AAAAAA] font-normal text-base">Facebook Instagram</p>
//           </div>
//           <span className="bg-[#ECF1FF] text-[#3F74FF] text-base px-4 py-1 rounded-full">Active</span>
//         </div>

//         {/* Stats */}
//         <div className="flex justify-between gap-2 ">
//           <div>
//             <p className="text-base text-[#AAAAAA] font-normal">Budget</p>
//             <p className="text-2xl text-[#F5F5F5] font-midium">$1,200</p>
//           </div>
//           <div >
//             <p className="text-base text-[#AAAAAA] font-normal">Spent</p>
//             <p className="text-2xl text-[#F5F5F5] font-midium">$345</p>
//           </div>
        
//         </div>

//         <div className="flex justify-between gap-2 text-xs">
//           <div>
//             <p className="text-base text-[#AAAAAA] font-normal">Lead</p>
//             <p className="text-2xl text-[#F5F5F5] font-midium">28</p>
//           </div>
//           <div>
//             <p className="text-base text-[#AAAAAA] font-normal">Cost per Laad</p>
//             <p className="text-2xl text-[#F5F5F5] font-midium">$12.32</p>
//           </div>
        
//         </div>

//         {/* Edit Button */}
//         {/* <div className="pt-[32px]">
//         <Button className="w-full bg-[#FF6900] text-white h-[48px] rounded-[8px] font-semibold hover:bg-orange-600 transition text-sm font-bold">
//           Edit
//         </Button>
//         </div> */}
//       </div>
//     </div>
//   )
// }


// components/CampaignCard.tsx
"use client";

import Image from "next/image";

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
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  // Get first image from any creative in any adSet
  const imageUrl =
    campaign.adSets
      .flatMap((adSet) => adSet.creatives)
      .find((creative) => creative.mediaUrls && creative.mediaUrls.length > 0)
      ?.mediaUrls?.[0] || "/assets/campain.png";

  // Calculate total budget (sum of daily budgets)
  const totalBudget = campaign.adSets.reduce((sum, adSet) => {
    return sum + (adSet.dailyBudget || 0);
  }, 0);

  // Mock stats (since your API doesn't return spent/leads yet
  const spent = Math.round(totalBudget * 0.3); // Example: 30% spent
  const leads = Math.floor(Math.random() * 50) + 10;
  const costPerLead = leads > 0 ? (spent / leads).toFixed(2) : "0.00";

  const isActive = campaign.status === "ACTIVE";
  const isPaused = campaign.status === "PAUSED";

  return (
    <div className="overflow-hidden hover:shadow-lg transition bg-[#4B4B4B] rounded-[8px]">
      {/* Image */}
      <div className="w-full h-[264px] relative">
        <Image
          src={imageUrl}
          alt={campaign.name}
          fill
          className="object-cover rounded-t-[8px]"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[24px] text-[#F5F5F5] font-medium truncate">
              {campaign.name}
            </h3>
            <p className="text-[#AAAAAA] text-base">Facebook • Instagram</p>
          </div>
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
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

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#AAAAAA] text-sm">Budget</p>
            <p className="text-2xl text-[#F5F5F5] font-medium">
              ${totalBudget.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[#AAAAAA] text-sm">Spent</p>
            <p className="text-2xl text-[#F5F5F5] font-medium">
              ${spent.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#AAAAAA] text-sm">Leads</p>
            <p className="text-2xl text-[#F5F5F5] font-medium">{leads}</p>
          </div>
          <div>
            <p className="text-[#AAAAAA] text-sm">Cost per Lead</p>
            <p className="text-2xl text-[#F5F5F5] font-medium">
              ${costPerLead}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}