import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
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

// Properties table
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  type: text("type").notNull(), // residential, commercial, land, apartment
  status: text("status").notNull(), // sale, rent
  location: text("location").notNull(),
  area: integer("area").notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  imageUrl: text("image_url").notNull(),
  features: text("features").array().notNull().default(sql`'{}'::text[]`),
  isFeatured: boolean("is_featured").notNull().default(false),
  contactPhone: text("contact_phone").notNull(),
  contactName: text("contact_name").notNull(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
}).extend({
  price: z.number().min(1, "Price must be greater than 0"),
  area: z.number().min(1, "Area must be greater than 0"),
  type: z.enum(["residential", "commercial", "land", "apartment"]),
  status: z.enum(["sale", "rent"]),
  features: z.array(z.string()),
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type PropertyType = "residential" | "commercial" | "land" | "apartment";
export type PropertyStatus = "sale" | "rent";

// Inquiries table
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
}).extend({
  propertyId: z.string(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
