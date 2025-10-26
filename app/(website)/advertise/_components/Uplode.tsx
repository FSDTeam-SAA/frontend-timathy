"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X } from "lucide-react"

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void
  maxImages?: number
}

export default function ImageUpload({ onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [previews, setPreviews] = useState<Array<{ file: File; preview: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => file.type.startsWith("image/"))

    if (previews.length + validFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    const newPreviews = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    const updatedPreviews = [...previews, ...newPreviews]
    setPreviews(updatedPreviews)
    onImagesChange(updatedPreviews.map((p) => p.file))

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index)
    setPreviews(newPreviews)
    onImagesChange(newPreviews.map((p) => p.file))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-semibold">Images</h4>
        <span className="text-xs text-gray-400">
          {previews.length}/{maxImages}
        </span>
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-slate-600 text-white px-3 py-2 rounded text-sm hover:bg-slate-500 transition flex items-center justify-center gap-2"
      >
        <span>+</span> Add Images
      </button>

      <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {previews.map((item, index) => (
            <div key={index} className="relative group">
              <img
                src={item.preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded bg-slate-600"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">At least 1 landscape image or 1 square image</p>
    </div>
  )
}
