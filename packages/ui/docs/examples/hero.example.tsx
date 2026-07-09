import * as React from "react"
import { HeroComponent } from "../../src/components/custom/hero-component"
import { Button } from "../../src/components/ui/button"

export default function HeroExample() {
  return (
    <div className="w-full relative">
      <HeroComponent 
        title={
          <>
            Build your next idea <br className="hidden sm:block" />
            <span className="text-primary">with Voryent</span>
          </>
        }
        subtitle="The ultimate enterprise design system built with Tailwind CSS, React, and Radix UI. Start building your next great application today."
        primaryAction={
          <Button size="lg" className="px-8 font-semibold">
            Get Started
          </Button>
        }
        secondaryAction={
          <Button size="lg" variant="outline" className="px-8">
            Documentation
          </Button>
        }
        pattern={true}
      />
    </div>
  )
}
