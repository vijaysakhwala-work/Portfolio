import React from 'react';
import CubeStage from '../sections/CubeStage';
import { TrustStrip, ServicesIndex, IndustryStrip, TechStack, DemoAutomation } from '../sections/HomeA';
import { FeaturedWork, HireSection, WhySection, Credentials, Insights, FaqSection, ContactSection } from '../sections/HomeB';

export default function Home() {
  return (
    <>
      <CubeStage />
      <TrustStrip />
      <ServicesIndex />
      <IndustryStrip />
      <TechStack />
      <DemoAutomation />
      <FeaturedWork />
      <HireSection />
      <WhySection />
      <Credentials />
      <Insights />
      <FaqSection />
      <ContactSection />
    </>
  );
}
