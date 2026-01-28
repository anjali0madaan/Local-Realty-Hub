import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { insertPropertySchema, type InsertProperty } from "@shared/schema";
import { z } from "zod";

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertProperty) => void;
  isSubmitting: boolean;
}

const formSchema = insertPropertySchema.extend({
  features: z.string().transform((val) => val.split(",").map((s) => s.trim()).filter(Boolean)),
});

export function AddPropertyDialog({ open, onOpenChange, onSubmit, isSubmitting }: AddPropertyDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      type: "residential",
      status: "sale",
      location: "",
      area: 0,
      bedrooms: undefined,
      bathrooms: undefined,
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      features: "",
      isFeatured: false,
      contactPhone: "",
      contactName: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data as InsertProperty);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-add-property">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Add New Property</DialogTitle>
          <DialogDescription>
            Fill in the details below to list a new property.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Beautiful 3BHK Apartment" {...field} data-testid="input-property-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-add-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-add-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 5000000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-property-price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (sq.ft)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 1500"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-property-area"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sector 15, Gurugram" {...field} data-testid="input-property-location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 3"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        data-testid="input-property-bedrooms"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 2"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        data-testid="input-property-bathrooms"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the property in detail..."
                      className="resize-none"
                      rows={4}
                      {...field}
                      data-testid="textarea-property-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Parking, Garden, Security, Gym"
                      {...field}
                      data-testid="input-property-features"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} data-testid="input-property-image" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} data-testid="input-contact-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 9876543210" {...field} data-testid="input-contact-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="checkbox-is-featured"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mark as Featured Property</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Featured properties appear at the top of search results
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel-add"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting} data-testid="button-submit-property">
                {isSubmitting ? "Adding..." : "Add Property"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
