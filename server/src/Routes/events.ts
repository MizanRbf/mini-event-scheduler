import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

// In-memory store
const events: any[] = [];

const router = Router();

// GET all events
router.get("/", (req, res) => {
  res.json(events);
});

router.post("/", (req, res) => {
  const { title, notes } = req.body;


  // Simple AI implement
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

// DELETE event by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = events.findIndex(event => event.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  events.splice(index, 1); // remove from array
  res.status(200).json({ message: "Event deleted successfully" });
});


export default router;
