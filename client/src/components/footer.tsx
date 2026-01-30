import { Building2, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl font-bold">Raju Property Dealer</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted local property expert. We help you find your dream home with ease and confidence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    Browse Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Residential
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Commercial
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Apartments
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Land & Plots
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 92558 19786</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>rajupropertydealer@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>New Janakpuri, Gali No. 1</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Raju Property Dealer. All rights reserved.</p>
          <p className="mt-2">Developed by Anjali Software Services</p>
        </div>
      </div>
    </footer>
  );
}
