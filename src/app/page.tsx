'use client';
import { HeroSection } from '@/app/_components/hero-section';
import { AboutUs } from './_components/about-us';
import { Gallery } from './_components/gallery';
import { Campaign } from './_components/campaign';
import { MoreAdventures } from './_components/more-adventures';
import { useCampaign } from './_hooks/useCampaign';

export default function Home() {
  const { isValidCampaign } = useCampaign();
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Gallery />
      {isValidCampaign && <Campaign />}
      <MoreAdventures />
    </>
  );
}
