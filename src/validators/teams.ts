import { z } from "zod";

export const createTeamsSchema = z.object({
    name: z.string().min(3).max(100),
})
