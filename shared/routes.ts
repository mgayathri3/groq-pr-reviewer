import { z } from "zod";
import { insertReviewSchema, reviews } from "./schema";

export const api = {
  reviews: {
    list: {
      method: "GET",
      path: "/api/reviews",
      responses: {
        200: z.array(z.custom<typeof reviews.$inferSelect>()),
      },
    },
    create: {
      method: "POST",
      path: "/api/reviews",
      input: insertReviewSchema,
      responses: {
        201: z.custom<typeof reviews.$inferSelect>(),
      },
    },
  },
  status: {
    get: {
      method: "GET",
      path: "/api/status",
      responses: {
        200: z.object({ status: z.string() }),
      },
    },
  },
};
