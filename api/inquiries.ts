import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_db";
import { inquiries, insertInquirySchema } from "../shared/schema";
import { ZodError } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const allInquiries = await db.select().from(inquiries);
      return res.status(200).json(allInquiries);
    }

    if (req.method === "POST") {
      const validatedData = insertInquirySchema.parse(req.body);
      const [newInquiry] = await db.insert(inquiries).values({
        ...validatedData,
        id: crypto.randomUUID(),
      }).returning();
      return res.status(201).json(newInquiry);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
