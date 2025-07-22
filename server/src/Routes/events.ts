import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { categorizeText } from "../Utils/categorize";
// In-memory store
const events: any[] = [];
const router = Router();

// POST events
router.post("/", (req, res) => {
  try {
    const { title, notes, date, time } = req.body;
    const category = categorizeText(title, notes);
    // Basic validation
    if (!title || !date || !time) {
      return res.status(400).json({
        error: "Title, date, and time are required fields.",
      });
    }
    const event = {
      id: uuidv4(),
      title,
      date,
      time,
      notes: notes || "",
      category,
      archived: false,
    };

    events.push(event);

    // 201 Created
    return res.status(201).json(event);
  } catch (err) {
    console.error("Server Error:", err);
    // 500 Internal Server Error
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET all events
router.get("/", (req, res) => {
  try {
    if (!Array.isArray(events)) {
      return res.status(500).json({ error: "Events data is corrupted." });
    }

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }

    const sortedEvents = [...events].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    // 200 OK
    res.status(200).json(sortedEvents);
  } catch (err) {
    console.error("Error fetching events:", err);
    // 500 Internal Server Error
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// UPDATE events by id
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { archived } = req.body;

    // Validate id and archived field
    if (!id || typeof archived !== "boolean") {
      return res.status(400).json({
        error:
          "Invalid request. 'id' must be provided and 'archived' must be a boolean.",
      });
    }

    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Event not found." });
    }

    events[index].archived = archived;

    return res.status(200).json({
      message: "Archived status updated successfully.",
      event: events[index],
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE events by id
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    // Validate that id is provided
    if (!id) {
      return res.status(400).json({ error: "Event ID is required." });
    }

    const index = events.findIndex((event) => event.id === id);

    // 404 if not found
    if (index === -1) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Remove the event
    const deletedEvent = events.splice(index, 1)[0];

    // 200 OK
    return res.status(200).json({
      message: "Event deleted successfully.",
      deletedEvent,
    });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
