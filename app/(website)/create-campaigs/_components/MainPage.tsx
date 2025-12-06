/* eslint-disable */

'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignStep from "./CampaignStep";
import AdSetStep from "./AdSetStep";
import CreativeStep from "./CreativeStep";

// Shared Creative Data Type
export type CreativeData = {
  adAccountId: string;
  pageId: string;
  name: string;
  headline: string;
  primaryText: string;
  callToAction: string;
  websiteUrl?: string;
  destinationUrl: string;
  format: "SINGLE_IMAGE" | "VIDEO";
  file?: File | null;
  preview?: string | null;
};

export default function MetaAdsPage() {
  const searchParams = useSearchParams();
  const urlPageId = searchParams.get("pageId");
  const urlAdAccountIdRaw = searchParams.get("adAccountId");

  const pageId = urlPageId || "";
  const adAccountId = urlAdAccountIdRaw || "";
  const isValid = pageId && adAccountId;

  const [activeTab, setActiveTab] = useState("campaign");

  const [campaign, setCampaign] = useState({
    adAccountId,
    pageId,
    name: "",
    objective: "OUTCOME_AWARENESS" as const,
  });

  const [adSetId, setAdSetId] = useState<string>("");

  const handleAdSetFromChild = (id: string) => {
    setAdSetId(id);
  };

  const [creative, setCreative] = useState<CreativeData>({
    adAccountId,
    pageId,
    name: "",
    headline: "",
    primaryText: "",
    callToAction: "LEARN_MORE",
    websiteUrl: "",
    destinationUrl: "",
    format: "SINGLE_IMAGE",
    file: null,
    preview: null,
  });

  const [adSet, setAdSet] = useState<any>({
    name: "",
    dailyBudget: "",
    startDate: "",
    endDate: "",
    targeting: {
      locations: [],
      ageMin: "",
      ageMax: "",
      gender: undefined,
    },
  });

  // Sync URL params on mount or change
  useEffect(() => {
    if (isValid) {
      setCampaign(prev => ({ ...prev, adAccountId, pageId }));
      setCreative(prev => ({ ...prev, adAccountId, pageId }));
    }
  }, [adAccountId, pageId, isValid]);

  const nextTab = () => {
    if (activeTab === "campaign") setActiveTab("adset");
    else if (activeTab === "adset") setActiveTab("creative");
  };

  const prevTab = () => {
    if (activeTab === "creative") setActiveTab("adset");
    else if (activeTab === "adset") setActiveTab("campaign");
  };

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Missing required parameters</p>
          <p>Please access this page with correct URL:</p>
          <code className="bg-gray-800 px-4 py-2 rounded block mt-2 text-sm">
            ?pageId=YOUR_PAGE_ID&adAccountId=YOUR_AD_ACCOUNT_ID
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#4B4B4B3D]/25 min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Meta Ads Builder
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6 bg-[#4B4B4B] h-14 rounded-[8px]">
            <TabsTrigger
              value="campaign"
              className="rounded-none bg-transparent text-white data-[state=active]:border-b-2 data-[state=active]:border-[#FF6900] data-[state=active]:font-bold text-lg"
            >
              1. Campaign
            </TabsTrigger>
            <TabsTrigger
              value="adset"
              className="rounded-none bg-transparent text-white data-[state=active]:border-b-2 data-[state=active]:border-[#FF6900] data-[state=active]:font-bold text-lg"
            >
              2. Ad Set
            </TabsTrigger>
            <TabsTrigger
              value="creative"
              className="rounded-none bg-transparent text-white data-[state=active]:border-b-2 data-[state=active]:border-[#FF6900] data-[state=active]:font-bold text-lg"
            >
              3. Creative
            </TabsTrigger>
            
          </TabsList>

          <TabsContent value="campaign">
            <CampaignStep campaign={campaign} setCampaign={setCampaign} nextTab={nextTab} />
          </TabsContent>

          <TabsContent value="adset">
            <AdSetStep
              pageId={pageId}
              adAccountId={adAccountId}
              adSet={adSet}
              setAdSet={setAdSet}
              nextTab={nextTab}
              prevTab={prevTab}
              onGetAdSetId={handleAdSetFromChild}
            />
          </TabsContent>

          <TabsContent value="creative">
            <CreativeStep
              creative={creative}
              setCreative={setCreative}
              prevTab={prevTab}
              pageId={pageId}
              adAccountId={adAccountId}
              adSetId={adSetId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}