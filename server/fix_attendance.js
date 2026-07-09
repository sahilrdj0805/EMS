import mongoose from "mongoose";
import "dotenv/config";
import Attendance from "./models/Attendance.js";

async function revertTodayRecord() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const tenHoursAgo = new Date(Date.now() - 10 * 60 * 60 * 1000);

        // Find records checked in within the last 10 hours that were accidentally modified
        const recentRecords = await Attendance.find({ 
            checkIn: { $gt: tenHoursAgo },
            workingHours: 4 // The signature of my accidental modification
        });

        console.log(`Found ${recentRecords.length} accidentally modified records.`);

        for (const record of recentRecords) {
            record.checkOut = null;
            record.workingHours = null;
            record.dayType = null;
            record.status = "PRESENT"; // They checked in at 7:42 AM IST, which is on time
            
            await record.save();
            console.log(`Reverted record for Employee ID: ${record.employeeId}`);
        }

        console.log("Done fixing records.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
revertTodayRecord();
