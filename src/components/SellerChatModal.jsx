import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MapPin, CheckCircle2, User, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SellerChatModal({ property, onClose, addToast }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'seller',
      text: `Hello! Thanks for your interest in ${property.title}. How can I assist you with this property today?`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    'Is this property still available?',
    'Can I schedule a viewing this Saturday?',
    'What utilities are included?',
    'Are pets allowed?'
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: 'm_' + Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    sound.play('click');

    setIsTyping(true);
    setTimeout(() => {
      let replyText = `Thanks for reaching out! Yes, ${property.title} is available and I would be delighted to arrange a showing. When is best for you?`;
      if (text.toLowerCase().includes('pet')) {
        replyText = `Yes! Pets under 45 lbs are welcome with a one-time refundable pet deposit.`;
      } else if (text.toLowerCase().includes('utilities')) {
        replyText = `Water, high-speed fiber internet, and trash removal are fully covered in the HOA/lease dues.`;
      } else if (text.toLowerCase().includes('viewing') || text.toLowerCase().includes('saturday')) {
        replyText = `Saturday at 11:00 AM or 2:30 PM works great for an in-person tour! I will send over the visitor gate code.`;
      }

      const sellerReply = {
        id: 'm_' + (Date.now() + 1),
        sender: 'seller',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, sellerReply]);
      setIsTyping(false);
      sound.play('success');
      addToast(`New message from ${property.agent.name}! 💬`, 'info');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 h-[85vh] md:h-[600px] flex flex-col animate-slide-up">
        
        {/* Mobile Pull Handle */}
        <div className="md:hidden pt-3 flex justify-center bg-slate-50/70">
          <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
        </div>

        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={property.agent.avatar}
                alt={property.agent.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                {property.agent.name}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                  Seller
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[180px] sm:max-w-[240px]">{property.title}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${property.agent.whatsapp ? property.agent.whatsapp.replace('+', '') : '27738914420'}?text=${encodeURIComponent(
                `Hello ${property.agent.name}, I am chatting with you regarding '${property.title}' (R${property.priceMonthly || property.price}/mo).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition"
              title="Switch to WhatsApp"
            >
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Property Reference Snippet */}
        <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="truncate font-medium">Inquiry for: <strong>{property.title}</strong></span>
          <span className="font-mono font-bold text-slate-900 shrink-0 ml-2">
            R{(property.mode === 'buy' ? property.price : property.priceMonthly).toLocaleString()}
            {property.mode === 'rent' ? '/mo' : ''}
          </span>
        </div>

        {/* Message Thread */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5 bg-white">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-br-xs shadow-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">{msg.time}</span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 text-slate-500 text-xs w-24">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompt Chips */}
        <div className="px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto bg-slate-50/50">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700 whitespace-nowrap hover:bg-slate-900 hover:text-white hover:border-slate-900 transition shadow-2xs shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3.5 border-t border-slate-100 bg-white flex items-center gap-2 safe-area-bottom"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type message to seller..."
            className="flex-1 py-2.5 px-4 rounded-full border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
          />
          <button
            type="submit"
            className="p-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white transition shadow-sm shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
