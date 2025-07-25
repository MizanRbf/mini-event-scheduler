"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Route
app.get("/", (req, res) => {
    res.send("Mini Event Scheduler API with TypeScript is running");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
