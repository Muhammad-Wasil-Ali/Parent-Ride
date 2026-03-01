import { z } from "zod";

export const citySchema = z.object({
  cityName: z.string().min(3),
});
