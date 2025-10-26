"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[#1E1E1E] py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-bold leading-tight text-[#F5F5F5]">
                AI-Powered Advertising Made Simple
              </h1>
              <p className="text-sm sm:text-base text-[#AAAAAA] font-normal pt-4 sm:pt-6 max-w-xl mx-auto lg:mx-0">
                Build powerful campaigns in minutes. Collaborate, create, and
                track everything in one place. Your campaign, your way — from
                start to success.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link href="/creative-hub">
              <button className="inline-flex items-center gap-2 rounded-[8px] h-[48px] bg-[#FF6900] px-8 py-3 text-base font-semibold text-white hover:bg-[#FF6900]/90 transition">
                Get Started
                <span>→</span>
              </button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:gap-[34px] sm:grid-cols-2 pt-[32px]">
              {/* Card 1 */}
              <div className="rounded-[16px] bg-[#4B4B4B] p-6 text-left">
                <div className="flex items-center justify-between pb-[40px] sm:pb-[56px]">
                  <div className="text-2xl sm:text-3xl font-bold text-[#3F74FF] mb-2">
                    50K +
                  </div>
                  <div>
                    <Image
                      src="/assets/avater.png"
                      alt="Clients"
                      width={159}
                      height={38}
                      className="w-[120px] sm:w-[159px] h-auto object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
                  Our clients are at the heart of everything we do. We deliver
                  results that inspire trust and loyalty.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-[16px] bg-[#4B4B4B] p-6 text-left">
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-bold text-[#3F74FF] mb-2">
                    100K +
                  </div>
                  <div>
                    <Image
                      src="/assets/avater2.png"
                      alt="Clients"
                      width={112}
                      height={112}
                      className="w-[80px] sm:w-[112px] h-auto object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#AAAAAA] pt-3 leading-relaxed">
                  Smart. Fast. Effortless. Let AI design stunning ads that
                  captivate your audience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Video */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl border-2 border-[#23408C] overflow-hidden bg-gradient-to-br from-accent/10 to-transparent h-[300px] sm:h-[400px] lg:h-[624px]">
              <video
                src="/assets/hero1.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-[#FF6900]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FF6900]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FF6900]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
