import { Building2, Plus, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link, useLocation } from "wouter";

interface HeaderProps {
  onAddProperty: () => void;
}

export function Header({ onAddProperty }: HeaderProps) {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">Raju Property Dealer</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/">
            <span 
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="link-nav-home"
            >
              Properties
            </span>
          </Link>
          <Link href="/about">
            <span 
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === "/about" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="link-nav-about"
            >
              About Us
            </span>
          </Link>
          <Link href="/contact">
            <span 
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === "/contact" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="link-nav-contact"
            >
              Contact
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex gap-2"
            onClick={onAddProperty}
            data-testid="button-add-property"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </Button>
          <Button
            size="sm"
            className="hidden sm:flex gap-2"
            onClick={() => window.location.href = "tel:9255819786"}
            data-testid="button-call-now"
          >
            <Phone className="h-4 w-4" />
            <span>Call Now</span>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={onAddProperty}
            data-testid="button-add-property-mobile"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
