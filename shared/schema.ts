import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type PropertyType = "residential" | "commercial" | "land" | "apartment";
export type PropertyStatus = "sale" | "rent";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  location: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  imageUrl: string;
  features: string[];
  isFeatured: boolean;
  contactPhone: string;
  contactName: string;
}

export interface InsertProperty {
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  location: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  imageUrl: string;
  features: string[];
  isFeatured?: boolean;
  contactPhone: string;
  contactName: string;
}

export const insertPropertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  type: z.enum(["residential", "commercial", "land", "apartment"]),
  status: z.enum(["sale", "rent"]),
  location: z.string().min(3, "Location is required"),
  area: z.number().min(1, "Area must be greater than 0"),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  imageUrl: z.string().url("Must be a valid URL"),
  features: z.array(z.string()),
  isFeatured: z.boolean().optional(),
  contactPhone: z.string().min(10, "Phone number is required"),
  contactName: z.string().min(2, "Contact name is required"),
});

export interface Inquiry {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface InsertInquiry {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const insertInquirySchema = z.object({
  propertyId: z.string(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
