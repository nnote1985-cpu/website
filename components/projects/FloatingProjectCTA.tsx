'use client';
import { Phone, MapPin, Send } from 'lucide-react';

export default function FloatingProjectCTA({ phone }: { phone: string }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] w-[90%] max-w-lg">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-2 flex items-center gap-2">
        <a href="#register" className="flex-1 bg-[#f4511e] text-white py-3 rounded-xl font-black text-sm text-center flex items-center justify-center gap-2">
          <Send size={16}/> ลงทะเบียน
        </a>
        <a href={`tel:${phone}`} className="flex-1 bg-[#1a2d6b] text-white py-3 rounded-xl font-black text-sm text-center flex items-center justify-center gap-2">
          <Phone size={16}/> โทรเลย
        </a>
        <a href="#map" className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200">
          <MapPin size={20}/>
        </a>
      </div>
    </div>
  );
}