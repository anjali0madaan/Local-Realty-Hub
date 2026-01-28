import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertInquirySchema, type InsertInquiry, type Property } from "@shared/schema";
import { Mail, Phone, User } from "lucide-react";

interface InquiryDialogProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertInquiry) => void;
  isSubmitting: boolean;
}

export function InquiryDialog({ property, open, onOpenChange, onSubmit, isSubmitting }: InquiryDialogProps) {
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      propertyId: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (property && open) {
      form.reset({
        propertyId: property.id,
        name: "",
        email: "",
        phone: "",
        message: `I am interested in the property "${property.title}" listed for ₹${property.price.toLocaleString("en-IN")}. Please contact me with more details.`,
      });
    }
  }, [property, open, form]);

  const handleSubmit = (data: InsertInquiry) => {
    if (property) {
      onSubmit({ ...data, propertyId: property.id });
      form.reset();
    }
  };

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="dialog-inquiry">
        <DialogHeader>
          <DialogTitle className="font-serif">Send Inquiry</DialogTitle>
          <DialogDescription>
            Interested in "{property.title}"? Fill in your details and we'll get back to you.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted rounded-lg p-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{property.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{property.location}</p>
              <p className="text-sm font-semibold text-primary">
                ₹{property.price.toLocaleString("en-IN")}
                {property.status === "rent" && "/month"}
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="John Doe" className="pl-9" {...field} data-testid="input-inquiry-name" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="email" placeholder="john@example.com" className="pl-9" {...field} data-testid="input-inquiry-email" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="9876543210" className="pl-9" {...field} data-testid="input-inquiry-phone" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your requirements..."
                      className="resize-none"
                      rows={4}
                      {...field}
                      data-testid="textarea-inquiry-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel-inquiry"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting} data-testid="button-submit-inquiry">
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
