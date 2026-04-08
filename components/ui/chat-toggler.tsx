"use client";

import { useState, useRef, useEffect } from "react";
import { X, Bot, ArrowUp, Sparkles, ChevronRight, ArrowDown, LayoutTemplate } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";

interface Reference { title: string; url: string; description?: string; }
interface Message { role: "bot" | "user"; text: string; references?: Reference[]; }

const renderMessageText = (text: string) => {
  if (!text) return null;
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="font-medium text-orange-500 dark:text-pink-400">{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
};

export const ChatToggler = () => {
  const { colorMode } = useColorMode();
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
    <div className={colorMode === "dark" ? "dark" : ""}>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-2xl bg-orange-400/20 dark:bg-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <Sparkles size={18} className="text-orange-500 dark:text-pink-400" />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Ask Koi AI</span>
            </div>
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
            className="fixed bottom-6 right-6 w-[370px] sm:w-[420px] h-[600px] max-h-[90vh] z-[100] flex flex-col rounded-[28px] overflow-hidden
              bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl
              border border-black/[0.04] dark:border-white/[0.05]
              shadow-[0_24px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)]"
          >
            {/* ── HEADER ── */}
            <div className="relative z-10 flex-shrink-0 px-6 pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Bot size={20} strokeWidth={1.5} className="text-zinc-800 dark:text-zinc-200" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-[1.5px] border-white dark:border-zinc-900" />
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-zinc-800 dark:text-zinc-100 leading-tight">Koi Assistant</p>
                  <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 mt-0.5 tracking-wide font-light">Powered by Groq LLaMA</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-all">
                <X size={18} />
              </button>
            </div>

            {/* ── MESSAGES ── */}
            <div className="relative flex-1 overflow-hidden z-10">
              <div
                ref={containerRef}
                onScroll={handleScroll}
                className="absolute inset-0 overflow-y-auto px-6 py-5 flex flex-col gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                          <div className="w-7 h-7 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-0.5">
                            <Bot size={13} className="text-zinc-800 dark:text-zinc-300" />
                          </div>
                        )}
                        <div className={`px-4 py-3 text-[14px] leading-[1.6] whitespace-pre-wrap rounded-[20px] ${
                          m.role === "user"
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 font-normal rounded-br-[6px]"
                            : "bg-white/60 dark:bg-zinc-800/40 border border-black/[0.05] dark:border-white/[0.05] shadow-sm text-zinc-800 dark:text-zinc-200 font-normal rounded-bl-[6px]"
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
                              className="group flex items-center gap-3.5 px-4 py-3.5 rounded-[18px] bg-white/80 dark:bg-zinc-800/60 border border-black/[0.05] dark:border-white/[0.05] hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer"
                            >
                              <div className="w-10 h-10 shrink-0 rounded-[14px] bg-zinc-100 dark:bg-zinc-900 border border-black/[0.04] dark:border-white/[0.04] flex items-center justify-center group-hover:bg-orange-50/80 dark:group-hover:bg-pink-500/10 transition-all">
                                <LayoutTemplate size={16} className="text-zinc-500 dark:text-zinc-400 group-hover:text-orange-500 dark:group-hover:text-pink-400 transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <p className="text-[14px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-orange-600 dark:group-hover:text-pink-400 transition-colors truncate pb-0.5">{ref.title}</p>
                                {ref.description && <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1 leading-relaxed">{ref.description}</p>}
                              </div>
                              <ChevronRight size={16} className="shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 dark:group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all" />
                            </motion.a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2.5">
                    <div className="w-7 h-7 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-0.5">
                      <Bot size={13} className="text-zinc-800 dark:text-zinc-300" />
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-white/60 dark:bg-zinc-800/40 border border-black/[0.05] dark:border-white/[0.05] shadow-sm rounded-[20px] rounded-bl-[6px] h-[35px]">
                      {[0, 0.18, 0.36].map((d, i) => (
                        <motion.span key={i} className="block w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600"
                          animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.9, delay: d }} />
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
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-black/[0.05] dark:border-white/[0.05] text-zinc-600 dark:text-zinc-300 text-[11.5px] hover:text-zinc-900 dark:hover:text-white shadow-lg transition-all cursor-pointer font-medium"
                  >
                    <ArrowDown size={12} strokeWidth={2.5} />
                    <span>Mới nhất</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Top fade gradient */}
            <div className="pointer-events-none absolute top-[68px] left-0 right-0 h-8 z-20 bg-gradient-to-b from-white/60 dark:from-zinc-900/60 to-transparent" />
            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-[68px] left-0 right-0 h-8 z-20 bg-gradient-to-t from-white/60 dark:from-zinc-900/60 to-transparent" />

            {/* ── INPUT ── */}
            <div className="relative z-30 flex-shrink-0 px-5 pb-5 pt-2">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] rounded-2xl pl-4 pr-1.5 py-1.5 focus-within:bg-white dark:focus-within:bg-zinc-800 focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all">
                <input
                  type="text"
                  placeholder="Hỏi về dự án, kỹ năng, ..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  className="flex-1 min-w-0 bg-transparent text-[14px] font-normal text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 border-none outline-none focus:ring-0"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 flex items-center justify-center rounded-[12px] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 hover:scale-105 active:scale-95 transition-all shrink-0"
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
    </div>
  );
};
