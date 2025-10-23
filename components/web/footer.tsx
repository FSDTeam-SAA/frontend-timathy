"use client"

import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] ">
      <div className="container px-4 sm:px-6 lg:px-8 pt-16 pb-2">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-3 mb-12">
          {/* Left - Company Info */}
          <div className="space-y-4">
             <div>
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-[60px] h-[60px]"
              />
             </div>
            <div className="space-y-2 text-[18px] text-[#E9E8E6] mt-6">
              <p>Amsterdam, The Netherlands</p>
              <p>Email: example@gmail.com</p>
            </div>
          </div>

          {/* Center - Useful Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[20px] text-[#FFFFFFFF]">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#E9E8E6] text-sm hover:text-foreground transition">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#E9E8E6] text-sm hover:text-foreground transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#E9E8E6] text-sm hover:text-foreground transition">
                  Creative Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - Other Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[20px] text-[#FFFFFFFF]">Other Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#E9E8E6] text-sm hover:text-foreground transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#E9E8E6] text-sm hover:text-foreground transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#E9E8E6] text-sm hover:text-foreground transition">
                  Terms Of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="border-t border-[#8E959F] pt-8">
          <p className="text-center text-base text-[#8E959F]">
            © 2025 <span className="text-[#FF6900]">Deal closed</span>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
