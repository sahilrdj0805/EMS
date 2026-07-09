import express from "express";
import { protect } from "../middleware/auth.js";
import { chat, generateEmail } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/chat", protect, chat);
aiRouter.post("/email", protect, generateEmail);

export default aiRouter;
