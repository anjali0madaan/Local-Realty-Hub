import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Home, Building2, MapPin, IndianRupee, Bed, Bath, Square, Phone, User, Star, Loader2, MessageSquare, Mail, Upload, Image } from "lucide-react";
import type { Property, Inquiry } from "@shared/schema";

function formatPrice(price: number, status: string): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} L`;
  } else {
    return price.toLocaleString("en-IN");
  }
}

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  type: string;
  status: string;
  location: string;
  area: number;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  imageUrl: string;
  features: string;
  isFeatured: boolean;
  contactPhone: string;
  contactName: string;
}

const emptyFormData: PropertyFormData = {
  title: "",
  description: "",
  price: 0,
  type: "apartment",
  status: "sale",
  location: "",
  area: 0,
  bedrooms: undefined,
  bathrooms: undefined,
  imageUrl: "",
  features: "",
  isFeatured: false,
  contactPhone: "+91 92558 19786",
  contactName: "Raju Property Advisor",
};

export default function Admin() {
  const { toast } = useToast();
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showInquiriesDialog, setShowInquiriesDialog] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>(emptyFormData);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: inquiries = [] } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const payload = {
        ...data,
        features: data.features.split(",").map((f) => f.trim()).filter(Boolean),
        bedrooms: data.bedrooms || undefined,
        bathrooms: data.bathrooms || undefined,
      };
      return apiRequest("POST", "/api/properties", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setShowAddDialog(false);
      setFormData(emptyFormData);
      toast({ title: "Success", description: "Property added successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PropertyFormData }) => {
      const payload = {
        ...data,
        features: data.features.split(",").map((f) => f.trim()).filter(Boolean),
        bedrooms: data.bedrooms || undefined,
        bathrooms: data.bathrooms || undefined,
      };
      return apiRequest("PATCH", `/api/properties/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setEditProperty(null);
      setFormData(emptyFormData);
      toast({ title: "Success", description: "Property updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Success", description: "Property deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleEdit = (property: Property) => {
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      type: property.type,
      status: property.status,
      location: property.location,
      area: property.area,
      bedrooms: property.bedrooms ?? undefined,
      bathrooms: property.bathrooms ?? undefined,
      imageUrl: property.imageUrl,
      features: property.features?.join(", ") || "",
      isFeatured: property.isFeatured,
      contactPhone: property.contactPhone,
      contactName: property.contactName,
    });
    setEditProperty(property);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = () => {
    if (editProperty) {
      updateMutation.mutate({ id: editProperty.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setEditProperty(null);
    setFormData(emptyFormData);
  };

  const isFormOpen = showAddDialog || editProperty !== null;
  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground mt-1">Add, edit, and manage your property listings</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => setShowInquiriesDialog(true)} data-testid="button-view-inquiries">
            <MessageSquare className="h-4 w-4 mr-2" />
            Inquiries ({inquiries.length})
          </Button>
          <Button onClick={() => setShowAddDialog(true)} data-testid="button-add-property">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Home className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No properties yet</h3>
            <p className="text-muted-foreground mb-4">Add your first property to get started</p>
            <Button onClick={() => setShowAddDialog(true)} data-testid="button-add-first-property">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {properties.map((property) => (
            <Card key={property.id} data-testid={`card-property-${property.id}`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full md:w-48 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{property.title}</h3>
                          {property.isFeatured && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="h-3 w-3" /> Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {property.location}
                          </span>
                          <Badge variant="outline">{property.type}</Badge>
                          <Badge variant={property.status === "sale" ? "default" : "secondary"}>
                            For {property.status === "sale" ? "Sale" : "Rent"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 font-medium text-primary">
                            <IndianRupee className="h-3 w-3" />
                            {formatPrice(property.price, property.status)}
                            {property.status === "rent" && "/mo"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="h-3 w-3" /> {property.area} sq.ft
                          </span>
                          {property.bedrooms && (
                            <span className="flex items-center gap-1">
                              <Bed className="h-3 w-3" /> {property.bedrooms} Beds
                            </span>
                          )}
                          {property.bathrooms && (
                            <span className="flex items-center gap-1">
                              <Bath className="h-3 w-3" /> {property.bathrooms} Baths
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(property)}
                          data-testid={`button-edit-property-${property.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(property.id)}
                          disabled={deleteMutation.isPending}
                          data-testid={`button-delete-property-${property.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Spacious 3BHK Apartment in Prime Location"
                data-testid="input-title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the property..."
                rows={4}
                data-testid="input-description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (INR)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="e.g., 8500000"
                  data-testid="input-price"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="area">Area (sq.ft)</Label>
                <Input
                  id="area"
                  type="number"
                  value={formData.area || ""}
                  onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                  placeholder="e.g., 1800"
                  data-testid="input-area"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="type" data-testid="select-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Listing Type</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status" data-testid="select-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Sector 54, Gurugram"
                data-testid="input-location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bedrooms">Bedrooms (optional)</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms ?? ""}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="e.g., 3"
                  data-testid="input-bedrooms"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bathrooms">Bathrooms (optional)</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms ?? ""}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="e.g., 2"
                  data-testid="input-bathrooms"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Property Image</Label>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg or upload below"
                    className="flex-1"
                    data-testid="input-imageUrl"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      data-testid="input-file-upload"
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <span>
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        <span className="ml-2">{isUploading ? "Uploading..." : "Upload"}</span>
                      </span>
                    </Button>
                  </label>
                </div>
                {formData.imageUrl && (
                  <div className="relative w-full h-32 rounded-md overflow-hidden border">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="e.g., Modular Kitchen, Parking, Power Backup"
                data-testid="input-features"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Raju Property Dealer"
                  data-testid="input-contactName"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+91 92558 19786"
                  data-testid="input-contactPhone"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                data-testid="switch-isFeatured"
              />
              <Label htmlFor="isFeatured">Mark as Featured Property</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isPending} data-testid="button-submit">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editProperty ? "Update Property" : "Add Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showInquiriesDialog} onOpenChange={setShowInquiriesDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Inquiries</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {inquiries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No inquiries yet</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry.id} data-testid={`card-inquiry-${inquiry.id}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-medium flex items-center gap-1">
                          <User className="h-4 w-4" /> {inquiry.name}
                        </span>
                        <Badge variant="outline">{inquiry.propertyId}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {inquiry.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {inquiry.phone}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{inquiry.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
