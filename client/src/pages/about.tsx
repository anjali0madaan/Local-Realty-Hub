import { Building2, Users, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const stats = [
    { label: "Properties Sold", value: "500+", icon: Building2 },
    { label: "Happy Clients", value: "1000+", icon: Users },
    { label: "Years Experience", value: "15+", icon: Award },
    { label: "5-Star Reviews", value: "800+", icon: Heart },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 via-accent/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">About Raju Property Advisor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in finding the perfect property. We've been helping families
            find their dream homes for over 15 years.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Raju Property Advisor was founded with a simple mission: to make property buying and selling
                a transparent, hassle-free experience for everyone in our community.
              </p>
              <p>
                Over the years, we've built strong relationships with property owners, builders,
                and buyers alike. Our deep understanding of the local market combined with our
                commitment to honest dealings has made us the go-to property dealer in the area.
              </p>
              <p>
                Whether you're looking for your first home, an investment property, or commercial
                space, our experienced team is here to guide you every step of the way.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
            <Building2 className="h-32 w-32 text-primary/30" />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold mb-8 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Trusted Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  15+ years of experience in the local property market with deep knowledge
                  of every neighborhood.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Personal Service</h3>
                <p className="text-sm text-muted-foreground">
                  We treat every client like family, providing personalized attention and
                  dedicated support throughout your journey.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Honest Dealings</h3>
                <p className="text-sm text-muted-foreground">
                  Transparency is our core value. No hidden fees, no surprises - just
                  honest, straightforward property dealings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
