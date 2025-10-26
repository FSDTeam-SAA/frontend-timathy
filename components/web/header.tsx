"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {  status } = useSession(); 

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const isAuthenticated = status === "authenticated";

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut({ callbackUrl: "/" });
    }
    setIsOpen(false); // close mobile drawer
  };

  return (
    <header className="border-b border-[#FF6900] bg-[#1E1E1E] sticky top-0 z-50">
      <div className="container px-4 sm:px-6 lg:px-8 py-[10px]">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={1000}
                height={1000}
                className="w-[60px] h-[60px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#F5F5F5] text-[18px] font-medium transition hover:text-[#FF6900]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ---------- AUTH BUTTON (visible on ALL devices) ---------- */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="rounded-[8px] bg-[#FF6900] px-[45px] h-[48px] text-base font-semibold text-[#FFFFFF] hover:bg-orange-600 transition"
            >
              {isAuthenticated ? (
                <button onClick={handleAuthClick}>Logout</button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </Button>

            {/* ---------- MOBILE MENU ---------- */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button className="p-2 text-[#F5F5F5] hover:text-[#FF6900] transition">
                  <Menu size={24} />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-[#1E1E1E] border-l border-[#FF6900]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[#F5F5F5] text-lg font-medium transition hover:text-[#FF6900]"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile auth button (same logic as desktop) */}
                  <Button
                    asChild
                    className="rounded-[8px] bg-[#FF6900] h-[48px] text-base font-semibold text-[#FFFFFF] hover:bg-orange-600 transition w-full"
                  >
                    {isAuthenticated ? (
                      <button onClick={handleAuthClick}>Logout</button>
                    ) : (
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}