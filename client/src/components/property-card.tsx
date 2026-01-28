import { MapPin, Bed, Bath, Maximize, Heart, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onInquire: (property: Property) => void;
}

export function PropertyCard({ property, onViewDetails, onInquire }: PropertyCardProps) {
  const formatPrice = (price: number, status: string) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lakh`;
    }
    return price.toLocaleString("en-IN");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "residential":
        return "Residential";
      case "commercial":
        return "Commercial";
      case "apartment":
        return "Apartment";
      case "land":
        return "Land";
      default:
        return type;
    }
  };

  return (
    <Card 
      className="group overflow-hidden hover-elevate cursor-pointer transition-all duration-300"
      onClick={() => onViewDetails(property)}
      data-testid={`card-property-${property.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge 
            className={property.status === "sale" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}
          >
            For {property.status === "sale" ? "Sale" : "Rent"}
          </Badge>
          {property.isFeatured && (
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          )}
        </div>

        <button 
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted-foreground transition-colors hover:bg-white hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-testid={`button-favorite-${property.id}`}
        >
          <Heart className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-xl font-bold text-white">
            ₹{formatPrice(property.price, property.status)}
            {property.status === "rent" && <span className="text-sm font-normal">/month</span>}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="line-clamp-1 font-semibold text-lg group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
          {property.bedrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.area} sq.ft</span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs">
            {getTypeIcon(property.type)}
          </Badge>
          {property.features.slice(0, 2).map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {property.features.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{property.features.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className="flex-1 gap-2" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onInquire(property);
            }}
            data-testid={`button-inquire-${property.id}`}
          >
            <Phone className="h-4 w-4" />
            Inquire Now
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(property);
            }}
            data-testid={`button-view-details-${property.id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
