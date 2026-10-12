import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MapPin, CheckCircle2, User, Phone, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function DirectPersonChatModal({ property, onClose, addToast }) {
  const person = property.assignedPerson;

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'agent',
      text: `Hello! I am ${person.name}, the dedicated host for "${property.title}". How can I help you today? Would you like to schedule a viewing or ask about the lease?`,
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
    'Is this room/house still available?',
    'Can I come view it tomorrow at 2:00 PM?',
    'Is prepaid electricity included?',
    'What is the deposit requirement?'
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
      let replyText = `Thanks for messaging! Yes, ${property.title} in ${property.neighborhood} is currently available for R${property.priceMonthly}/month. I'd be glad to show it to you in person!`;
      
      const lower = text.toLowerCase();
      if (lower.includes('available')) {
        replyText = `Yes, this property is available for occupation immediately! The keys are with me and you can inspect it today or tomorrow.`;
      } else if (lower.includes('view') || lower.includes('tomorrow') || lower.includes('saturday')) {
        replyText = `Tomorrow at 2:00 PM works perfectly! I will be at ${property.address}. Please bring your ID when you come.`;
      } else if (lower.includes('electricity') || lower.includes('prepaid')) {
        replyText = property.prepaidElectricity
          ? `Yes, this unit has its own separate prepaid electricity meter box so you only buy what you use.`
          : `Water and general services are included; electricity is billed monthly based on usage.`;
      } else if (lower.includes('deposit')) {
        replyText = `The deposit is R${property.deposit.toLocaleString()}. It is fully refundable at the end of the tenancy after inspection.`;
      }

      const agentReply = {
        id: 'm_' + (Date.now() + 1),
        sender: 'agent',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentReply]);
      setIsTyping(false);
      sound.play('success');
      addToast(`New message from ${person.name}! 💬`, 'info');
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-t-3xl md:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh] max-h-[680px] animate-slide-up">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-11 h-11 rounded-2xl object-cover border border-emerald-400"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {person.name}
                </h3>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-[11px] text-emerald-300 font-medium">
                {person.role} • {person.responseTime}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Property Context Strip */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2 truncate">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-8 h-8 rounded-lg object-cover shrink-0"
            />
            <div className="truncate">
              <span className="font-bold truncate block">{property.title}</span>
              <span className="text-[11px] text-slate-500">R{property.priceMonthly}/mo • {property.neighborhood}</span>
            </div>
          </div>

          <a
            href={`tel:${person.phone}`}
            className="shrink-0 ml-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px] hover:bg-emerald-100 transition flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>Call</span>
          </a>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-slate-50/50">
          {messages.map((m) => {
            const isMe = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 px-1 font-medium">
                  {m.time}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-2 rounded-xl border border-slate-100 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] font-medium">{person.name.split(' ')[0]} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={`Message ${person.name.split(' ')[0]} directly...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

      </div>
    </div>
  );
}
