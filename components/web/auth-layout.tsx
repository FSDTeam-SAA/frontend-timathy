"use client"

import Image from "next/image"
import type { ReactNode } from "react"


interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className=" lg:min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-[1170px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Logo Section */}
          <div className="hidden md:flex justify-center">
            <Image
              src="/assets/logo.png"    
              alt="Logo"
              width={1000}
              height={1000}  
              className="w-[364px] h-[372px]"          
            />
          </div>

          {/* Mobile Logo */}
          <div className="md:hidden mb-6">
            {/* <AuthLogo /> */}
          </div>

          {/* Form Section */}
          <div className="w-full md:col-span-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
