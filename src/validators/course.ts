// This is where we define the shape of our form

import { z } from "zod";

export const createChaptersSchema = z.object({
  title: z.string().min(3).max(100),
  units: z.array(z.string()),
  teamId: z.string().optional(),
});
