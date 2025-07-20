// server/src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./Routes/events"; //  Route import

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use routes
app.use("/events", eventRoutes); //  All routes under /events

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Mini Event Scheduler API with TypeScript is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
