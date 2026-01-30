import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../_db";
import { inquiries } from "../../../shared/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Property ID required" });
  }

  try {
    if (req.method === "GET") {
      const propertyInquiries = await db.select().from(inquiries).where(eq(inquiries.propertyId, id));
      return res.status(200).json(propertyInquiries);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
