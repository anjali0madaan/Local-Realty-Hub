import { type User, type InsertUser, type Property, type InsertProperty, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiriesByProperty(propertyId: string): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Map<string, Property>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.inquiries = new Map();
    this.initializeSampleProperties();
  }

  private initializeSampleProperties() {
    const sampleProperties: Property[] = [
      {
        id: "prop-1",
        title: "Spacious 3BHK Apartment in Prime Location",
        description: "A beautifully designed 3-bedroom apartment with modern amenities, located in the heart of the city. Features include modular kitchen, wooden flooring, and 24/7 security. Perfect for families looking for comfort and convenience.",
        price: 8500000,
        type: "apartment",
        status: "sale",
        location: "Sector 54, Gurugram",
        area: 1800,
        bedrooms: 3,
        bathrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        features: ["Modular Kitchen", "24/7 Security", "Parking", "Power Backup", "Gym"],
        isFeatured: true,
        contactPhone: "+91 98765 43210",
        contactName: "Rajesh Kumar"
      },
      {
        id: "prop-2",
        title: "Luxury Villa with Private Garden",
        description: "Exquisite 4-bedroom villa spread across 3500 sq.ft with private garden and swimming pool. Features marble flooring, Italian fittings, and smart home automation. An ideal residence for luxury seekers.",
        price: 35000000,
        type: "residential",
        status: "sale",
        location: "DLF Phase 1, Gurugram",
        area: 3500,
        bedrooms: 4,
        bathrooms: 4,
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        features: ["Swimming Pool", "Private Garden", "Smart Home", "Italian Marble", "Modular Kitchen", "Servant Quarters"],
        isFeatured: true,
        contactPhone: "+91 98765 43211",
        contactName: "Priya Sharma"
      },
      {
        id: "prop-3",
        title: "Modern 2BHK Flat for Rent",
        description: "Well-maintained 2-bedroom apartment available for rent. Semi-furnished with AC in all rooms, modular kitchen, and covered parking. Close to metro station and shopping malls.",
        price: 35000,
        type: "apartment",
        status: "rent",
        location: "Sector 45, Noida",
        area: 1200,
        bedrooms: 2,
        bathrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        features: ["Semi-Furnished", "AC", "Covered Parking", "Near Metro", "Gated Society"],
        isFeatured: false,
        contactPhone: "+91 98765 43212",
        contactName: "Amit Verma"
      },
      {
        id: "prop-4",
        title: "Commercial Space in IT Hub",
        description: "Prime commercial office space on the main road with excellent visibility. Ideal for IT companies, startups, or corporate offices. Features include central AC, high-speed elevators, and ample parking.",
        price: 15000000,
        type: "commercial",
        status: "sale",
        location: "Cyber City, Gurugram",
        area: 2500,
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        features: ["Central AC", "Power Backup", "High-Speed Elevator", "Cafeteria", "Conference Rooms"],
        isFeatured: true,
        contactPhone: "+91 98765 43213",
        contactName: "Vikram Singh"
      },
      {
        id: "prop-5",
        title: "Residential Plot in Developing Area",
        description: "Prime residential plot in a rapidly developing area with excellent appreciation potential. Clear title, approved layout, and ready for construction. All utilities including water and electricity available.",
        price: 4500000,
        type: "land",
        status: "sale",
        location: "Sector 95, Gurugram",
        area: 2000,
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        features: ["Clear Title", "Approved Layout", "Corner Plot", "Wide Road", "Near School"],
        isFeatured: false,
        contactPhone: "+91 98765 43214",
        contactName: "Sunita Devi"
      },
      {
        id: "prop-6",
        title: "Cozy 1BHK Studio Apartment",
        description: "Perfect starter home or investment property. Compact yet functional 1-bedroom apartment with all modern amenities. Great rental yield potential in a prime location.",
        price: 18000,
        type: "apartment",
        status: "rent",
        location: "Saket, New Delhi",
        area: 650,
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        features: ["Furnished", "Metro Nearby", "Market Area", "24/7 Water", "Security"],
        isFeatured: false,
        contactPhone: "+91 98765 43215",
        contactName: "Neha Gupta"
      },
      {
        id: "prop-7",
        title: "Premium Showroom Space",
        description: "Large commercial showroom space on a busy commercial street. High footfall area, ideal for retail business, electronics showroom, or automobile dealership. Ground floor with glass frontage.",
        price: 75000,
        type: "commercial",
        status: "rent",
        location: "MG Road, Gurugram",
        area: 3000,
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        features: ["Glass Frontage", "High Visibility", "Power Backup", "Parking", "Loading Dock"],
        isFeatured: false,
        contactPhone: "+91 98765 43216",
        contactName: "Rohit Malhotra"
      },
      {
        id: "prop-8",
        title: "Farm House with Orchard",
        description: "Beautiful farmhouse property with mango and guava orchard. Perfect weekend getaway or permanent residence for nature lovers. Includes a 3-bedroom cottage, tube well, and boundary wall.",
        price: 25000000,
        type: "land",
        status: "sale",
        location: "Sohna Road, Gurugram",
        area: 10000,
        bedrooms: 3,
        bathrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        features: ["Orchard", "Tube Well", "Boundary Wall", "Cottage", "Garden", "Farm Road Access"],
        isFeatured: true,
        contactPhone: "+91 98765 43217",
        contactName: "Harpreet Kaur"
      },
      {
        id: "prop-9",
        title: "Ready to Move 4BHK Penthouse",
        description: "Luxurious penthouse on the top floor with stunning city views. Features include a private terrace, jacuzzi, home theater room, and premium interiors. A rare find for discerning buyers.",
        price: 45000000,
        type: "apartment",
        status: "sale",
        location: "Golf Course Road, Gurugram",
        area: 4500,
        bedrooms: 4,
        bathrooms: 5,
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        features: ["Private Terrace", "Jacuzzi", "Home Theater", "City View", "Premium Interiors", "Dedicated Lift"],
        isFeatured: true,
        contactPhone: "+91 98765 43218",
        contactName: "Arjun Khanna"
      }
    ];

    sampleProperties.forEach(property => {
      this.properties.set(property.id, property);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = `prop-${randomUUID()}`;
    const property: Property = { 
      ...insertProperty, 
      id,
      isFeatured: insertProperty.isFeatured || false,
      bedrooms: insertProperty.bedrooms,
      bathrooms: insertProperty.bathrooms,
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;
    
    const updated: Property = { ...existing, ...updates };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.properties.delete(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = `inq-${randomUUID()}`;
    const inquiry: Inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiriesByProperty(propertyId: string): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).filter(
      (inquiry) => inquiry.propertyId === propertyId
    );
  }
}

export const storage = new MemStorage();
