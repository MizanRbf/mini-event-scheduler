import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

// In-memory store
const events: any[] = [];

const router = Router();

// POST events
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

// GET all events
router.get("/", (req, res) => {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  res.json(sortedEvents);
});


// UPDATE events by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { archived } = req.body;

  const index = events.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  events[index].archived = archived;
  res.status(200).json({ message: "Archived status updated", event: events[index] });
});


// DELETE events by id
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
