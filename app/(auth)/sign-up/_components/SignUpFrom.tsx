"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/web/auth-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function SignUpForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required")
      return false
    }
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid phone number")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions")
      return false
    }
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const createUserMutation = useMutation({
    mutationFn: async (body: typeof formData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to create user")
      }

      return res.json()
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Account created successfully!")
      router.push("/login")
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    createUserMutation.mutate(formData)
  }

  return (
    <AuthLayout>
      <div className="bg-[#4B4B4B] border border-[#E7E7E7] p-6 md:p-8 rounded-[8px] shadow-[0_0_120px_0_#FF690029]">
        <h1 className="text-2xl md:text-[40px] font-bold text-[#F5F5F5] mb-2">
          Create New Account ✨
        </h1>
        <p className="text-base text-[#AAAAAA] mb-6">Please enter your details below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border-[1px] border-destructive/30 text-destructive px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">Full Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">Email Address</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">Phone Number</label>
            <Input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked)
                setError("")
              }}
              className="w-4 h-4 bg-[#000000] border border-border rounded cursor-pointer accent-primary"
            />
            <span className="text-sm text-[#3F74FF]">
              I agree to the Terms & Conditions
            </span>
          </label>

          {/* Sign Up Button */}
          <div className="pt-[32px]">
            <Button
              type="submit"
              disabled={createUserMutation.isPending}
              className="w-full bg-[#FF6900] text-primary-foreground font-semibold h-[49px] rounded-[8px] hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createUserMutation.isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-[#AAAAAA]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#3F74FF] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}
