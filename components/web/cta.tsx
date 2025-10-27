"use client"
import Link from "next/link"
export default function CTA() {
  return (
    <section className="bg-[#1A316B]  py-20 lg:py-[81px]">
      <div className="container px-4 sm:px-6 lg:px-0">
        <div className="text-center space-y-8 ">
          <div className="space-y-4">
            <h2 className="text-[40px] font-semibold text-[#FFFFFF] text-balance">Ready to Transform Your Advertising?</h2>
            <p className="text-base text-[#E9E8E6] max-w-2xl mx-auto">
              Join thousands of businesses that have simplified their advertising with Us.
            </p>
          </div>

        <div className="mt-3">
            <Link href="/creative-hub">
          <button className="inline-flex items-center gap-2 rounded-[8px] bg-[#FF6900] h-[48px] px-8 py-3 text-base font-semibold text-white hover:bg-orange-600 transition">
            Get Started Now
            <span>→</span>
          </button>
          </Link>
        </div>
        </div>
      </div>
    </section>
  )
}
