import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Payslip from "../models/Payslip.js";
import { askAi } from "../config/openrouter.js";

export const chat = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;
        const userId = req.session?.userId;
        const role = req.session?.role;

        const employee = await Employee.findOne({ userId });
        
        let contextData = "";
        
        if (employee) {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            
            // Get attendance summary for current month
            const attendanceRecords = await Attendance.find({
                employeeId: employee._id,
                date: {
                    $gte: new Date(currentYear, currentMonth - 1, 1),
                    $lt: new Date(currentYear, currentMonth, 1)
                }
            });
            
            const presentDays = attendanceRecords.filter(a => a.status === "PRESENT").length;
            const lateDays = attendanceRecords.filter(a => a.status === "LATE").length;
            const absentDays = attendanceRecords.filter(a => a.status === "ABSENT").length;
            const totalWorkingHours = attendanceRecords.reduce((sum, a) => sum + (a.workingHours || 0), 0);

            // Get leave summary
            const leaveApplications = await LeaveApplication.find({ employeeId: employee._id });
            const pendingLeaves = leaveApplications.filter(l => l.status === "PENDING").length;
            const approvedLeaves = leaveApplications.filter(l => l.status === "APPROVED").length;
            const rejectedLeaves = leaveApplications.filter(l => l.status === "REJECTED").length;
            
            const sickLeaves = leaveApplications.filter(l => l.type === "SICK").length;
            const casualLeaves = leaveApplications.filter(l => l.type === "CASUAL").length;
            const annualLeaves = leaveApplications.filter(l => l.type === "ANNUAL").length;

            // Get latest payslip
            const latestPayslip = await Payslip.findOne({ employeeId: employee._id }).sort({ year: -1, month: -1 });

            contextData = `
            Employee Profile:
            - Name: ${employee.firstName} ${employee.lastName}
            - Department: ${employee.department}
            - Position: ${employee.position}
            - Status: ${employee.employmentStatus}
            
            Current Month Attendance Summary:
            - Present: ${presentDays} days
            - Late: ${lateDays} days
            - Absent: ${absentDays} days
            - Total Working Hours: ${totalWorkingHours} hours
            
            Leave Summary:
            - Pending: ${pendingLeaves}
            - Approved: ${approvedLeaves}
            - Rejected: ${rejectedLeaves}
            - Breakdown: ${sickLeaves} Sick, ${casualLeaves} Casual, ${annualLeaves} Annual
            
            Latest Payslip:
            ${latestPayslip ? `- Period: ${latestPayslip.month}/${latestPayslip.year}
            - Basic Salary: ${latestPayslip.basicSalary}
            - Allowances: ${latestPayslip.allowances}
            - Deductions: ${latestPayslip.deductions}
            - Net Salary: ${latestPayslip.netSalary}` : "- No payslips found"}
            `;
        }

        const systemPrompt = `You are an AI HR Assistant for an Employee Management System. Answer employee questions accurately based on their real data.
        ${role === 'ADMIN' ? 'The user is an ADMIN with access to org-wide data. You can assist them with administrative tasks and queries.' : 'The user is an EMPLOYEE.'}
        
        Here is the user's data context:
        ${contextData}
        
        HR Policies:
        - Working hours: 9 AM to 6 PM, late after 9 AM
        - Day types: Full Day (≥8h), Three Quarter Day (6-8h), Half Day (4-6h), Short Day (<4h)
        - Leave types: SICK, CASUAL, ANNUAL
        - Auto checkout after 10 hours
        
        Instructions: Be helpful, concise, professional. Format responses with line breaks for readability. If asked about data you don't have, say you don't have that information.`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...conversationHistory,
            { role: "user", content: message }
        ];

        const aiResponse = await askAi(messages);

        res.json({ success: true, reply: aiResponse });

    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ error: "Failed to get AI response" });
    }
};

export const generateEmail = async (req, res) => {
    try {
        const { type, context } = req.body;
        const userId = req.session?.userId;
        const employee = await Employee.findOne({ userId });
        
        let prompt = "";
        const name = employee ? `${employee.firstName} ${employee.lastName}` : "Employee";
        const department = employee?.department || "Unknown";
        const position = employee?.position || "Unknown";

        switch (type) {
            case "leave_application":
                prompt = `Write a professional leave application email. Leave type: ${context.leaveType}, Dates: ${context.startDate} to ${context.endDate}, Reason: ${context.reason}. From employee: ${name}, Department: ${department}, Position: ${position}`;
                break;
            case "leave_response":
                prompt = `Write a professional email response for ${context.action} a leave application from ${context.employeeName}. Note: ${context.note}`;
                break;
            case "hr_announcement":
                prompt = `Write a professional HR announcement email about: ${context.topic}. Key points: ${context.keyPoints}`;
                break;
            case "attendance_reminder":
                prompt = `Write a professional attendance reminder email for employees. Note: ${context.note}`;
                break;
            case "custom":
                prompt = `Write a professional email. Subject hint: ${context.subjectHint}. Key points: ${context.keyPoints}. Recipient: ${context.recipient}`;
                break;
            default:
                throw new Error("Invalid email type");
        }

        const systemPrompt = "You are a professional HR email writer. Write clear, professional, concise emails. Return ONLY a JSON object with two keys: 'subject' (email subject line) and 'body' (email body in plain text with line breaks). Do not include any markdown formatting or code blocks in your response.";

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
        ];

        const responseText = await askAi(messages);
        
        let result;
        try {
            const cleanText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
            result = JSON.parse(cleanText);
        } catch (e) {
            console.error("Failed to parse AI JSON response:", responseText);
            throw new Error("Invalid response format from AI");
        }

        res.json({ success: true, subject: result.subject, body: result.body });

    } catch (error) {
        console.error("AI Email Error:", error);
        res.status(500).json({ error: "Failed to generate email" });
    }
};
