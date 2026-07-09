import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, XIcon, SendIcon, Loader2, BotIcon } from 'lucide-react';
import api from '../../api/axios';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async (messageText) => {
        if (!messageText.trim()) return;

        const userMsg = { role: 'user', content: messageText };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await api.post('/ai/chat', {
                message: messageText,
                conversationHistory: messages
            });
            
            setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the AI brain. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestedPrompt = (text) => {
        handleSend(text);
    };

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {!isOpen && (
                    <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-40 animate-pulse pointer-events-none"></div>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-14 h-14 rounded-full bg-linear-to-tr from-emerald-600 via-teal-500 to-emerald-400 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group ${!isOpen ? 'hover:shadow-emerald-500/50' : 'rotate-90 bg-slate-800'}`}
                >
                    {isOpen ? (
                        <XIcon className="w-6 h-6 -rotate-90 transition-transform" />
                    ) : (
                        <div className="relative flex items-center justify-center">
                            <BotIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            <SparklesIcon className="w-3 h-3 absolute -top-1.5 -right-2 text-yellow-300 animate-pulse" />
                        </div>
                    )}
                </button>
            </div>

            {/* Chat Panel Modal */}
            <div className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] bg-white/90 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`} style={{ height: '550px', maxHeight: 'calc(100vh - 120px)' }}>
                
                {/* Header */}
                <div className="relative bg-slate-900 px-5 py-4 shrink-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-inner">
                                <BotIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white tracking-wide text-sm">AI Assistant</h3>
                                <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-0.5 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Online & Ready
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full">
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 scroll-smooth">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col justify-end pb-2 animate-fade-in">
                            <div className="bg-white p-4 rounded-2xl rounded-bl-sm border border-slate-100 shadow-sm w-[85%] mb-6">
                                <p className="text-sm text-slate-700 leading-relaxed">Hi there! 👋 I'm your intelligent HR assistant. I can help you with your attendance, leave policies, payslips, or any other HR-related questions.</p>
                            </div>
                            
                            <div className="space-y-2">
                                <button onClick={() => handleSuggestedPrompt("📊 Check my attendance this month")} className="w-full text-xs font-medium bg-white border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all text-left shadow-sm flex items-center gap-2 group">
                                    <span className="group-hover:scale-110 transition-transform">📊</span> Check my attendance this month
                                </button>
                                <button onClick={() => handleSuggestedPrompt("🏖️ What is my leave balance?")} className="w-full text-xs font-medium bg-white border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all text-left shadow-sm flex items-center gap-2 group">
                                    <span className="group-hover:scale-110 transition-transform">🏖️</span> What is my leave balance?
                                </button>
                                <button onClick={() => handleSuggestedPrompt("💰 Give me details of my latest payslip")} className="w-full text-xs font-medium bg-white border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all text-left shadow-sm flex items-center gap-2 group">
                                    <span className="group-hover:scale-110 transition-transform">💰</span> Details of my latest payslip
                                </button>
                            </div>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col animate-fade-in ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-3 max-w-[85%] text-[13px] leading-relaxed shadow-sm
                                    ${msg.role === 'user' 
                                        ? 'bg-linear-to-br from-slate-800 to-slate-900 text-white rounded-2xl rounded-br-sm' 
                                        : 'bg-white text-slate-800 rounded-2xl rounded-bl-sm border border-slate-100'
                                    }`}
                                >
                                    {msg.content.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i !== msg.content.split('\n').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1.5 px-1">
                                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                </span>
                            </div>
                        ))
                    )}
                    
                    {loading && (
                        <div className="flex flex-col items-start animate-fade-in">
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm p-4 w-fit shadow-sm">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 transition-all shadow-inner">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(input);
                                }
                            }}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 resize-none max-h-32 min-h-[40px]"
                            rows={1}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="shrink-0 w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-emerald-500 transition-all transform active:scale-95 disabled:active:scale-100 mb-0.5 mr-0.5"
                        >
                            <SendIcon className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-slate-400 mt-2">
                        AI can make mistakes. Verify important HR info.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AIChatbot;
