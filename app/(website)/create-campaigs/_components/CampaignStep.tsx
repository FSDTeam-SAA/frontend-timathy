// /* eslint-disable */

// 'use client';

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";

// interface CampaignData {
//   adAccountId: string;
//   pageId: string;
//   name: string;
//   objective: string;
// }

// interface User {
//   name?: string | null | undefined;
//   email?: string | null | undefined;
//   image?: string | null | undefined;
//   id?: string | null | undefined;
//   accessToken?: string | null | undefined;
// }

// export default function CampaignStep({ campaign, setCampaign, nextTab }: any) {
//   const inputStyle = "border border-[#4B4B4B] h-[48px] rounded-[8px] bg-[#4B4B4B] text-white";
//   const { data: session } = useSession();
//   const token = (session?.user as User | undefined)?.accessToken;

//   // TanStack Query mutation
//   const mutation = useMutation({
//     mutationFn: async (data: CampaignData) => {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/create-campaign`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const error = await response.json().catch(() => ({ message: "Something went wrong" }));
//         throw new Error(error.message || "Failed to create campaign");
//       }

//       return response.json();
//     },
//     onSuccess: (data) => {
//       toast.success("Campaign created successfully!");
//       nextTab(); 
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Failed to create campaign. Please try again.");
//     },
//   });

//   const handleSubmit = () => {
//     const payload = {
//       adAccountId: campaign.adAccountId,
//       pageId: campaign.pageId,
//       name: campaign.name,
//       objective: campaign.objective,
//     };

//     mutation.mutate(payload);
//   };

//   const isFormValid =
//     campaign.adAccountId &&
//     campaign.pageId &&
//     campaign.name &&
//     campaign.objective;

//   return (
//     <Card className="p-8">
//       <h2 className="text-2xl font-semibold mb-6">Create Campaign</h2>

//       <div className="space-y-6">
//         {/* Ad Account ID */}
//         <div>
//           <Label>Ad Account ID</Label>
//           <Input
//             value={campaign.adAccountId || ''}
//             onChange={(e) => setCampaign({ ...campaign, adAccountId: e.target.value })}
//             className={inputStyle}
//           />
//         </div>

//         {/* Page ID */}
//         <div>
//           <Label>Page ID</Label>
//           <Input
//             value={campaign.pageId || ''}
//             onChange={(e) => setCampaign({ ...campaign, pageId: e.target.value })}
//             className={inputStyle}
//           />
//         </div>

//         {/* Campaign Name */}
//         <div>
//           <Label>Campaign Name</Label>
//           <Input
//             value={campaign.name || ''}
//             onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
//             className={inputStyle}
//           />
//         </div>

//         {/* Objective */}
//         <div>
//           <Label>Objective</Label>
//           <Select
//             value={campaign.objective || ''}
//             onValueChange={(v) => setCampaign({ ...campaign, objective: v })}
//           >
//             <SelectTrigger className={inputStyle}>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent className="text-white bg-[#3A3A3A]">
//               <SelectItem value="OUTCOME_AWARENESS">Awareness</SelectItem>
//               <SelectItem value="OUTCOME_LEADS">Leads</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="mt-8 flex justify-end">
//         <Button
//           onClick={handleSubmit}
//           disabled={!isFormValid || mutation.isPending}
//           className="bg-[#FF6900] h-[48px] rounded-[8px] hover:bg-[#FF6900]/90 disabled:opacity-50"
//         >
//           {mutation.isPending ? "Creating..." : "Create Campaign"}
//         </Button>
//       </div>

//       {/* Optional: Show loading state globally with Sonner */}
//       {mutation.isPending && toast.loading("Creating campaign...")}
//     </Card>
//   );
// }


/* eslint-disable */

'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface CampaignData {
  adAccountId: string;
  pageId: string;
  name: string;
  objective: string;
}

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
  accessToken?: string | null;
}

export default function CampaignStep({ campaign, setCampaign, nextTab }: any) {
  const inputStyle = "border border-[#4B4B4B] h-[48px] rounded-[8px] bg-[#4B4B4B] text-white";
  const { data: session } = useSession();
  const token = (session?.user as User | undefined)?.accessToken;

  // Mutation for creating campaign
  const mutation = useMutation({
    mutationFn: async (data: CampaignData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/create-campaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Something went wrong" }));
        throw new Error(error.message || "Failed to create campaign");
      }

      return response.json();
    },
  });

  const handleSubmit = () => {
    if (!campaign.adAccountId || !campaign.pageId || !campaign.name || !campaign.objective) {
      return toast.error("Please fill all fields before proceeding.");
    }

    const payload = {
      adAccountId: campaign.adAccountId,
      pageId: campaign.pageId,
      name: campaign.name,
      objective: campaign.objective,
    };

    // Show loading toast once
    const toastId = toast.loading("Creating campaign...");

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Campaign created successfully!", { id: toastId });
        nextTab(); // Move to next step
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to create campaign", { id: toastId });
      },
    });
  };

  const isFormValid =
    campaign.adAccountId &&
    campaign.pageId &&
    campaign.name &&
    campaign.objective;

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Create Campaign</h2>

      <div className="space-y-6">
        {/* Ad Account ID */}
        <div>
          <Label>Ad Account ID</Label>
          <Input
            value={campaign.adAccountId || ''}
            onChange={(e) => setCampaign({ ...campaign, adAccountId: e.target.value })}
            className={inputStyle}
          />
        </div>

        {/* Page ID */}
        <div>
          <Label>Page ID</Label>
          <Input
            value={campaign.pageId || ''}
            onChange={(e) => setCampaign({ ...campaign, pageId: e.target.value })}
            className={inputStyle}
          />
        </div>

        {/* Campaign Name */}
        <div>
          <Label>Campaign Name</Label>
          <Input
            value={campaign.name || ''}
            onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
            className={inputStyle}
          />
        </div>

        {/* Objective */}
        <div>
          <Label>Objective</Label>
          <Select
            value={campaign.objective || ''}
            onValueChange={(v) => setCampaign({ ...campaign, objective: v })}
          >
            <SelectTrigger className={inputStyle}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="text-white bg-[#3A3A3A]">
              <SelectItem value="OUTCOME_AWARENESS">Awareness</SelectItem>
              <SelectItem value="OUTCOME_LEADS">Leads</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || mutation.isPending}
          className="bg-[#FF6900] h-[48px] rounded-[8px] hover:bg-[#FF6900]/90 disabled:opacity-50"
        >
          {mutation.isPending ? "Creating..." : "Create Campaign"}
        </Button>
      </div>
    </Card>
  );
}
