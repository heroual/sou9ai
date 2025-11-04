import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentTitle: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export const ChatWindow = ({ isOpen, onClose, agentName, agentTitle }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Salam! I am ${agentName}, your ${agentTitle}. How may I assist you today?`,
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. This is a demo interface. In a full implementation, I would provide personalized assistance based on my expertise.",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 w-[90%] md:w-[600px] max-w-[600px] max-h-[80vh] z-50"
          >
            <div className="bg-card rounded-2xl shadow-2xl border-2 border-moroccan-gold/30 overflow-hidden">
              {/* Header with Moroccan arch design */}
              <div className="relative bg-gradient-to-r from-moroccan-gold via-moroccan-gold-light to-moroccan-gold p-6">
                <div className="absolute inset-0 zellige-pattern opacity-20"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-primary-foreground font-amiri">
                      {agentName}
                    </h2>
                    <p className="text-sm text-primary-foreground/80">{agentTitle}</p>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary-foreground/20 text-primary-foreground"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                {/* Decorative arch */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-card rounded-t-full border-t-2 border-x-2 border-moroccan-gold/30"></div>
              </div>

              {/* Messages */}
              <ScrollArea className="h-[400px] p-6 bg-background/50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-2xl px-4 py-3
                          ${
                            message.sender === "user"
                              ? "bg-moroccan-gold text-primary-foreground"
                              : "bg-card border border-border"
                          }
                        `}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-60 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 border-moroccan-gold/30 focus:border-moroccan-gold"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="bg-moroccan-gold hover:bg-moroccan-gold-dark text-primary-foreground"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
