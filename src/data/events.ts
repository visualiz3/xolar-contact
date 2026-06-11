export interface EventConfig {
  slug: string;
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  benefits: {
    title: string;
    description: string;
  }[];
  ctaText: string;
  primaryColor: string;
}

export const EVENT_DATA: Record<string, EventConfig> = {
  "banner-vr-01": {
    slug: "banner-vr-01",
    title: "SuriaHome RM3000 Rebate",
    heroHeadline: "Claim Your RM 3,000 Government Solar Rebate",
    heroSubheadline: "Switch to solar with Xolar today and let us secure your SuriaHome rebate before the quota runs out.",
    benefits: [
      {
        title: "Instant RM 3,000 Rebate",
        description: "Subsidized directly by the government through the SuriaHome initiative."
      },
      {
        title: "Zero Upfront Cost Options",
        description: "Flexible installment plans available to ensure your savings start from Day 1."
      },
      {
        title: "Hassle-Free Application",
        description: "Our experts will handle 100% of the paperwork and quota applications for you."
      }
    ],
    ctaText: "Claim RM 3,000 Solar Rebate",
    primaryColor: "bg-blue-600"
  },
};
