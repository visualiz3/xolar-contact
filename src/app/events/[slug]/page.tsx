"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { EVENT_DATA } from "@/data/events";
import { useSalesman } from "@/hooks/useSalesman";
import { EventHero } from "@/components/marketing/EventHero";
import { EventBenefits } from "@/components/marketing/EventBenefits";
import { EventLeadForm } from "@/components/marketing/EventLeadForm";
import { Suspense } from "react";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const EventPageContent = ({ params }: EventPageProps) => {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const eventConfig = EVENT_DATA[slug];

  const { salesmanInfo } = useSalesman();

  if (!eventConfig) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-neutral-900 selection:text-white">
      <EventHero 
        headline={eventConfig.heroHeadline}
        subheadline={eventConfig.heroSubheadline}
        primaryColor={eventConfig.primaryColor}
        salesmanInfo={salesmanInfo}
        ctaText={eventConfig.ctaText}
      />
      {/* <EventBenefits benefits={eventConfig.benefits} />
      <EventLeadForm 
        ctaText={eventConfig.ctaText}
        salesmanInfo={salesmanInfo}
        primaryColor={eventConfig.primaryColor}
      /> */}
    </div>
  );
};

export default function EventPage(props: EventPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <EventPageContent {...props} />
    </Suspense>
  );
}
