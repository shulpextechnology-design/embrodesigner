import { Hero } from "@/components/home/hero";
import { Categories } from "@/components/home/categories";
import { TrendingDesigns } from "@/components/home/trending-designs";
import { NewArrivals } from "@/components/home/new-arrivals";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Categories />
      <TrendingDesigns />
      <NewArrivals />
    </main>
  );
}
