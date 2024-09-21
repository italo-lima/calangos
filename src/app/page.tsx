'use client';
import { HeroSection } from '@/app/_components/hero-section';
import { AboutUs } from './_components/about-us';
import { Gallery } from './_components/gallery';
import { Campaign } from './_components/campaign';
import { MoreAdventures } from './_components/more-adventures';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Gallery />
      <Campaign />
      <MoreAdventures />
    </>
  );
}
