"use client"

export default function WhyChooseUs() {
  return (
    <section className="bg-[#4B4B4B66]/40 py-20 lg:py-[65px]">
      <div className=" container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-[40px] font-semibold text-[#F5F5F5] mb-4 text-balance">Why You Choose Us?</h2>
          <p className="text-base text-[#AAAAAA] max-w-2xl mx-auto">
            Our AI-driven platform eliminates the complexity of digital advertising, saving you time and maximizing your
            ROI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-[#1E1E1E] border border-[#1A316B]/40 p-8">
            <div className="text-5xl font-bold text-[#2563EB] mt-2 mb-3">3-6</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Minutes</h3>
            <p className="text-[#AAAAAA] text-base leading-relaxed">
              Create professional ad campaigns in minutes instead of hours
            </p>
          </div>

          <div className="rounded-xl bg-[#1E1E1E] border border-[#1A316B]/40 p-8">
            <div className="text-5xl font-bold text-[#2563EB] mt-2 mb-3">100%</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Autonomous</h3>
            <p className="text-[#AAAAAA] text-base leading-relaxed">
              AI handles targeting, optimization, and performance testing
            </p>
          </div>

          <div className="rounded-xl bg-[#1E1E1E] border border-[#1A316B]/40 p-8">
            <div className="text-5xl font-bold text-[#2563EB] mt-2 mb-3">$0</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Agency Fees</h3>
            <p className="text-[#AAAAAA] text-base leading-relaxed">
              Eliminate expensive agency costs while improving results
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
