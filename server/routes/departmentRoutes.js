import express from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { getDepartments, addDepartment, deleteDepartment } from "../controllers/departmentController.js";

const departmentRouter = express.Router();

departmentRouter.get("/", protect, getDepartments);
departmentRouter.post("/", protect, protectAdmin, addDepartment);
departmentRouter.delete("/:id", protect, protectAdmin, deleteDepartment);

export default departmentRouter;
