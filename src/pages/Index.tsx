
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import FlatsGrid from "@/components/Flatgrid";
import PropertyTypeSection from "@/components/PropertyTypeSection";
import TestimonialSection from "@/components/TestimonialSection";
import PropertyCategorySection from "@/components/PropertyCategorySection";
import DownloadAppSection from "@/components/DownloadAppSection";
import Sellrent from "@/components/Sellrent";
import FlatsListing from "@/components/Togglebuyrent";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <FeaturedProperties />
      <PropertyTypeSection />
      <FlatsGrid />
      <PropertyCategorySection />
      <TestimonialSection />
      <Sellrent />
      <DownloadAppSection />
      <FlatsListing />
    </Layout>
  );
}
