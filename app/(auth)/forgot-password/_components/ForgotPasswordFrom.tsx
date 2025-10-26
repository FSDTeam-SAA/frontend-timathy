"use client"

import React, { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AuthLayout } from "@/components/web/auth-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const forgotPassMutation = useMutation({
    mutationFn: async (bodyData: { email: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send reset email")
      }

      return data
    },
    onSuccess: (data) => {
      toast.success(data?.message || "OTP sent successfully!")
      const encodedEmail = encodeURIComponent(email)
      // Navigate directly to OTP verify page
      router.push(`/otp-verify?email=${encodedEmail}`)
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong!")
      setLoading(false)
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    setLoading(true)
    forgotPassMutation.mutate(
      { email },
      {
        onSettled: () => setLoading(false),
      }
    )
  }

  return (
    <AuthLayout>
      <div className="bg-[#4B4B4B] border border-[#E7E7E7] p-6 md:p-8 rounded-[8px] shadow-[0_0_120px_0_#FF690029]">
        <h1 className="text-2xl md:text-[40px] font-bold text-[#F5F5F5] mb-2">
          Forgot Password 🔑
        </h1>
        <p className="text-base text-[#AAAAAA] mb-6">
          Enter your registered email address and we&lsquo;ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border-[1px] border-destructive/30 text-destructive px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Send Button */}
          <div className="pt-[32px]">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6900] text-primary-foreground font-semibold h-[49px] rounded-[8px] hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </div>

          {/* Back to Login */}
          <p className="text-center text-sm text-[#AAAAAA]">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-[#3F74FF] hover:underline font-medium"
            >
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}
