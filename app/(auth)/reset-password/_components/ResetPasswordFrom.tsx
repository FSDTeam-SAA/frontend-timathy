"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/web/auth-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!formData.newPassword) {
      setError("New password is required")
      return false
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (!formData.confirmPassword) {
      setError("Please confirm your password")
      return false
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Reset Password:", formData)
      setLoading(false)
      alert("Password reset successfully!")
      router.push("/login")
    }, 1000)
  }

  return (
    <AuthLayout>
      <div className="bg-[#4B4B4B] border border-[#E7E7E7] p-6 md:p-8 rounded-[8px] shadow-[0_0_120px_0_#FF690029]">
        <h1 className="text-2xl md:text-[40px] font-bold text-[#F5F5F5] mb-2">
          Reset Password 🔒
        </h1>
        <p className="text-base text-[#AAAAAA] mb-6">Create a new password below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border-[1px] border-destructive/30 text-destructive px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* New Password Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">
              New Password
            </label>
            <Input
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">
              Confirm New Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Confirm Button */}
          <div className="pt-[32px]">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6900] text-primary-foreground font-semibold h-[49px] rounded-[8px] hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Confirm"}
            </Button>
          </div>

          {/* Back to Login */}
          <p className="text-center text-sm text-[#AAAAAA]">
            <Link href="/login" className="text-[#3F74FF] hover:underline font-medium">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}
