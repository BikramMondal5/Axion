import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { MarketplacePreview } from "@/components/marketplace-preview"
import { WorkflowTeaser } from "@/components/workflow-teaser"
import { ShowcaseSection } from "@/components/showcase-section"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MarketplacePreview />
        <WorkflowTeaser />
        <ShowcaseSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
