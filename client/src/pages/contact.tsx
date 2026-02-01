import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 92558 19786"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["rajupropertyadvisor@gmail.com"],
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["New Janakpuri, Gali No. 1"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 via-accent/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about a property or need assistance? We're here to help.
            Reach out to us and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="font-serif text-xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-xl font-bold mb-6">Send us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-contact-name" />
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
                              <Input type="email" placeholder="john@example.com" {...field} data-testid="input-contact-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="9876543210" {...field} data-testid="input-contact-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help?" {...field} data-testid="input-contact-subject" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                              rows={5}
                              {...field}
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full gap-2" data-testid="button-send-message">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
