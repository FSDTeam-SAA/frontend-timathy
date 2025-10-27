// API utility functions for advertising endpoints

const API_BASE = "https://timathy-backend.onrender.com/api/v1"

export interface Campaign {
  name: string
  objective: "TRAFFIC" | "CONVERSIONS" | "AWARENESS"
}

export interface AdSet {
  name: string
  dailyBudget: number
  startDate: string
  endDate: string
  targeting: {
    locations: string[]
    ageMin: number
    ageMax: number
    gender: number
  }
}

export interface AdCreative {
  name: string
  format: "SINGLE_IMAGE" | "VIDEO" | "CAROUSEL"
  primaryText: string
  headline: string
  destinationUrl: string
  mediaUrls?: string[]
}

export interface AdData {
  campaign: Campaign
  adSet: AdSet
  adCreative: AdCreative
  ads?: File[] // ✅ to upload images or videos
}

// Generate ad content from website URL
export async function generateAdFromWebsite(url: string) {
  try {
    const response = await fetch(`${API_BASE}/ai/generate-ad`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) throw new Error(`API error: ${response.statusText}`)
    return await response.json()
  } catch (error) {
    console.error("Error generating ad:", error)
    throw error
  }
}

// ✅ Save ad campaign (fixed version)
export async function saveAd(adData: AdData) {
  try {
    const formData = new FormData()

    // Serialize nested objects as JSON strings
    formData.append("campaign", JSON.stringify(adData.campaign))
    formData.append("adSet", JSON.stringify(adData.adSet))
    formData.append("adCreative", JSON.stringify(adData.adCreative))

    // Attach uploaded files if any
    if (adData.ads && adData.ads.length > 0) {
      adData.ads.forEach((file) => formData.append("ads", file))
    }

    const response = await fetch(`${API_BASE}/ai/save`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGZjNDJhYmZlODc4MGZlNDQ3MzdhOGMiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2MTQ3MTczMywiZXhwIjoxNzYyMDc2NTMzfQ.xPMlCe5zVEwghHeW-3D_GWKnXjjqeCyZz3j1gujrY8I"}`,
        // ❌ Do NOT set Content-Type manually; browser will handle boundary
      },
      body: formData,
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`API error: ${response.statusText} - ${errText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error saving ad:", error)
    throw error
  }
}
