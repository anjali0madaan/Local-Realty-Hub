import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { PropertyType, PropertyStatus } from "@shared/schema";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  propertyType: PropertyType | "all";
  onTypeChange: (type: PropertyType | "all") => void;
  propertyStatus: PropertyStatus | "all";
  onStatusChange: (status: PropertyStatus | "all") => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  propertyType,
  onTypeChange,
  propertyStatus,
  onStatusChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  resultCount,
}: SearchFiltersProps) {
  const hasFilters = searchQuery || propertyType !== "all" || propertyStatus !== "all" || priceRange !== "all";

  return (
    <div className="bg-card border rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search properties..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="input-search-properties"
            />
          </div>

          <Select value={propertyType} onValueChange={(v) => onTypeChange(v as PropertyType | "all")}>
            <SelectTrigger className="w-[140px]" data-testid="select-property-type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>

          <Select value={propertyStatus} onValueChange={(v) => onStatusChange(v as PropertyStatus | "all")}>
            <SelectTrigger className="w-[120px]" data-testid="select-property-status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger className="w-[150px]" data-testid="select-price-range">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-500000">Under 5 Lakh</SelectItem>
              <SelectItem value="500000-1000000">5-10 Lakh</SelectItem>
              <SelectItem value="1000000-2500000">10-25 Lakh</SelectItem>
              <SelectItem value="2500000-5000000">25-50 Lakh</SelectItem>
              <SelectItem value="5000000-10000000">50 Lakh - 1 Cr</SelectItem>
              <SelectItem value="10000000+">Above 1 Cr</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="gap-1"
              data-testid="button-clear-filters"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground" data-testid="text-result-count">
              {resultCount} {resultCount === 1 ? "property" : "properties"} found
            </span>
          </div>
          
          {hasFilters && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  "{searchQuery}"
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
                </Badge>
              )}
              {propertyType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {propertyType}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onTypeChange("all")} />
                </Badge>
              )}
              {propertyStatus !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  For {propertyStatus}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onStatusChange("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
