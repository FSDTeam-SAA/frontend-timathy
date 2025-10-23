import CTA from "@/components/web/cta";
import Features from "@/components/web/features";
import Hero from "@/components/web/hero";
import WhyChooseUs from "@/components/web/why-choose-us";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
     
      <Hero />
      <WhyChooseUs />
      <Features />
      <CTA />
    
    </main>
  )
}
