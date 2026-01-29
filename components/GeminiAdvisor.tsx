import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Sparkles, User, Info } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

const GuideWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m your **Strategy Guide**. Ask me about any badge to get specific instructions on how to earn it.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getGeminiResponse(userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel border border-github-border/50 w-[90vw] md:w-[380px] h-[550px] rounded-3xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-fade-in origin-bottom-right ring-1 ring-white/10">
          
          {/* Header */}
          <div className="bg-github-darker/80 p-5 border-b border-github-border/50 flex justify-between items-center relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-github-accent to-purple-500 p-[1px]">
                 <div className="w-full h-full rounded-full bg-github-darker flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                 </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-wide">Strategy Guide</h3>
                <span className="text-[11px] text-github-muted font-medium tracking-wider uppercase">Interactive Helper</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-github-muted hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-github-dark/40 to-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                {msg.role === 'model' && (
                   <div className="w-6 h-6 rounded-full bg-github-border flex-shrink-0 flex items-center justify-center mt-2">
                     <Info size={12} className="text-github-muted" />
                   </div>
                )}
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm backdrop-blur-sm ${
                    msg.role === 'user' 
                      ? 'bg-github-accent text-white rounded-tr-sm' 
                      : 'bg-white/5 border border-white/10 text-github-text rounded-tl-sm'
                  }`}
                >
                  <ReactMarkdown 
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      a: ({node, ...props}) => <a className="underline decoration-white/30 hover:decoration-white" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1 opacity-90" {...props} />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start gap-3 pl-1">
                 <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5 w-16">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-github-border/30 bg-github-darker/60 backdrop-blur-xl">
            <div className="flex gap-2 items-center bg-github-dark/50 border border-github-border/50 rounded-xl p-1.5 pr-2 focus-within:border-github-accent/50 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about a badge..."
                className="flex-1 bg-transparent border-none py-2 px-3 text-sm text-github-text focus:outline-none placeholder-github-muted/50"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-github-accent hover:bg-indigo-500 text-white p-2 rounded-lg disabled:opacity-50 disabled:bg-transparent transition-all shadow-lg shadow-indigo-500/20"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden ${isOpen ? 'bg-github-darker border border-github-border' : 'bg-github-text'}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isOpen ? 'hidden' : ''}`}></div>
        <div className="relative z-10">
           {isOpen ? <X size={24} className="text-github-muted" /> : <MessageCircle size={24} className="text-github-darker fill-current" />}
        </div>
      </button>
    </div>
  );
};

export default GuideWidget;