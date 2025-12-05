/* eslint-disable */

'use client';

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Upload, Sparkles, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreativeData } from "./MainPage";

interface CreativeStepProps {
  creative: CreativeData;
  setCreative: React.Dispatch<React.SetStateAction<CreativeData>>;
  prevTab: () => void;
  pageId: string;
  adAccountId: string;
  adSetId: string;
}

export default function CreativeStep({
  creative,
  setCreative,
  prevTab,
  pageId,
  adAccountId,
  adSetId,
}: CreativeStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const token = (session?.user as any)?.accessToken;

  // State to track if creative was successfully created and its ID
  const [creativeCreated, setCreativeCreated] = useState(false);
  const [createdCreativeId, setCreatedCreativeId] = useState<string | null>(null);

  const inputStyle = "border border-[#4B4B4B] h-12 rounded-[8px] bg-[#4B4B4B] text-white placeholder:text-gray-400";

  // Handle file selection click
  const handleFileSelect = () => inputRef.current?.click();

  // Handle file upload and generate preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCreative(prev => ({ ...prev, file, preview: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded file
  const removeFile = () => {
    setCreative(prev => ({ ...prev, file: null, preview: null }));
  };

  // Mutation: Generate ad copy using AI from website URL
  const generateAdMutation = useMutation({
    mutationFn: async (url: string) => {
      if (!url) throw new Error("Please enter a website URL");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/generate-ad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI generation failed");
      return data;
    },
    onSuccess: (data) => {
      setCreative(prev => ({
        ...prev,
        headline: data.adData?.adCreative?.headline || data.crawledData?.headings?.[0] || "Grab This Deal Now!",
        primaryText: data.adData?.adCreative?.primaryText || "Limited time offer – don't miss out!",
      }));
      toast.success("AI ad copy generated successfully!");
    },
    onError: (err: any) => toast.error(err.message || "Failed to generate ad copy"),
  });

  // Mutation: Step 1 - Create Ad Creative (Add Creative button)
  const createCreativeMutation = useMutation({
    mutationFn: async () => {
      if (!creative.file) throw new Error("Please upload an image or video");
      if (!creative.name || !creative.headline || !creative.primaryText || !creative.destinationUrl)
        throw new Error("Please fill all required fields");

      const formData = new FormData();
      formData.append("adAccountId", adAccountId);
      formData.append("pageId", pageId);
      formData.append("adSetId", adSetId);
      formData.append("ads", creative.file, creative.file.name);

      const adCreative = {
        name: creative.name,
        headline: creative.headline,
        primaryText: creative.primaryText,
        format: creative.format,
        destinationUrl: creative.destinationUrl,
        callToAction: creative.callToAction || "LEARN_MORE",
      };
      formData.append("adCreative", JSON.stringify(adCreative));

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/create-creativeAd`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        const errorMsg = result?.detail?.error?.message || result?.error || "Failed to create ad";
        throw new Error(errorMsg);
      }
      return result;
    },
    onMutate: () => toast.loading("Creating your ad creative..."),
    onSuccess: (result) => {
      toast.dismiss();
      const id = result.creativeId || result.id;
      setCreatedCreativeId(id);
      setCreativeCreated(true); // Enable Publish button

      toast.success("Ad Creative Created Successfully!", {
        description: (
          <div className="space-y-1 text-sm">
            <p>Creative ID: <code className="bg-gray-800 px-2 py-1 rounded">{id}</code></p>
            {result.name && <p>Name: {result.name}</p>}
          </div>
        ),
        duration: 12000,
      });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err.message || "Failed to create creative");
    },
  });

  // Mutation: Step 2 - Final Publish (calls /ai/final-post)
  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!createdCreativeId) throw new Error("Creative not created yet");

      const payload = {
        adCreativeId: createdCreativeId,
        adSetId: adSetId,
        adAccountId: adAccountId,
        pageId: pageId,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/final-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to publish ad");
      return data;
    },
    onMutate: () => toast.loading("Publishing your ad..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Ad Published Successfully!", {
        description: "Your ad is now live on Facebook!",
        duration: 8000,
      });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err.message || "Failed to publish ad");
    },
  });

  return (
    <Card className="p-8 bg-[#2A2A2A] border-[#4B4B4B]">
      <h2 className="text-2xl font-semibold mb-8 text-white">Create Ad Creative</h2>

      <div className="space-y-6">
        {/* Creative Name */}
        <div>
          <Label className="text-white">Creative Name</Label>
          <Input
            value={creative.name}
            onChange={e => setCreative(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Summer Sale 2025"
            className={inputStyle}
          />
        </div>

        {/* Website URL + AI Generate */}
        <div>
          <Label className="text-white">Website URL (for AI generation)</Label>
          <div className="flex gap-3">
            <Input
              value={creative.websiteUrl || ""}
              onChange={e => setCreative(prev => ({ ...prev, websiteUrl: e.target.value }))}
              placeholder="https://yourwebsite.com"
              className={inputStyle}
            />
            <Button
              onClick={() => generateAdMutation.mutate(creative.websiteUrl || "")}
              disabled={generateAdMutation.isPending || !creative.websiteUrl}
              className="bg-[#FF6900] hover:bg-[#e85e00] h-12 px-6"
            >
              {generateAdMutation.isPending ? "Generating..." : <><Sparkles className="mr-2 h-5 w-5" />Generate by AI</>}
            </Button>
          </div>
        </div>

        {/* Media Upload */}
        <div>
          <Label className="text-white">Upload {creative.format === "VIDEO" ? "Video" : "Image"}</Label>
          <input
            type="file"
            accept={creative.format === "VIDEO" ? "video/*" : "image/*"}
            ref={inputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          {!creative.preview ? (
            <div
              onClick={handleFileSelect}
              className="cursor-pointer border-2 border-dashed border-gray-500 p-10 rounded-lg text-center bg-[#3A3A3A] hover:bg-[#4B4B4B] transition-colors"
            >
              <Upload className="mx-auto mb-4 h-8 w-8 text-[#FF6900]" />
              <p className="text-white">Click to upload {creative.format === "VIDEO" ? "video" : "image"}</p>
            </div>
          ) : (
            <div className="relative max-w-2xl mx-auto">
              {creative.format === "VIDEO" ? (
                <video src={creative.preview} controls className="rounded-lg shadow-lg w-full" />
              ) : (
                <img src={creative.preview} alt="Preview" className="rounded-lg shadow-lg w-full" />
              )}
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black text-white rounded-full p-1 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Ad Format */}
        <div>
          <Label className="text-white">Ad Format</Label>
          <Select
            value={creative.format}
            onValueChange={(v: "SINGLE_IMAGE" | "VIDEO") =>
              setCreative(prev => ({ ...prev, format: v, file: null, preview: null }))
            }
          >
            <SelectTrigger className={inputStyle}><SelectValue /></SelectTrigger>
            <SelectContent className="bg-[#3A3A3A] text-white border-[#4B4B4B]">
              <SelectItem value="SINGLE_IMAGE">Single Image</SelectItem>
              <SelectItem value="VIDEO">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Headline */}
        <div>
          <Label className="text-white">Headline</Label>
          <Input
            value={creative.headline}
            onChange={e => setCreative(prev => ({ ...prev, headline: e.target.value }))}
            placeholder="e.g. 50% Off Everything!"
            className={inputStyle}
          />
        </div>

        {/* Primary Text */}
        <div>
          <Label className="text-white">Primary Text</Label>
          <textarea
            rows={6}
            value={creative.primaryText}
            onChange={e => setCreative(prev => ({ ...prev, primaryText: e.target.value }))}
            placeholder="Write an engaging ad message that grabs attention..."
            className="w-full border border-[#4B4B4B] bg-[#4B4B4B] text-white p-4 rounded-lg resize-none focus:ring-2 focus:ring-[#FF6900]"
          />
        </div>

        {/* Destination URL */}
        <div>
          <Label className="text-white">Destination URL</Label>
          <Input
            value={creative.destinationUrl}
            onChange={e => setCreative(prev => ({ ...prev, destinationUrl: e.target.value }))}
            placeholder="https://yourwebsite.com/offer"
            className={inputStyle}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex justify-between">
        <Button variant="outline" onClick={prevTab} className="border-[#FF6900] text-white hover:bg-[#FF6900]/10">
          <ChevronLeft className="mr-2" /> Back
        </Button>

        <div className="flex gap-4 items-center">
          {/* Add Creative Button */}
          <Button
            size="lg"
            onClick={() => createCreativeMutation.mutate()}
            disabled={createCreativeMutation.isPending}
            className="bg-[#FF6900] hover:bg-[#e85e00] px-10 h-[48px] rounded-[8px]"
          >
            {createCreativeMutation.isPending ? "Creating..." : "Add Creative"}
          </Button>

          {/* Publish Button - Only enabled after creative is created */}
          <Button
            size="lg"
            onClick={() => publishMutation.mutate()}
            disabled={!creativeCreated || publishMutation.isPending}
            className={`
              px-10 h-[48px] rounded-[8px] flex items-center transition-all
              ${creativeCreated 
                ? "bg-[#00D4FF] hover:bg-[#00b8e6] text-white" 
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <Upload className="mr-2 h-5 w-5" />
            {publishMutation.isPending ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </Card>
  );
}