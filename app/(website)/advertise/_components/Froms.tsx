"use client"

import type React from "react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import ImageUpload from "./Uplode"
import { AdData, generateAdFromWebsite, saveAd } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function CampaignForm() {
  const [loading, setLoading] = useState(false)
  const [generatingAd, setGeneratingAd] = useState(false)
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [images, setImages] = useState<File[]>([])
  // const [creativeType, setCreativeType] = useState<"Image" | "Video">("Image")
  console.log(images)

  const [formData, setFormData] = useState<AdData>({
    campaign: {
      name: "",
      objective: "TRAFFIC",
    },
    adSet: {
      name: "",
      dailyBudget: '' as unknown as number,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      targeting: {
        locations: [],
        ageMin: 18,
        ageMax: 65,
        gender: 0,
      },
    },
    adCreative: {
      name: "",
      format: "SINGLE_IMAGE",
      primaryText: "",
      headline: "",
      destinationUrl: "",
      mediaUrls: [],
    },
  })

  const [primaryTexts, setPrimaryTexts] = useState<string[]>(["Check out our latest offers!"])
  const [newText, setNewText] = useState("")

  const handleGenerateFromWebsite = async () => {
    if (!websiteUrl) {
      toast.error("Please enter a website URL")
      return
    }

    setGeneratingAd(true)
    try {
      const response = await generateAdFromWebsite(websiteUrl)
      if (response.adCreative) {
        setFormData((prev) => ({
          ...prev,
          adCreative: {
            ...prev.adCreative,
            ...response.adCreative,
          },
        }))
        if (response.adCreative.primaryText) {
          setPrimaryTexts([response.adCreative.primaryText])
        }
      }
      if (response.campaign) {
        setFormData((prev) => ({
          ...prev,
          campaign: response.campaign,
        }))
      }
    } catch (error) {
      toast.error("Failed to generate ad from website")
      console.error(error)
    } finally {
      setGeneratingAd(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const keys = name.split(".")

    setFormData((prev) => {
      const updated = { ...prev }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = updated

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value === "true" ? true : value === "false" ? false : value

      return updated
    })
  }

  const handleAddPrimaryText = () => {
    if (newText.trim()) {
      setPrimaryTexts([...primaryTexts, newText])
      setNewText("")
    }
  }

  const handleRemovePrimaryText = (index: number) => {
    setPrimaryTexts(primaryTexts.filter((_, i) => i !== index))
  }

  const handleSelectPrimaryText = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      adCreative: {
        ...prev.adCreative,
        primaryText: text,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // if (!formData.campaign.name || !formData.adSet.name || !formData.adCreative.name) {
    //   toast.error("Please fill in all required fields")
    //   return
    // }

    setLoading(true)
    try {
      const response = await saveAd(formData)
      toast.success("Ad created successfully!")
      console.log("Ad created:", response)
      setFormData({
        campaign: { name: "", objective: "TRAFFIC" },
        adSet: {
          name: "",
          dailyBudget: 5000,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          targeting: {
            locations: [],
            ageMin: 18,
            ageMax: 65,
            gender: 0,
          },
        },
        adCreative: {
          name: "",
          format: "SINGLE_IMAGE",
          primaryText: "",
          headline: "",
          destinationUrl: "",
          mediaUrls: [],
        },
      })
      setImages([])
      setPrimaryTexts(["Check out our latest offers!"])
    } catch (error) {
      toast.error("Failed to create ad")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full bg-[#4B4B4B] text-white placeholder:text-[#AAAAAA] px-3 h-[48px] rounded-[8px] text-sm border-none focus:ring-2 focus:ring-[#AAAAAA]/50"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Website URL Section */}
      <div>
        <h3 className="text-[#F5F5F5] font-semibold text-[24px] mb-4">Advertising in a Quick Time</h3>
        <div className="flex items-center">
          <Input
            type="url"
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className={`bg-[#4B4B4B] border-none  text-white placeholder:text-[#AAAAAA] px-3 h-[48px] w-[65%] !rounded-tl-[8px] !rounded-bl-[8px]`}
          />
          <Button
            type="button"
            onClick={handleGenerateFromWebsite}
            disabled={generatingAd}
            className="w-[35%] bg-[#AAAAAA] text-white px-3 h-[48px] rounded-tr-[8px] rounded-br-[8px] text-sm hover:bg-[#AAAAAA]/80 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generatingAd ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Create a new ad
                <span>→</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-xl text-gray-400 mt-5">Or fill in the fields manually below</p>
      </div>

      {/* Image Upload */}
      <ImageUpload onImagesChange={setImages} />

      {/* Creative Type */}
      {/* <div>
        <h4 className="text-white font-semibold mb-3">Creative</h4>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <Input
              type="radio"
              name="creativeType"
              value="Image"
              checked={creativeType === "Image"}
              onChange={(e) => setCreativeType(e.target.value as "Image" | "Video")}
            />
            Image
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <Input
              type="radio"
              name="creativeType"
              value="Video"
              checked={creativeType === "Video"}
              onChange={(e) => setCreativeType(e.target.value as "Image" | "Video")}
            />
            Video
          </label>
        </div>
      </div> */}

      {/* Campaign Fields */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold">Campaign</h4>
        <Input
          type="text"
          name="campaign.name"
          placeholder="Campaign Name"
          value={formData.campaign.name}
          onChange={handleInputChange}
          className={inputClass}
        />
        <select
          name="campaign.objective"
          value={formData.campaign.objective}
          onChange={handleInputChange}
          className={inputClass}
        >
          <option value="TRAFFIC">Traffic</option>
          <option value="CONVERSIONS">Conversions</option>
          <option value="AWARENESS">Awareness</option>
        </select>
      </div>

      {/* Ad Set Fields */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold">Ad Set</h4>
        <Input
          type="text"
          name="adSet.name"
          placeholder="Ad Set Name"
          value={formData.adSet.name}
          onChange={handleInputChange}
          className={inputClass}
        />
        <Input
          type="number"
          name="adSet.dailyBudget"
          placeholder="Daily Budget"
          value={formData.adSet.dailyBudget}
          onChange={handleInputChange}
          className={inputClass}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="datetime-local"
            name="adSet.startDate"
            value={formData.adSet.startDate.slice(0, 16)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                adSet: { ...prev.adSet, startDate: new Date(e.target.value).toISOString() },
              }))
            }
            className={inputClass}
          />
          <Input
            type="datetime-local"
            name="adSet.endDate"
            value={formData.adSet.endDate.slice(0, 16)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                adSet: { ...prev.adSet, endDate: new Date(e.target.value).toISOString() },
              }))
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Primary Text Section */}
      <div>
        <h4 className="text-white font-semibold mb-3">Primary Text</h4>
        <div className="bg-[#4B4B4B] rounded p-3 space-y-2 mb-3">
          {primaryTexts.map((text, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-2 p-2 bg-slate-700 rounded cursor-pointer hover:bg-slate-600 transition"
              onClick={() => handleSelectPrimaryText(text)}
            >
              <p className="text-xs text-gray-300 flex-1">{text}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemovePrimaryText(index)
                }}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add new primary text..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleAddPrimaryText}
            className="bg-blue-600 text-white px-3 py-2 rounded-[8px] text-sm hover:bg-blue-500 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Ad Creative Fields */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold">Ad Creative</h4>
        <Input
          type="text"
          name="adCreative.name"
          placeholder="Creative Name"
          value={formData.adCreative.name}
          onChange={handleInputChange}
          className={inputClass}
        />
        <textarea
          name="adCreative.primaryText"
          placeholder="Primary Text"
          value={formData.adCreative.primaryText}
          onChange={handleInputChange}
          className="w-full bg-[#4B4B4B] text-white placeholder:text-[#AAAAAA] px-3 py-2 rounded-[8px] text-sm border-none h-[100px] focus:ring-2 focus:ring-[#AAAAAA]/50"
        />
        <Input
          type="text"
          name="adCreative.headline"
          placeholder="Headline"
          value={formData.adCreative.headline}
          onChange={handleInputChange}
          className={inputClass}
        />
        <Input
          type="url"
          name="adCreative.destinationUrl"
          placeholder="Destination URL"
          value={formData.adCreative.destinationUrl}
          onChange={handleInputChange}
          className={inputClass}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white px-3 py-2 rounded-[8px] text-sm hover:bg-blue-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating...
          </>
        ) : (
          "Rewrite"
        )}
      </button>
    </form>
  )
}
