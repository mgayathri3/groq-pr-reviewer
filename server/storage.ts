import { db } from "./db";
import { reviews, type InsertReview, type Review } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class DatabaseStorage implements IStorage {
  async getReviews(): Promise<Review[]> {
    // Return empty array if DB not connected/configured properly to avoid crashing the landing page
    try {
      return await db.select().from(reviews);
    } catch (e) {
      console.warn("Database error (getReviews):", e);
      return [];
    }
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    try {
      const [review] = await db.insert(reviews).values(insertReview).returning();
      return review;
    } catch (e) {
      console.warn("Database error (createReview):", e);
      throw e;
    }
  }
}

export const storage = new DatabaseStorage();
