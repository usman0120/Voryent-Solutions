import * as React from "react"
import { PricingCard } from "../../src/components/custom/pricing-card"
import { Button } from "../../src/components/ui/button"

export default function PricingExample() {
  return (
    <div className="w-full py-12 bg-muted/20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          
          <PricingCard 
            title="Starter"
            description="Perfect for small side projects."
            price="$19"
            features={[
              "1 Project",
              "10,000 requests/month",
              "Basic Support",
              { text: "Custom Domain", included: false },
              { text: "Analytics", included: false }
            ]}
          />

          <PricingCard 
            title="Pro"
            description="For professional developers and teams."
            price="$49"
            isPopular={true}
            features={[
              "Unlimited Projects",
              "100,000 requests/month",
              "Priority Support",
              "Custom Domain",
              "Advanced Analytics"
            ]}
            action={<Button className="w-full" size="lg">Start Free Trial</Button>}
          />

          <PricingCard 
            title="Enterprise"
            description="For large scale organizations."
            price="Custom"
            features={[
              "Unlimited Everything",
              "Custom SLA",
              "Dedicated Account Manager",
              "Custom Domain",
              "Advanced Analytics"
            ]}
            action={<Button variant="outline" className="w-full">Contact Sales</Button>}
          />
          
        </div>
      </div>
    </div>
  )
}
