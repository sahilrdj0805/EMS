import axios from "axios";

export const askAi = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Invalid messages array");
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: messages,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "Employee Management System",
                },
                timeout: 60000,
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;
        if (!content || !content.trim()) {
            throw new Error("Empty response from AI service");
        }

        return content;
    } catch (error) {
        console.error(
            "OpenRouter AI error:",
            error?.response?.data || error.message
        );
        throw error;
    }
};
