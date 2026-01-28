import { Search, MapPin, Home, Building, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/20 to-background py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            Raju Property Dealer - Your Trusted Local Expert
          </div>
          
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Find Your Perfect
            <span className="block text-primary">Dream Property</span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Discover the finest residential, commercial, and land properties in your area.
            We make finding your dream home simple and stress-free.
          </p>

          <form onSubmit={handleSearch} className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by location, property type..."
                className="h-12 pl-10 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-hero-search"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8" data-testid="button-hero-search">
              Search
            </Button>
          </form>

          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Residential</span>
              <span className="text-xs text-muted-foreground">50+ Properties</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Commercial</span>
              <span className="text-xs text-muted-foreground">30+ Properties</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Land</span>
              <span className="text-xs text-muted-foreground">20+ Plots</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
