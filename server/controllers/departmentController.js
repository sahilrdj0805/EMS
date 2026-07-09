import Department from "../models/Department.js";

// Get all departments
// GET /api/departments
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().sort({ name: 1 });
        return res.json(departments);
    } catch (error) {
        console.error("Fetch departments error:", error);
        return res.status(500).json({ error: "Failed to fetch departments" });
    }
};

// Add new department
// POST /api/departments
export const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Department name is required" });
        }

        const existing = await Department.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
        if (existing) {
            return res.status(400).json({ error: "Department already exists" });
        }

        const department = await Department.create({ name: name.trim(), description });
        return res.status(201).json({ success: true, department });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Department already exists" });
        }
        console.error("Add department error:", error);
        return res.status(500).json({ error: "Failed to add department" });
    }
};

// Delete department
// DELETE /api/departments/:id
export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndDelete(id);
        
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        
        return res.json({ success: true });
    } catch (error) {
        console.error("Delete department error:", error);
        return res.status(500).json({ error: "Failed to delete department" });
    }
};
