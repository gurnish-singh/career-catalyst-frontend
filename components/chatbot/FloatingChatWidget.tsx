import React, { useState, useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { Bot } from "lucide-react";
type Message = {
    id: number;
    from: "user" | "bot";
    text: string;
};

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const sessionIdRef = useRef<string>(crypto.randomUUID());
    const [loading, setLoading] = useState(false);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            from: "user",
            text: input.trim(),
        };

        setMessages((msgs) => [...msgs, userMessage]);
        const messageText = input.trim();
        setInput("");
        setLoading(true); // Start loading

        try {
            const response = await fetch("http://localhost:3001/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    sessionId: sessionIdRef.current,
                }),
            });

            if (!response.ok) throw new Error("API request failed");

            const data = await response.json();
            const botMessage: Message = {
                id: Date.now() + 1,
                from: "bot",
                text: data?.answer || "Sorry, I couldn't understand that.",
            };

            setMessages((msgs) => [...msgs, botMessage]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages((msgs) => [
                ...msgs,
                {
                    id: Date.now() + 2,
                    from: "bot",
                    text: "Oops! Something went wrong. Please try again later.",
                },
            ]);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Open Chat"
                className="fixed bottom-6 right-6 z-50 bg-[#1428a0] hover:bg-[#0f1f7c] text-white p-4 rounded-full shadow-lg transition floating-btn"
            >
                <Bot size={24} />
            </button>


            {/* Chat Popup */}
            {open && (
                <div className="fixed bottom-20 right-6 z-50 w-80 h-[400px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#1428a0] text-white p-4 font-semibold flex justify-between items-center">
                        <div>Agent Catalyst</div>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close Chat"
                            className="font-bold text-xl leading-none"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50 flex flex-col">
                        {messages.length === 0 && (
                            <p className="text-gray-400 text-center">Say hi 👋</p>
                        )}
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`p-2 rounded-md max-w-[70%] break-words ${
                                        msg.from === "user"
                                            ? "bg-[#1428a0] text-white"
                                            : "bg-white border border-gray-300 text-gray-800"
                                    }`}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-300 text-gray-800 p-2 rounded-md max-w-[70%]">
                                    <div className="flex space-x-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        className="p-4 border-t border-gray-200 flex space-x-2"
                    >
                        <input
                            type="text"
                            className="flex-grow max-w-[70%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1428a0]"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="bg-[#1428a0] hover:bg-[#0f1f7c] text-white rounded-md px-4 py-2 transition"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
