import { MapPin, Bed, Bath, Maximize, Phone, Mail, User, X, Check, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Property } from "@shared/schema";

interface PropertyDetailsDialogProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInquire: (property: Property) => void;
}

export function PropertyDetailsDialog({
  property,
  open,
  onOpenChange,
  onInquire,
}: PropertyDetailsDialogProps) {
  if (!property) return null;

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0" data-testid="dialog-property-details">
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge className={property.status === "sale" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
              For {property.status === "sale" ? "Sale" : "Rent"}
            </Badge>
            {property.isFeatured && (
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-3xl font-bold text-white">
              {formatPrice(property.price)}
              {property.status === "rent" && <span className="text-lg font-normal">/month</span>}
            </div>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-serif">{property.title}</DialogTitle>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {property.bedrooms !== undefined && (
              <div className="flex flex-col items-center gap-1 p-3 bg-muted rounded-lg">
                <Bed className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">{property.bedrooms}</span>
                <span className="text-xs text-muted-foreground">Bedrooms</span>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="flex flex-col items-center gap-1 p-3 bg-muted rounded-lg">
                <Bath className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">{property.bathrooms}</span>
                <span className="text-xs text-muted-foreground">Bathrooms</span>
              </div>
            )}
            <div className="flex flex-col items-center gap-1 p-3 bg-muted rounded-lg">
              <Maximize className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">{property.area}</span>
              <span className="text-xs text-muted-foreground">Sq. Ft.</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Description
            </h4>
            <p className="text-sm leading-relaxed">{property.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Features & Amenities
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="bg-muted rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Contact Information
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{property.contactName}</div>
                  <div className="text-sm text-muted-foreground">Property Dealer</div>
                </div>
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => window.location.href = `tel:${property.contactPhone}`}
                  data-testid="button-call-dealer"
                >
                  <Phone className="h-4 w-4" />
                  {property.contactPhone}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1 gap-2" 
              onClick={() => onInquire(property)}
              data-testid="button-send-inquiry"
            >
              <Mail className="h-4 w-4" />
              Send Inquiry
            </Button>
            <Button variant="outline" size="icon" data-testid="button-share-property">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
