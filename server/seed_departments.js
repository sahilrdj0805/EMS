import mongoose from "mongoose";
import "dotenv/config";
import Department from "./models/Department.js";
import { DEPARTMENTS } from "./constants/departments.js";

async function seedDepartments() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        for (const deptName of DEPARTMENTS) {
            const existing = await Department.findOne({ name: deptName });
            if (!existing) {
                await Department.create({ name: deptName, description: "Default department" });
                console.log(`Created department: ${deptName}`);
            }
        }

        console.log("Department seeding complete.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}
seedDepartments();
