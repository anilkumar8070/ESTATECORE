import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function ScheduleVisit() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f5f5]">Schedule a Visit</h1>
        <p className="text-gray-400 mt-1">Book an in-person or virtual tour of the property.</p>
      </div>

      <form className="bg-[#111] border border-[#222] rounded-2xl p-6 space-y-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Select Property</label>
          <select className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg py-3 px-4 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059] transition-colors">
            <option>Luxury Villa with Pool</option>
            <option>Oceanfront Estate</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 relative">
            <label className="text-sm text-gray-400">Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="date" className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg py-3 pl-10 pr-4 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059] transition-colors [color-scheme:dark]" />
            </div>
          </div>
          <div className="space-y-1 relative">
            <label className="text-sm text-gray-400">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="time" className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg py-3 pl-10 pr-4 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059] transition-colors [color-scheme:dark]" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm text-gray-400">Visit Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visitType" className="accent-[#c5a059] w-4 h-4" defaultChecked />
              <span className="text-gray-300">In-Person</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visitType" className="accent-[#c5a059] w-4 h-4" />
              <span className="text-gray-300">Virtual Tour (Video Call)</span>
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-400">Message to Agent (Optional)</label>
          <textarea rows="3" className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg py-3 px-4 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059] transition-colors" placeholder="Any questions or specific areas you want to see?"></textarea>
        </div>

        <button type="button" className="w-full bg-[#c5a059] text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 transition-colors mt-4">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
