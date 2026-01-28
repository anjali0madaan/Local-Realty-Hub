import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { HeroSection } from "@/components/hero-section";
import { SearchFilters } from "@/components/search-filters";
import { PropertyCard } from "@/components/property-card";
import { PropertyDetailsDialog } from "@/components/property-details-dialog";
import { AddPropertyDialog } from "@/components/add-property-dialog";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { PropertyGridSkeleton } from "@/components/property-skeleton";
import { EmptyState } from "@/components/empty-state";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Property, PropertyType, PropertyStatus, InsertProperty, InsertInquiry } from "@shared/schema";

interface HomeProps {
  showAddDialog: boolean;
  onShowAddDialogChange: (show: boolean) => void;
}

export default function Home({ showAddDialog, onShowAddDialogChange }: HomeProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | "all">("all");
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus | "all">("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const addPropertyMutation = useMutation({
    mutationFn: (data: InsertProperty) => apiRequest("POST", "/api/properties", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      onShowAddDialogChange(false);
      toast({
        title: "Property Added",
        description: "Your property has been successfully listed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addInquiryMutation = useMutation({
    mutationFn: (data: InsertInquiry) => apiRequest("POST", "/api/inquiries", data),
    onSuccess: () => {
      setShowInquiryDialog(false);
      setInquiryProperty(null);
      toast({
        title: "Inquiry Sent",
        description: "We've received your inquiry and will contact you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        !searchQuery ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = propertyType === "all" || property.type === propertyType;
      const matchesStatus = propertyStatus === "all" || property.status === propertyStatus;

      let matchesPrice = true;
      if (priceRange !== "all") {
        if (priceRange === "10000000+") {
          matchesPrice = property.price >= 10000000;
        } else {
          const [min, max] = priceRange.split("-").map(Number);
          matchesPrice = property.price >= min && property.price <= max;
        }
      }

      return matchesSearch && matchesType && matchesStatus && matchesPrice;
    });
  }, [properties, searchQuery, propertyType, propertyStatus, priceRange]);

  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [filteredProperties]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setPropertyType("all");
    setPropertyStatus("all");
    setPriceRange("all");
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setShowDetailsDialog(true);
  };

  const handleInquire = (property: Property) => {
    setInquiryProperty(property);
    setShowInquiryDialog(true);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold mb-2">Available Properties</h2>
          <p className="text-muted-foreground">
            Browse our collection of premium properties in your area
          </p>
        </div>

        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          propertyType={propertyType}
          onTypeChange={setPropertyType}
          propertyStatus={propertyStatus}
          onStatusChange={setPropertyStatus}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          onClearFilters={handleClearFilters}
          resultCount={sortedProperties.length}
        />

        {isLoading ? (
          <PropertyGridSkeleton count={6} />
        ) : sortedProperties.length === 0 ? (
          <EmptyState
            title="No Properties Found"
            description="We couldn't find any properties matching your criteria. Try adjusting your filters or add a new property."
            actionLabel="Clear Filters"
            onAction={handleClearFilters}
            icon="search"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewDetails}
                onInquire={handleInquire}
              />
            ))}
          </div>
        )}
      </section>

      <PropertyDetailsDialog
        property={selectedProperty}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        onInquire={handleInquire}
      />

      <AddPropertyDialog
        open={showAddDialog}
        onOpenChange={onShowAddDialogChange}
        onSubmit={(data) => addPropertyMutation.mutate(data)}
        isSubmitting={addPropertyMutation.isPending}
      />

      <InquiryDialog
        property={inquiryProperty}
        open={showInquiryDialog}
        onOpenChange={setShowInquiryDialog}
        onSubmit={(data) => addInquiryMutation.mutate(data)}
        isSubmitting={addInquiryMutation.isPending}
      />
    </div>
  );
}
