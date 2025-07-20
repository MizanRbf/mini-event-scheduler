import express, { Express, Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());


app.get("/") 



// Route
app.get("/", (req: Request, res: Response) => {
  res.send("Mini Event Scheduler API with TypeScript is running");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});