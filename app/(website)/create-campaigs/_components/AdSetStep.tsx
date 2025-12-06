/* eslint-disable */
'use client';

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";

interface User {
  id?: string | null;
  accessToken?: string | null;
}

interface Campaign {
  _id: string;
  name: string;
  adAccountId: string;
  page: {
    pageId: string;
    pageName: string;
  };
  objective: string;
  fbCampaignId: string;
}

interface ApiResponse {
  pageId: string;
  pageName: string;
  campaigns: Campaign[];
}

interface CreateAdSetResponse {
  message: string;
  adSet: {
    _id: string;
    name: string;
    fbAdSetId: string;
    dailyBudget: number;
    status: string;
  };
}

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "JP", name: "Japan" },
  { code: "MX", name: "Mexico" },
];

interface AdSetStepProps {
  adSet: any;
  setAdSet: (adSet: any) => void;
  nextTab: (adSetId: string) => void;
  onGetAdSetId: (id: string) => void;
  prevTab: () => void;
  pageId: string;
  adAccountId: string;
}

export default function AdSetStep({
  adSet,
  setAdSet,
  nextTab,
  prevTab,
  pageId,
  adAccountId,
  onGetAdSetId,
}: AdSetStepProps) {
  const { data: session } = useSession();
  const token = (session?.user as User)?.accessToken;
  const userId = (session?.user as User)?.id;

  const inputStyle =
    "border border-[#4B4B4B] h-[48px] rounded-[8px] bg-[#4B4B4B] text-white placeholder:text-gray-400";

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["campaigns", userId, pageId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/get?userId=${userId}&pageId=${pageId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      return res.json();
    },
    enabled: !!token && !!userId && !!pageId,
  });

  const mutation = useMutation<
    CreateAdSetResponse,
    Error,
    any
  >({
    mutationFn: async (payload: any) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/create-adSet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to create ad set");
      }

      return result as CreateAdSetResponse;
    },
    onSuccess: (data) => {
      const adSetId = data.adSet._id;
      onGetAdSetId(adSetId);
      toast.success(data.message);
      nextTab(adSetId);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create ad set");
    },
  });

  const handleSubmit = () => {
    if (!selectedCampaign) {
      return toast.error("Please select a campaign");
    }

    const startDate = adSet.startDate ? new Date(adSet.startDate) : new Date();
    const endDate = adSet.endDate
      ? new Date(adSet.endDate)
      : new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    if (endDate.getTime() - startDate.getTime() < 24 * 60 * 60 * 1000) {
      return toast.error("Ad set must run for at least 24 hours");
    }

    const payload = {
      campaignId: selectedCampaign._id,
      adAccountId: selectedCampaign.adAccountId,
      pageId: selectedCampaign.page.pageId,
      name: adSet.name || "Ad Set 1",
      dailyBudget: Number(adSet.dailyBudget) || 50,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      targeting: {
        locations: adSet.targeting?.locations || [],
        ageMin: Number(adSet.targeting?.ageMin),
        ageMax: Number(adSet.targeting?.ageMax),
        gender: adSet.targeting?.gender || undefined,
      },
    };

    mutation.mutate(payload);
  };

  // Helper to remove a location
  const removeLocation = (code: string) => {
    const updated = (adSet.targeting?.locations || []).filter((c: string) => c !== code);
    setAdSet({
      ...adSet,
      targeting: { ...adSet.targeting, locations: updated },
    });
  };

  // Helper to toggle a location
  const toggleLocation = (code: string) => {
    const current = adSet.targeting?.locations || [];
    const updated = current.includes(code)
      ? current.filter((c: string) => c !== code)
      : [...current, code];

    setAdSet({
      ...adSet,
      targeting: { ...adSet.targeting, locations: updated },
    });
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Create Ad Set</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Selection */}
        <div className="md:col-span-2">
          <Label>Campaign</Label>
          <Select
            disabled={isLoading || mutation.isPending}
            onValueChange={(value) =>
              setSelectedCampaign(
                data?.campaigns.find((c) => c._id === value) || null
              )
            }
          >
            <SelectTrigger className={inputStyle}>
              <SelectValue
                placeholder={
                  isLoading ? "Loading campaigns..." : "Select a campaign"
                }
              />
            </SelectTrigger>
            <SelectContent className="text-white bg-[#3A3A3A]">
              {data?.campaigns?.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <p className="text-red-500 text-sm mt-2">Failed to load campaigns</p>
          )}
        </div>

        {/* Ad Set Name */}
        <div>
          <Label>Ad Set Name</Label>
          <Input
            value={adSet?.name || ""}
            onChange={(e) => setAdSet({ ...adSet, name: e.target.value })}
            className={inputStyle}
            placeholder="Enter ad set name"
          />
        </div>

        {/* Daily Budget */}
        <div>
          <Label>Daily Budget ($)</Label>
          <Input
            type="number"
            value={adSet?.dailyBudget || ""}
            onChange={(e) => setAdSet({ ...adSet, dailyBudget: e.target.value })}
            className={inputStyle}
            min="1"
          />
        </div>

        {/* Start Date */}
        <div>
          <Label>Start Date & Time</Label>
          <Input
            type="datetime-local"
            value={adSet?.startDate || ""}
            onChange={(e) => setAdSet({ ...adSet, startDate: e.target.value })}
            className={inputStyle}
          />
        </div>

        {/* End Date */}
        <div>
          <Label>End Date & Time (Optional)</Label>
          <Input
            type="datetime-local"
            value={adSet?.endDate || ""}
            onChange={(e) => setAdSet({ ...adSet, endDate: e.target.value })}
            className={inputStyle}
          />
        </div>

        {/* Locations – Custom Multi Select with Tags */}
        <div className="md:col-span-2">
          <Label>Locations</Label>
          <div className="relative">
            <div
              className={`${inputStyle} flex flex-wrap items-center gap-2 min-h-[48px] p-2 cursor-pointer`}
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              {(adSet?.targeting?.locations || []).length === 0 && (
                <span className="text-gray-400">Select countries</span>
              )}
              {(adSet?.targeting?.locations || []).map((code: string) => {
                const country = countries.find((c) => c.code === code);
                return (
                  <span
                    key={code}
                    className="inline-flex items-center gap-1 bg-orange-600 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {country?.name || code}
                    <X
                      className="h-4 w-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLocation(code);
                      }}
                    />
                  </span>
                );
              })}
            </div>

            {isLocationOpen && (
              <div className="absolute z-50 w-full mt-1 bg-[#3A3A3A] border border-[#4B4B4B] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {countries.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => toggleLocation(c.code)}
                    className="flex items-center px-4 py-3 hover:bg-[#4B4B4B] cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={adSet?.targeting?.locations?.includes(c.code)}
                      className="mr-3 pointer-events-none"
                    />
                    <span className="text-white">{c.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Click outside to close */}
          {isLocationOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsLocationOpen(false)}
            />
          )}
        </div>

        {/* Age Min */}
        <div>
          <Label>Age Min</Label>
          <Input
            type="number"
            min="13"
            max="65"
            value={adSet?.targeting?.ageMin ?? ""}
            onChange={(e) =>
              setAdSet({
                ...adSet,
                targeting: {
                  ...adSet.targeting,
                  ageMin: e.target.value ? Number(e.target.value) : undefined,
                },
              })
            }
            className={inputStyle}
            placeholder="Enter minimum age"
          />
        </div>

        {/* Age Max */}
        <div>
          <Label>Age Max</Label>
          <Input
            type="number"
            min="13"
            max="65"
            value={adSet?.targeting?.ageMax ?? ""}
            onChange={(e) =>
              setAdSet({
                ...adSet,
                targeting: {
                  ...adSet.targeting,
                  ageMax: e.target.value ? Number(e.target.value) : undefined,
                },
              })
            }
            className={inputStyle}
            placeholder="Enter maximum age"
          />
        </div>

        {/* Gender */}
        <div>
          <Label>Gender</Label>
          <Select
            value={adSet?.targeting?.gender?.toString() || "all"}
            onValueChange={(v) =>
              setAdSet({
                ...adSet,
                targeting: {
                  ...adSet.targeting,
                  gender: v === "all" ? undefined : Number(v),
                },
              })
            }
          >
            <SelectTrigger className={inputStyle}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="text-white bg-[#3A3A3A]">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">Male</SelectItem>
              <SelectItem value="2">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={prevTab} className="h-[48px] rounded-[8px]">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={
            mutation.isPending ||
            !selectedCampaign ||
            !adSet?.name ||
            !adSet?.dailyBudget ||
            (adSet.targeting?.locations?.length || 0) === 0
          }
          className="bg-[#FF6900] hover:bg-[#FF6900]/90 h-[48px] px-8 rounded-[8px] disabled:opacity-50"
        >
          {mutation.isPending ? "Creating..." : "Create Ad Set"}
        </Button>
      </div>
    </Card>
  );
}