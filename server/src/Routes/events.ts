// server/src/routes/events.ts
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

// In-memory store (can be moved to separate file)
const events: any[] = [];

const router = Router();

router.post("/", (req, res) => {
  const { title, notes } = req.body;

  const text = `${title} ${notes || ""}`.toLowerCase();
  let category: "Work" | "Personal" | "Other" = "Other";

  if (text.includes("meeting") || text.includes("project")) {
    category = "Work";
  } else if (text.includes("birthday") || text.includes("family")) {
    category = "Personal";
  }

  const event = {
    id: uuidv4(),
    ...req.body,
    category,
    archived: false,
  };

  events.push(event);
  res.status(201).json(event);
});

export default router;
