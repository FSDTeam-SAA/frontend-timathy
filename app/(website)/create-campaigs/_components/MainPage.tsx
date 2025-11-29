

'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignStep from "./CampaignStep";
import AdSetStep from "./AdSetStep";
import CreativeStep from "./CreativeStep";


export default function MetaAdsPage() {
    const searchParams = useSearchParams();

    // Extract from URL: ?pageId=809389022266266&adAccountId=823090990892767
    const urlPageId = searchParams.get("pageId");
    const urlAdAccountIdRaw = searchParams.get("adAccountId");
  



    const pageId = urlPageId || "";
    const adAccountId = urlAdAccountIdRaw || "";

    // Only proceed if both are present
    const isValid = pageId && adAccountId;

    const [activeTab, setActiveTab] = useState("campaign");

    const [campaign, setCampaign] = useState({
        adAccountId: adAccountId, 
        pageId: pageId,           
        name: "",
        objective: "OUTCOME_AWARENESS",
    });

    const [adSet, setAdSet] = useState({
        campaignId: undefined,
        adAccountId: adAccountId,
        pageId: pageId,
        name: "Ad Set 1",
        dailyBudget: 50,
        startDate: new Date().toISOString().slice(0, 16),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        targeting: { locations: ["US"], ageMin: 18, ageMax: 65, gender: undefined },
    });

    type CreativeData = {
        adAccountId: string;
        pageId: string;
        name: string;
        headline: string;
        primaryText: string;
        callToAction: string;
        imageFile?: File;
    };

    const [creative, setCreative] = useState<CreativeData>({
        adAccountId: adAccountId,
        pageId: pageId,
        name: "Creative 1",
        headline: "",
        primaryText: "",
        callToAction: "LEARN_MORE",
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Update states when URL params change (e.g., page reload or new link)
    useEffect(() => {
        if (isValid) {
            setCampaign(prev => ({ ...prev, adAccountId, pageId }));
            setAdSet(prev => ({ ...prev, adAccountId, pageId }));
            setCreative(prev => ({ ...prev, adAccountId, pageId }));
        }
    }, [adAccountId, pageId, isValid]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCreative(prev => ({ ...prev, imageFile: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextTab = () => {
        if (activeTab === "campaign") setActiveTab("adset");
        else if (activeTab === "adset") setActiveTab("creative");
    };

    const prevTab = () => {
        if (activeTab === "creative") setActiveTab("adset");
        else if (activeTab === "adset") setActiveTab("campaign");
    };

    const submitAll = () => {
        const data = {
            campaign,
            adSet: { ...adSet, campaignId: "TEMP-ID" },
            creative,
        };
        console.log("FINAL DATA:", data);
        alert("Check console for final data!");
    };

    // Optional: Show loading or error if params missing
    if (!isValid) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-xl mb-4">Missing required parameters</p>
                    <p>Please access this page with correct URL:</p>
                    <code className="bg-gray-800 px-4 py-2 rounded block mt-2">
                        ?pageId=YOUR_PAGE_ID&adAccountId=YOUR_AD_ACCOUNT_ID
                    </code>
                </div>
            </div>
        );
    }

    return (
        <div className="!bg-[#4B4B4B3D]/25 min-h-screen">
            <div className="max-w-7xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-white">
                    Meta Ads Builder
                </h1>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-6 bg-[#4B4B4B] h-[56px] rounded-none">
                        <TabsTrigger
                            value="campaign"
                            className="rounded-none bg-transparent text-white data-[state=active]:border-b-2 data-[state=active]:border-[#FF6900] data-[state=active]:font-semibold"
                        >
                            1. Campaign
                        </TabsTrigger>
                        <TabsTrigger
                            value="adset"
                            className="rounded-none bg-transparent text-white data-[state=active]:border-b-2 data-[state=active]:border-[#FF6900] data-[state=active]:font-semibold"
                        >
                            2. Ad Set
                        </TabsTrigger>
                        <TabsTrigger
                            value="creative"
                            className="rounded-none bg-transparent text-white data-[state=active]:border-b-2 data-[state=active]:border-[#FF6900] data-[state=active]:font-semibold"
                        >
                            3. Creative
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="campaign">
                        <CampaignStep campaign={campaign} setCampaign={setCampaign} nextTab={nextTab} />
                    </TabsContent>

                    <TabsContent value="adset">
                        <AdSetStep adSet={adSet} setAdSet={setAdSet} nextTab={nextTab} prevTab={prevTab} />
                    </TabsContent>

                    <TabsContent value="creative">
                        <CreativeStep
                            creative={creative}
                            setCreative={setCreative}
                            imagePreview={imagePreview}
                            handleImageUpload={handleImageUpload}
                            prevTab={prevTab}
                            submitAll={submitAll}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}