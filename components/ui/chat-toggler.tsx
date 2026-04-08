"use client";

import { useState, useRef, useEffect } from "react";
import { X, Bot, ArrowUp, Sparkles, ChevronRight, ArrowDown, LayoutTemplate } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Reference { title: string; url: string; description?: string; }
interface Message { role: "bot" | "user"; text: string; references?: Reference[]; }

const renderMessageText = (text: string) => {
  if (!text) return null;
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="font-semibold text-orange-400 dark:text-pink-400">{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
};

export const ChatToggler = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Chào bạn! 👋 Mình là trợ lý của **Koi Tran**.\nBạn muốn biết gì về các dự án, kỹ năng, hoặc cách liên hệ Koi?" },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 80);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("koi-chat-history");
    if (saved) { try { const p = JSON.parse(saved); if (p?.length) setMessages(p); } catch {} }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) sessionStorage.setItem("koi-chat-history", JSON.stringify(messages));
  }, [messages, isInitialized]);

  useEffect(() => {
    if (isOpen) setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, [messages, isLoading, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setMessages(p => [...p, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);
    try {
      const payloadMessages = [...messages, { role: "user", text: userMsg }]
        .slice(-6).map(m => ({ role: m.role === "bot" ? "assistant" : m.role, content: m.text }));
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: payloadMessages }) });
      const data = await res.json();
      setMessages(p => [...p, { role: "bot", text: data.reply, references: data.references }]);
    } catch {
      setMessages(p => [...p, { role: "bot", text: "Oops! Kết nối gặp lỗi, bạn thử lại nhé." }]);
    } finally { setIsLoading(false); }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <span className="absolute inset-0 rounded-2xl bg-orange-400/20 dark:bg-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-900 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <Sparkles size={18} className="text-orange-400 dark:text-pink-400" />
              <span className="text-sm font-medium text-zinc-100">Ask Koi AI</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", damping: 30, stiffness: 340 }}
            className="fixed bottom-6 right-6 w-[370px] sm:w-[430px] h-[600px] max-h-[90vh] z-[100] flex flex-col rounded-3xl overflow-hidden
              bg-white dark:bg-[#202023]
              border border-black/[0.06] dark:border-white/[0.07]
              shadow-[0_24px_64px_-16px_rgba(0,0,0,0.35)] dark:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.75)]"
          >
            {/* Subtle glows */}
            <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/5 dark:bg-pink-500/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-orange-400/5 dark:bg-pink-400/5 rounded-full blur-3xl" />
            </div>

            {/* ── HEADER ── */}
            <div className="relative z-10 flex-shrink-0 px-5 pt-5 pb-4 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.05]">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 dark:bg-pink-500/10 border border-orange-500/20 dark:border-pink-500/20 flex items-center justify-center">
                    <Bot size={20} strokeWidth={1.5} className="text-orange-400 dark:text-pink-400" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-zinc-950" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">Koi Assistant</p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 tracking-wide">Powered by Groq · LLaMA 3.3</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Divider */}
            <div className="relative z-10 mx-5 h-px bg-black/[0.06] dark:bg-white/[0.05] flex-shrink-0" />

            {/* ── MESSAGES ── */}
            <div className="relative flex-1 overflow-hidden z-10">
              <div
                ref={containerRef}
                onScroll={handleScroll}
                className="absolute inset-0 overflow-y-auto px-5 py-5 flex flex-col gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <AnimatePresence initial={false}>
                  {messages.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", damping: 24 }}
                      className={`flex flex-col gap-2.5 ${m.role === "user" ? "items-end" : "items-start"}`}
                    >
                      {/* Bubble */}
                      <div className={`flex items-end gap-2.5 max-w-[88%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                        {/* Bot mini avatar */}
                        {m.role === "bot" && (
                          <div className="w-7 h-7 shrink-0 rounded-xl bg-orange-500/10 dark:bg-pink-500/10 border border-orange-500/15 dark:border-pink-500/15 flex items-center justify-center mb-0.5">
                            <Bot size={13} className="text-orange-400 dark:text-pink-400" />
                          </div>
                        )}
                        <div className={`px-4 py-3 text-[13.5px] leading-[1.7] whitespace-pre-wrap rounded-2xl ${
                          m.role === "user"
                            ? "bg-black/[0.06] dark:bg-white/[0.09] border border-black/[0.07] dark:border-white/[0.08] text-zinc-800 dark:text-zinc-100 font-light rounded-br-md"
                            : "text-zinc-700 dark:text-zinc-300 font-light"
                        }`}>
                          {renderMessageText(m.text)}
                        </div>
                      </div>

                      {/* Reference cards */}
                      {m.references && m.references.length > 0 && (
                        <div className={`flex flex-col gap-2 w-full ${m.role === "bot" ? "pl-9" : "pr-0 items-end"}`}>
                          {m.references.map((ref, i) => (
                            <motion.a
                              key={i}
                              href={ref.url}
                              target={ref.url.startsWith("http") ? "_blank" : "_self"}
                              rel={ref.url.startsWith("http") ? "noopener noreferrer" : undefined}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06 * i }}
                              className="group flex items-center gap-3 p-3 rounded-[16px] border border-black/[0.07] dark:border-white/[0.06] bg-black/[0.03] dark:bg-white/[0.02] hover:bg-black/[0.06] dark:hover:bg-white/[0.05] hover:border-orange-500/25 dark:hover:border-pink-500/25 transition-all duration-200 cursor-pointer"
                            >
                              <div className="w-9 h-9 shrink-0 rounded-xl bg-black/[0.05] dark:bg-zinc-900 border border-black/[0.07] dark:border-white/5 flex items-center justify-center group-hover:bg-orange-500/10 dark:group-hover:bg-pink-500/10 group-hover:border-orange-500/25 dark:group-hover:border-pink-500/25 transition-all">
                                <LayoutTemplate size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:text-orange-400 dark:group-hover:text-pink-400 transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-orange-500 dark:group-hover:text-pink-300 transition-colors truncate leading-tight">{ref.title}</p>
                                {ref.description && <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-2 leading-snug">{ref.description}</p>}
                              </div>
                              <ChevronRight size={13} className="shrink-0 text-zinc-400 dark:text-zinc-600 group-hover:text-orange-400 dark:group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all" />
                            </motion.a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 shrink-0 rounded-xl bg-orange-500/10 dark:bg-pink-500/10 border border-orange-500/15 dark:border-pink-500/15 flex items-center justify-center">
                      <Bot size={13} className="text-orange-400 dark:text-pink-400" />
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-3">
                      {[0, 0.18, 0.36].map((d, i) => (
                        <motion.span key={i} className="block w-1.5 h-1.5 rounded-full bg-zinc-600"
                          animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.9, delay: d }} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={endRef} className="h-px shrink-0" />
              </div>

              {/* Scroll to bottom pill */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    onClick={() => endRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.08] text-zinc-400 text-[11.5px] hover:text-zinc-200 hover:border-white/[0.15] transition-all cursor-pointer shadow-xl backdrop-blur-sm"
                  >
                    <ArrowDown size={12} strokeWidth={2.5} />
                    <span>Xuống dưới</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Top fade gradient */}
            <div className="pointer-events-none absolute top-[88px] left-0 right-0 h-8 z-20 bg-gradient-to-b from-zinc-950/30 to-transparent" />
            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-[80px] left-0 right-0 h-8 z-20 bg-gradient-to-t from-white/50 dark:from-[#202023]/80 to-transparent" />

            {/* ── INPUT ── */}
            <div className="relative z-30 flex-shrink-0 px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 bg-black/[0.05] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl pl-4 pr-1.5 py-1.5 focus-within:border-orange-400/40 dark:focus-within:border-white/[0.15] transition-all">
                <input
                  type="text"
                  placeholder="Hỏi về dự án, kỹ năng, ..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  className="flex-1 min-w-0 bg-transparent text-[13.5px] font-light text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 border-none outline-none focus:ring-0"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 flex items-center justify-center rounded-[14px] bg-white text-zinc-950 disabled:bg-white/[0.08] disabled:text-zinc-600 hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  <ArrowUp size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); }}
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
      `}} />
    </>
  );
};
