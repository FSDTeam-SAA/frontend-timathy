"use client"

import { Clock, Zap, ImageIcon,  BarChart3, Layers, Edit } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Quick Campaign Creation",
    description: "Create complete ad campaigns in 3-5 minutes instead of spending hours on manual setup.",
  },
  {
    icon: Zap,
    title: "AI-Generated Ad Copy",
    description: "Automatically generate compelling copy and headlines based on your website content.",
  },
  {
    icon: Layers,
    title: "Creative Hub",
    description: "Store, manage, and reuse creative assets across all your campaigns.",
  },
  {
    icon: Edit,
    title: "Ad Editing & Preview",
    description: "Edit targeting, images, and copy before publishing with real-time previews.",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Monitor ad spend, cost per lead, and conversion metrics in one dashboard.",
  },
  {
    icon: ImageIcon,
    title: "Free Resources",
    description: "Access Shutterstock images and AI-generated creatives at no extra cost.",
  },
]

export default function Features() {
  return (
    <section className="bg-[#1E1E1E] py-20 lg:py-[85px]">
      <div className=" container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Powerful Features</h2>
          <p className="text-base text-[#AAAAAA] font-normal max-w-7xl mx-auto">
            Everything you need to create, manage and optimize your ad campaigns. Streamline your workflow with powerful
            automation tools. Achieve better performance and measurable results effortlessly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="rounded-xl bg-[#4B4B4B] border border-[#1A316B] p-8 hover:border-[#2563EB]/50 transition"
              >
                <Icon className="w-8 h-8 text-accent mb-4 text-[#2563EB]" />
                <h3 className="text-2xl font-semibold text-[#F5F5F5] mb-3">{feature.title}</h3>
                <p className="text-[#AAAAAA] text-base font-normal leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
