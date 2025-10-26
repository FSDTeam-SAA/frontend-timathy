"use client"

import React, { useState, FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AuthLayout } from "@/components/web/auth-layout"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function OtpVerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [verified, setVerified] = useState(false)

  const validateForm = () => {
    if (!otp.trim()) {
      setError("OTP is required")
      return false
    }
    if (!/^\d{4,6}$/.test(otp)) {
      setError("Please enter a valid 4–6 digit OTP")
      return false
    }
    return true
  }

  const otpVerifyMutation = useMutation({
    mutationFn: async (bodyData: { email: string; otp: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/verify-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "OTP verification failed")

      return data
    },
    onSuccess: (data) => {
      toast.success(data?.message || "OTP verified successfully!")
      setVerified(true)
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`)
      }, 1500)
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
    otpVerifyMutation.mutate(
      { email, otp },
      {
        onSettled: () => setLoading(false),
      }
    )
  }

  if (verified) {
    return (
      <AuthLayout>
        <div className="bg-[#4B4B4B] border border-[#E7E7E7] p-6 md:p-8 rounded-[8px] shadow-[0_0_120px_0_#FF690029]">
          <h1 className="text-2xl md:text-[40px] font-bold text-[#F5F5F5] mb-2 text-center">
            OTP Verified 🎉
          </h1>
          <p className="text-center text-base text-[#AAAAAA] mb-6">
            Your OTP has been successfully verified. Redirecting to reset your password...
          </p>
          <div className="text-center">
            <Link
              href="/login"
              className="inline-block text-[#FF6900] hover:underline font-medium transition"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="bg-[#4B4B4B] border border-[#E7E7E7] p-6 md:p-8 rounded-[8px] shadow-[0_0_120px_0_#FF690029]">
        <h1 className="text-2xl md:text-[40px] font-bold text-[#F5F5F5] mb-2">
          Verify OTP 🔐
        </h1>
        <p className="text-base text-[#AAAAAA] mb-6">
          Enter the 6-digit code we sent to <span className="text-[#F5F5F5] font-medium">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border-[1px] border-destructive/30 text-destructive px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* OTP Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">
              Enter OTP
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value)
                  setError("")
                }}
                className="gap-2"
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot 
                    index={0} 
                    className="w-[50px] h-[50px] bg-input border-[1px] border-[#AAAAAA] rounded-[8px] text-base font-medium text-[#F5F5F5]"
                  />
                  <InputOTPSlot 
                    index={1} 
                    className="w-[50px] h-[50px] bg-input border-[1px] border-[#AAAAAA] rounded-[8px] text-base font-medium text-[#F5F5F5]"
                  />
                  <InputOTPSlot 
                    index={2} 
                    className="w-[50px] h-[50px] bg-input border-[1px] border-[#AAAAAA] rounded-[8px] text-base font-medium text-[#F5F5F5]"
                  />
                  <InputOTPSlot 
                    index={3} 
                    className="w-[50px] h-[50px] bg-input border-[1px] border-[#AAAAAA] rounded-[8px] text-base font-medium text-[#F5F5F5]"
                  />
                  <InputOTPSlot 
                    index={4} 
                    className="w-[50px] h-[50px] bg-input border-[1px] border-[#AAAAAA] rounded-[8px] text-base font-medium text-[#F5F5F5]"
                  />
                  <InputOTPSlot 
                    index={5} 
                    className="w-[50px] h-[50px] bg-input border-[1px] border-[#AAAAAA] rounded-[8px] text-base font-medium text-[#F5F5F5]"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* Verify Button */}
          <div className="pt-[32px]">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6900] text-primary-foreground font-semibold h-[49px] rounded-[8px] hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>

          {/* Back to Forgot Password */}
          <p className="text-center text-sm text-[#AAAAAA]">
            Didn&apos;t receive the code?{" "}
            <Link
              href={`/forgot-password?email=${encodeURIComponent(email)}`}
              className="text-[#3F74FF] hover:underline font-medium"
            >
              Resend OTP
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}