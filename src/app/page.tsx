import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import ActorsSection from '@/components/landing/ActorsSection';
import WhyStellar from '@/components/landing/WhyStellar';
import WhyFungi from '@/components/landing/WhyFungi';
import CTASection from '@/components/landing/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ActorsSection />
      <WhyStellar />
      <WhyFungi />
      <CTASection />
    </>
  );
}
