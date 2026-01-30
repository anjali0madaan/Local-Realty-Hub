import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../_db";
import { properties, insertPropertySchema } from "../../shared/schema";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS");
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
      const [property] = await db.select().from(properties).where(eq(properties.id, id));
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      return res.status(200).json(property);
    }

    if (req.method === "PATCH") {
      const partialSchema = insertPropertySchema.partial();
      const validatedData = partialSchema.parse(req.body);
      const [updated] = await db.update(properties).set(validatedData).where(eq(properties.id, id)).returning();
      if (!updated) {
        return res.status(404).json({ message: "Property not found" });
      }
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const [deleted] = await db.delete(properties).where(eq(properties.id, id)).returning();
      if (!deleted) {
        return res.status(404).json({ message: "Property not found" });
      }
      return res.status(204).end();
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
