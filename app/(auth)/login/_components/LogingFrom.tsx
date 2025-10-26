"use client"

import React, { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { AuthLayout } from "@/components/web/auth-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
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
    if (!password) {
      setError("Password is required")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    try {
      setLoading(true)

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        throw new Error(res.error)
      }

      toast.success("Login Successfully!")
      router.push("/")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : typeof err === "string" ? err : "Login failed. Please try again."
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="bg-[#4B4B4B] border border-[#E7E7E7] p-6 md:p-8 rounded-[8px] shadow-[0_0_120px_0_#FF690029]">
        <h1 className="text-2xl md:text-[40px] font-bold text-[#F5F5F5] mb-2">
          Welcome 👋
        </h1>
        <p className="text-base text-[#AAAAAA] mb-6">Please login here</p>

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

          {/* Password Field */}
          <div>
            <label className="block text-[#F5F5F5] font-medium text-[18px] mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              required
              className="w-full px-4 bg-input border-[1px] border-[#AAAAAA] rounded-[8px] h-[50px] !text-base font-medium transition placeholder:text-[#AAAAAA]"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-[#000000] border border-border rounded cursor-pointer accent-primary"
              />
              <span className="text-sm text-[#3F74FF]">Remember Me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-normal text-[#FF0000] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="pt-[32px]">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6900] text-primary-foreground font-semibold h-[49px] rounded-[8px] hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don&lsquo;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}
