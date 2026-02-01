import { db } from "./db";
import { properties } from "@shared/schema";

const sampleProperties = [
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  },
  {
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
    contactPhone: "+91 92558 19786",
    contactName: "Raju Property Advisor"
  }
];

async function seed() {
  console.log("Checking existing properties...");
  const existing = await db.select().from(properties);
  
  if (existing.length === 0) {
    console.log("Seeding sample properties...");
    await db.insert(properties).values(sampleProperties);
    console.log("Seeded", sampleProperties.length, "properties");
  } else {
    console.log("Properties already exist, skipping seed");
  }
}

seed()
  .then(() => {
    console.log("Seed complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
