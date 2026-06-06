import React from 'react';
import { Send, Phone, Video, Info } from 'lucide-react';

export default function Chat() {
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
          {[1, 2, 3].map((i) => (
            <div key={i} className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${i === 1 ? 'bg-[#222]' : 'hover:bg-[#222]'}`}>
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#333]">
                  <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111]"></div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="text-[#f5f5f5] text-sm font-semibold truncate">Agent Name {i}</h4>
                  <span className="text-xs text-gray-500">10:42 AM</span>
                </div>
                <p className="text-xs text-gray-400 truncate">Yes, the property is still available.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#111] border border-[#222] rounded-2xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#222] flex justify-between items-center bg-[#0a0a0a]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#333]">
              <img src="https://i.pravatar.cc/150?img=11" alt="Agent" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-[#f5f5f5] font-semibold">Agent Name 1</h3>
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
          <div className="flex justify-start">
            <div className="bg-[#222] text-[#f5f5f5] p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
              Hello! How can I help you with the Luxury Villa?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#c5a059] text-black p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm font-medium">
              Hi, I'm interested in scheduling a visit this weekend.
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[#222] text-[#f5f5f5] p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
              Absolutely. We have an open slot on Saturday at 10 AM. Does that work for you?
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#222] bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059] transition-colors"
            />
            <button className="bg-[#c5a059] text-black p-3 rounded-xl hover:bg-yellow-600 transition-colors shrink-0">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
