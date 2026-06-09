import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const AGENTS = [
  { name: 'Sarah Jenkins', photo: 'https://i.pravatar.cc/150?img=47', phone: '+1 (555) 101-2001' },
  { name: 'Marcus Sterling', photo: 'https://i.pravatar.cc/150?img=11', phone: '+1 (555) 202-3002' },
  { name: 'Elena Rodriguez', photo: 'https://i.pravatar.cc/150?img=32', phone: '+1 (555) 303-4003' },
  { name: 'David Chen', photo: 'https://i.pravatar.cc/150?img=33', phone: '+1 (555) 404-5004' },
  { name: 'James Wilson', photo: 'https://i.pravatar.cc/150?img=59', phone: '+1 (555) 505-6005' }
];

export default function Chat() {
  const location = useLocation();
  const propertyContext = location.state?.propertyContext || null;
  
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [agent, setAgent] = useState({ name: 'EstateCore Agent', photo: 'https://i.pravatar.cc/150?img=11', phone: '+1 (800) 555-0199' });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Determine the specific agent for this property deterministically using the last hex char of property ID
    if (propertyContext && propertyContext._id) {
      const lastChar = propertyContext._id.slice(-1);
      const index = parseInt(lastChar, 16) % AGENTS.length;
      setAgent(AGENTS[index]);
    }
  }, [propertyContext]);

  useEffect(() => {
    const initChat = async () => {
      try {
        const { data: users } = await api.get('/users');
        const user = users.length > 0 ? users[0] : null;
        if (!user) return;
        setCurrentUser(user);

        if (propertyContext) {
          const { data } = await api.get(`/messages?userId=${user._id}&propertyId=${propertyContext._id}`);
          
          if (data.length === 0) {
            // First time chatting about this property
            const initMsg = {
              sender: 'agent',
              text: `Hello! How can I help you with ${propertyContext.title}?`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([initMsg]);
          } else {
            setMessages(data);
          }
        } else {
          setMessages([{ sender: 'agent', text: 'Hello! How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        }
      } catch (err) {
        console.error("Failed to init chat", err);
      }
    };
    initChat();
  }, [propertyContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveMessageToBackend = async (msgData) => {
    if (!currentUser || !propertyContext) return;
    try {
      await api.post('/messages', {
        propertyId: propertyContext._id,
        userId: currentUser._id,
        sender: msgData.sender,
        text: msgData.text,
        time: msgData.time
      });
    } catch (err) {
      console.error("Failed to save msg", err);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = inputText.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newUserMsg = { sender: 'user', text: userMsg, time: timeNow };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    
    if (propertyContext) await saveMessageToBackend(newUserMsg);

    const lowerMsg = userMsg.toLowerCase();
    
    if (lowerMsg === 'hy' || lowerMsg === 'hi' || lowerMsg === 'hello') {
      setTimeout(async () => {
        let agentMsgText = '';
        if (propertyContext) {
          agentMsgText = `Hi there! I'm ${agent.name}, the agent for this property. I'm available directly at ${agent.phone}.\n\nThe property address is: ${propertyContext.location}`;
        } else {
          agentMsgText = `Hi there! Please select a property to get specific agent details, or call our main line at +1 (800) 555-0199.`;
        }
        
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newAgentMsg = { sender: 'agent', text: agentMsgText, time: replyTime };
        
        setMessages(prev => [...prev, newAgentMsg]);
        if (propertyContext) await saveMessageToBackend(newAgentMsg);
      }, 1000);
    } else {
      setTimeout(async () => {
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newAgentMsg = { sender: 'agent', text: `Thank you for your message. I will get back to you shortly.`, time: replyTime };
        
        setMessages(prev => [...prev, newAgentMsg]);
        if (propertyContext) await saveMessageToBackend(newAgentMsg);
      }, 1500);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Contacts Sidebar */}
      <div className="w-full md:w-80 bg-[#111] border border-[#222] rounded-2xl flex flex-col shrink-0">
        <div className="p-4 border-b border-[#222]">
          <h2 className="text-lg font-bold text-[#f5f5f5]">Messages</h2>
          <input 
            type="text" 
            placeholder="Search agents..." 
            className="w-full mt-3 bg-[#0a0a0a] border border-[#222] rounded-lg py-2 px-4 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c5a059]"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors bg-[#222]">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#333]">
                <img src={agent.photo} alt="Agent" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111]"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h4 className="text-[#f5f5f5] text-sm font-semibold truncate">{agent.name}</h4>
                <span className="text-xs text-[#c5a059]">Active</span>
              </div>
              <p className="text-xs text-gray-400 truncate">{propertyContext?.title || "Tap to view conversation"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#111] border border-[#222] rounded-2xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#222] flex justify-between items-center bg-[#0a0a0a]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#333]">
              <img src={agent.photo} alt="Agent" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-[#f5f5f5] font-semibold">{agent.name}</h3>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <button className="p-2 hover:text-[#c5a059] transition-colors rounded-lg hover:bg-[#222]"><Phone size={20} /></button>
            <button className="p-2 hover:text-[#c5a059] transition-colors rounded-lg hover:bg-[#222]"><Video size={20} /></button>
            <button className="p-2 hover:text-[#c5a059] transition-colors rounded-lg hover:bg-[#222]"><Info size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#c5a059] text-black rounded-tr-none font-medium' 
                  : 'bg-[#222] text-[#f5f5f5] rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-black/60' : 'text-gray-400'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#222] bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message (e.g. 'hy')..." 
              className="flex-1 bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059] transition-colors"
            />
            <button onClick={handleSend} className="bg-[#c5a059] text-black p-3 rounded-xl hover:bg-yellow-600 transition-colors shrink-0">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
