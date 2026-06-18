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
  "banner-vr-02": {
    slug: "banner-vr-02",
    title: "SuriaHome RM3000 + RM1000 Rebate",
    heroHeadline: "Claim RM 3,000 + RM 1,000 Total Solar Discount, Limited time offer.",
    heroSubheadline: "",
    benefits: [
      {
        title: "RM 4,000 Instant Savings",
        description: "Combine the government rebate with our exclusive discount to save RM 4,000 upfront."
      },
      {
        title: "$0 Upfront Payment",
        description: "Start saving on your electricity bills from Day 1 without paying anything upfront."
      },
      {
        title: "We Handle Everything",
        description: "From government rebate applications to installation, we do it all for you."
      }
    ],
    ctaText: "Claim RM 3,000 + RM 1,000 (KLIMS) Discount",
    primaryColor: "bg-blue-600"
  },
};
