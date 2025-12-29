
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme, Category, DayItinerary, PackingItem, ExpenseItem, SpotLocation } from './types';
import { ITINERARY_DATA, DEFAULT_PACKING_LIST, FLIGHTS, HOTELS, EMERGENCY_CONTACTS, TRAVEL_RULES, ALL_SPOTS } from './constants';
import { GoogleGenAI } from "@google/genai";

// --- Icons (Inline SVGs) ---
const Icons = {
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Book: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  List: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>,
  CloudRain: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>,
  Shirt: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>,
  Plane: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5"/><path d="M13 12h8"/><path d="M5 12 2 6l5-1 4 4"/><path d="M22 12l-3-6-5 1-4 4"/></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Circle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>,
  Trash2: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
  Wallet: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  Coins: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m7.1 13.8 3.8-2.6"/></svg>,
  ArrowLeftRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>,
  Cloud: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/><path d="M12 13.5v5.5"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>,
  Clipboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M9 18h6"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Car: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>,
  Baggage: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M9 8V4h6v4"/></svg>,
  Coffee: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>,
  ExternalLink: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  RefreshCw: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>,
  
  // --- New "Doodle" Icons for Snoopy Theme ---
  Paw: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.8"><path d="M12 9c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-4.5 1c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm9 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-1.34-3-3-1.34-3-3-3zM12 11.5c-2.5 0-4.5 2-4.5 4.5 0 2.2 1.8 4 4.5 4 2.7 0 4.5-1.8 4.5-4 0-2.5-2-4.5-4.5-4.5z"/></svg>,
  Bird: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 8.5c1-1 2.5-1 3.5 0s1 2.5 0 3.5-3 1.5-3 1.5"/><path d="M15 13.5s-2 1-3 1-2-1-3-2c0 0-2 1-3 0s-1-2 0-3 2-2 3-2 3 1 4 2"/><path d="M12 14.5v3"/><path d="M14 17.5h-4"/></svg>,
  DogHouse: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  Bone: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10c.5-1.5 1.5-2 3-1.5 1.5.5 2 2 1.5 3.5l-.5 1c-.5 1.5-2 2-3.5 1.5-1-.5-1.5-1-2-2L9 9c-.5-1-1-1.5-2-2-1.5-.5-3 .5-3.5 2C3 10.5 3.5 12 5 12.5c1.5.5 2.5 0 3.5-1.5l.5-1L15.5 12.5c.5 1 1.5 1.5 2.5 1 1.5-.5 2-2 1.5-3.5"/></svg>,
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 13.572 12 21l-7.5-7.428A5 5 0 1 1 12 7.006a5 5 0 1 1 7.5 6.572"/></svg>,
  ZigZag: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 12 6 8 10 12 14 8 18 12 22 8" /></svg>,
  Kite: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 12l10 10 10-10L12 2z"/><path d="M12 22s5 5 9 5"/></svg>,
  Baseball: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M18 6c-2 2-2 5 0 7"/><path d="M6 6c2 2 2 5 0 7"/></svg>,
  Flower: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2c0 2-2 3-3 4-2 2-4 1-4-1 0-2 2-4 4-4 2 0 3 1 3 1z"/><path d="M22 12c-2 0-3 2-4 3-2 2-1 4 1 4 2 0 4-2 4-4 0-2-1-3-1-3z"/><path d="M12 22c0-2 2-3 3-4 2-2 4-1 4 1 0 2-2 4-4 4-2 0-3-1-3-1z"/><path d="M2 12c2 0 3-2 4-3 2-2 1-4-1-4-2 0-4 2-4 4 0 2 1 3 1 3z"/></svg>,
  MusicNote: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  FlagVN: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 3 2"><rect width="3" height="2" fill="#DA251D"/><polygon points="1.5,0.25 1.575,0.5 1.83,0.5 1.625,0.65 1.7,0.9 1.5,0.75 1.3,0.9 1.375,0.65 1.17,0.5 1.425,0.5" fill="#FFCD00"/></svg>,
  // New Characters
  SnoopyProfile: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14c0-4 2-8 6-8s6 4 6 8-2 8-6 8-6-4-6-8z"/><path d="M10 10c0-1.1.9-2 2-2s2 .9 2 2"/><path d="M12 18s2 1 4 1 4-2 4-4c0-2-1-3-1-3"/><path d="M4 14c-2 0-3 2-3 4s2 3 3 3"/></svg>,
  Woodstock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5c-2 0-3 2-3 2s-1-1-2-1-2 2-2 3c0 1 1 2 2 2h6"/><path d="M13 12v6"/><path d="M11 18h4"/><path d="M16 8c1-1 3-1 3 1s-1 2-2 2"/></svg>,
  JoeCool: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16"/><path d="M4 10c0 4 2 6 5 6s4-3 4-3 1 3 4 3 5-2 5-6"/><path d="M6 10v-2"/><path d="M18 10v-2"/></svg>,
  SnoopyHappy: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 15c0-4 2-7 5-7s5 3 5 7"/><path d="M9 8c-1-2-3-3-4-2s-1 3 0 5"/><path d="M15 8c1-2 3-3 4-2s1 3 0 5"/><path d="M12 15v4"/><path d="M10 22h4"/></svg>,
  SnoopySleep: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M5 12l7-6 7 6"/><path d="M9 12v-2c0-2 2-3 3-3s3 1 3 3v2"/></svg>,
  SnoopyPilot: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 10s2-2 4-2 4 2 4 2"/><path d="M10 12h4"/><path d="M9 15h6"/></svg>,
};

// --- Helpers ---
const getDayOfWeek = (dateString: string) => {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const date = new Date(dateString);
  return `週${days[date.getDay()]}`;
};

// --- Components ---

const TabButton = ({ active, onClick, label, icon, isSnoopy, isColorful }: any) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2 transition-all rounded-xl relative
        ${active ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'}`}
    >
      {active && (
        <div className={`absolute -top-1 w-1 h-1 rounded-full ${isColorful ? 'bg-[#FFD93D]' : 'bg-white'}`} />
      )}
      <div className="mb-0.5">{icon}</div>
      <span className="text-[10px] font-bold tracking-tighter">{label}</span>
    </button>
  );
};

const App = () => {
  const [theme, setTheme] = useState<Theme>(Theme.COLORFUL);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'guide' | 'weather' | 'tools' | 'spots'>('itinerary');

  const isSnoopy = theme === Theme.SNOOPY;
  const isColorful = theme === Theme.COLORFUL;

  // Background & Text
  let bgClass = 'bg-[#fdfbf7]'; // Default Snoopy
  let textClass = 'text-[#2d2d2d]';
  if (isColorful) {
    bgClass = 'bg-[#FFFBE6]'; // Creamy Yellow
    textClass = 'text-[#4A4A4A]';
  }

  // Header
  const headerFont = 'font-bold tracking-wide';
  const headerBg = isColorful ? 'bg-[#FFD93D] text-[#333] shadow-[0_4px_0_rgba(0,0,0,0.1)]' : 'bg-[#fdfbf7]/95 border-b-2 border-[#2d2d2d]'; 
  
  // Card
  const wobblyRadius = 'rounded-[255px_15px_225px_15px/15px_225px_15px_255px]';
  let cardClass = '';
  if (isSnoopy) {
     cardClass = `bg-white border-2 border-[#2d2d2d] ${wobblyRadius} shadow-[2px_2px_0px_rgba(0,0,0,0.1)]`;
  } else {
     cardClass = `bg-white border-2 border-[#333] ${wobblyRadius} shadow-[4px_4px_0px_#4ECDC4]`;
  }

  const tagColor = (tag: string) => {
    if (tag.includes('已預約')) return isColorful ? 'bg-[#4CAF50] text-white ring-2 ring-white/30 shadow-[1px_1px_0_rgba(0,0,0,0.2)]' : 'bg-green-100 text-green-800 border border-green-200';
    if (tag.includes('待預訂')) return isColorful ? 'bg-[#FF9800] text-white ring-2 ring-white/30 shadow-[1px_1px_0_rgba(0,0,0,0.2)]' : 'bg-orange-100 text-orange-800 border border-orange-200';
    if (tag.includes('必吃')) return isColorful ? 'bg-[#FF6B6B] text-white' : 'bg-yellow-100 text-yellow-800';
    if (tag.includes('必買')) return isColorful ? 'bg-[#FFD93D] text-[#5C4033]' : 'bg-red-100 text-red-800';
    if (tag.includes('必去') || tag.includes('必逛')) return isColorful ? 'bg-[#4ECDC4] text-white' : 'bg-blue-100 text-blue-800';
    return isColorful ? 'bg-[#95E1D3] text-white' : 'bg-gray-100 text-gray-600';
  };

  const bgIconColor = (index: number) => {
    if (isSnoopy) return 'text-[#2d2d2d] opacity-[0.05]';
    const colors = ['text-[#FF6B6B]', 'text-[#4ECDC4]', 'text-[#FFD93D]', 'text-[#95E1D3]'];
    return `${colors[index % colors.length]} opacity-30`;
  };

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} font-sans transition-colors duration-300 pb-32 overflow-x-hidden selection:bg-yellow-200`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex flex-wrap gap-24 p-12 justify-center items-center">
          <div className={`transform rotate-12 ${bgIconColor(0)}`}><Icons.Paw /></div>
          <div className={`transform -rotate-12 ${bgIconColor(1)}`}><Icons.Bird /></div>
          <div className={`transform rotate-45 ${bgIconColor(2)}`}><Icons.DogHouse /></div>
          <div className={`transform -rotate-6 ${bgIconColor(3)}`}><Icons.Heart /></div>
          <div className={`transform rotate-180 ${bgIconColor(4)}`}><Icons.ZigZag /></div>
          <div className={`transform -rotate-45 ${bgIconColor(5)}`}><Icons.Bone /></div>
          <div className={`transform rotate-12 ${bgIconColor(6)}`}><Icons.Kite /></div>
          <div className={`transform -rotate-12 ${bgIconColor(7)}`}><Icons.Baseball /></div>
          <div className={`transform rotate-90 ${bgIconColor(0)}`}><Icons.Paw /></div>
          <div className={`transform -rotate-12 ${bgIconColor(1)}`}><Icons.Flower /></div>
          <div className={`transform rotate-12 ${bgIconColor(2)}`}><Icons.MusicNote /></div>
          <div className={`transform -rotate-12 ${bgIconColor(3)}`}><Icons.ZigZag /></div>
          <div className={`transform rotate-45 ${bgIconColor(4)}`}><Icons.Bone /></div>
          <div className={`transform -rotate-6 ${bgIconColor(5)}`}><Icons.Paw /></div>
          <div className={`transform rotate-12 ${bgIconColor(6)}`}><Icons.Kite /></div>
          <div className={`transform -rotate-12 ${bgIconColor(7)}`}><Icons.Bird /></div>
      </div>

      <header className={`sticky top-0 z-50 ${headerBg} px-4 py-3 flex justify-between items-center transition-all duration-500`}>
        <div className="flex items-center gap-2">
           <div className={`p-1 ${isColorful ? 'bg-white border-2 border-black' : 'bg-[#2d2d2d] text-white'} rounded-full`}>
             <Icons.SnoopyProfile />
           </div> 
           <div>
             <h1 className={`text-xl ${headerFont} leading-none flex items-center gap-2`}>
               Hanoi Trip <Icons.FlagVN />
             </h1>
             <p className={`text-xs ${isColorful ? 'opacity-80' : 'opacity-70'}`}>2026/01/05 - 01/11</p>
           </div>
        </div>
        <button 
          onClick={() => setTheme(isSnoopy ? Theme.COLORFUL : Theme.SNOOPY)}
          className={`text-xs px-3 py-1.5 border flex items-center gap-2 font-bold transition-all rounded-full 
            ${isSnoopy ? 'border-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white' : 'bg-white text-[#333] border-2 border-[#333] shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:translate-y-0.5 hover:shadow-none'}`}
        >
          {isSnoopy ? '🌈 Color' : '🐶 Snoopy'}
        </button>
      </header>

      <main className="p-4 max-w-lg mx-auto w-full relative z-10">
        {activeTab === 'itinerary' && <ItineraryView isSnoopy={isSnoopy} isColorful={isColorful} cardClass={cardClass} tagColor={tagColor} />}
        {activeTab === 'guide' && <GuideView isSnoopy={isSnoopy} isColorful={isColorful} cardClass={cardClass} />}
        {activeTab === 'weather' && <WeatherView isSnoopy={isSnoopy} isColorful={isColorful} cardClass={cardClass} />}
        {activeTab === 'tools' && <ToolsView isSnoopy={isSnoopy} isColorful={isColorful} cardClass={cardClass} />}
        {activeTab === 'spots' && <SpotListView isSnoopy={isSnoopy} isColorful={isColorful} cardClass={cardClass} tagColor={tagColor} />}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[325px] shadow-2xl rounded-full">
        <div className={`${isSnoopy ? 'bg-[#2d2d2d] text-[#fdfbf7]' : 'bg-[#333] text-white border-2 border-white ring-2 ring-[#333]'} grid grid-cols-5 gap-0.5 p-1.5 transition-all duration-300 rounded-[25px_225px_25px_25px/255px_15px_225px_15px]`}>
          <TabButton active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} label="行程" icon={<Icons.List />} isSnoopy={isSnoopy} isColorful={isColorful} />
          <TabButton active={activeTab === 'spots'} onClick={() => setActiveTab('spots')} label="景點" icon={<Icons.Search />} isSnoopy={isSnoopy} isColorful={isColorful} />
          <TabButton active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} label="指南" icon={<Icons.Book />} isSnoopy={isSnoopy} isColorful={isColorful} />
          <TabButton active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} label="工具" icon={<Icons.Calculator />} isSnoopy={isSnoopy} isColorful={isColorful} />
          <TabButton active={activeTab === 'weather'} onClick={() => setActiveTab('weather')} label="天氣" icon={<Icons.CloudRain />} isSnoopy={isSnoopy} isColorful={isColorful} />
        </div>
      </nav>
    </div>
  );
};

const WeatherView = ({ isSnoopy, isColorful, cardClass }: any) => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [targetLocation, setTargetLocation] = useState<'Hanoi' | 'NinhBinh'>('Hanoi');

  const fetchWeather = async () => {
    setLoading(true);
    setWeatherData(null);
    try {
      const locName = targetLocation === 'Hanoi' ? '河內' : '寧平 (Ninh Binh)';
      const activityNote = targetLocation === 'NinhBinh' 
        ? "特別注意：行程包含長時間「戶外遊船」與「穆阿洞爬山」，請針對風力與體感溫度給予建議。"
        : "特別注意：行程主要在市區步行與室內按摩，請給予舒適的洋蔥式穿搭建議。";

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `請搜尋並提供現在越南「${locName}」的即時天氣資訊，包含目前氣溫、今日高低溫、天氣狀況、濕度與降雨機率。${activityNote} 請用繁體中文回答，語氣親切，條列式呈現。`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      setWeatherData(response.text);
      if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        const chunks = response.candidates[0].groundingMetadata.groundingChunks
          .map((chunk: any) => chunk.web)
          .filter(Boolean);
        setSources(chunks);
      }
    } catch (error) {
      console.error("Failed to fetch weather", error);
      setWeatherData("抱歉，目前無法取得即時天氣資訊。請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className={`${cardClass} p-6 text-center space-y-4 relative overflow-hidden`}>
        <div className={`absolute -top-4 -right-4 opacity-10 rotate-12 scale-150 transition-transform duration-500 ${loading ? 'translate-y-4' : ''}`}>
          {targetLocation === 'Hanoi' ? <Icons.JoeCool /> : <Icons.Woodstock />}
        </div>
        
        <h2 className="text-xl font-black tracking-tight">越南天氣預報</h2>
        
        {/* Location Switcher */}
        <div className={`flex p-1 rounded-full border-2 ${isColorful ? 'bg-white border-[#333]' : 'bg-gray-100 border-[#2d2d2d]'} mx-auto w-fit mb-4`}>
          <button 
            onClick={() => setTargetLocation('Hanoi')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${targetLocation === 'Hanoi' ? (isColorful ? 'bg-[#FFD93D] text-[#333] shadow-[2px_2px_0_rgba(0,0,0,1)]' : 'bg-[#2d2d2d] text-white') : 'opacity-50'}`}
          >
            河內市區
          </button>
          <button 
            onClick={() => setTargetLocation('NinhBinh')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${targetLocation === 'NinhBinh' ? (isColorful ? 'bg-[#4ECDC4] text-white shadow-[2px_2px_0_rgba(0,0,0,1)]' : 'bg-[#2d2d2d] text-white') : 'opacity-50'}`}
          >
            寧平風景區
          </button>
        </div>

        <div className="text-6xl mb-4 animate-pulse">
           {loading ? '🌀' : (targetLocation === 'Hanoi' ? '🏙️' : '🛶')}
        </div>
        
        <button 
          onClick={fetchWeather}
          disabled={loading}
          className={`mx-auto flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-sm transition-all active:scale-95 shadow-[4px_4px_0_rgba(0,0,0,1)]
            ${targetLocation === 'Hanoi' 
               ? (isColorful ? 'bg-[#FF6B6B] text-white' : 'bg-[#2d2d2d] text-white') 
               : (isColorful ? 'bg-[#4ECDC4] text-white' : 'bg-[#2d2d2d] text-white')}
            ${loading ? 'opacity-50 cursor-not-allowed translate-y-1 shadow-none' : ''}`}
        >
          <div className={loading ? 'animate-spin' : ''}><Icons.RefreshCw /></div>
          {loading ? '正在連線氣象站...' : `更新 ${targetLocation === 'Hanoi' ? '河內' : '寧平'} 即時天氣`}
        </button>

        {weatherData ? (
          <div className={`p-4 rounded-2xl text-left text-sm whitespace-pre-wrap leading-relaxed border-2 border-[#333] ${isColorful ? 'bg-[#FFF9E6]' : 'bg-gray-50'}`}>
             <div className="font-black text-xs uppercase mb-2 opacity-40 flex items-center gap-2">
               <Icons.MapPin /> {targetLocation === 'Hanoi' ? 'Hanoi Report' : 'Ninh Binh Report'}
             </div>
             {weatherData}
             
             {sources.length > 0 && (
               <div className="mt-4 pt-4 border-t-2 border-dashed border-[#333]/20">
                 <p className="text-[10px] font-black opacity-40 mb-2 uppercase italic">Data Sources</p>
                 <div className="flex flex-wrap gap-2">
                   {sources.map((s, i) => (
                     <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[10px] bg-white border border-[#333] px-2 py-0.5 rounded-md hover:bg-yellow-100 transition-colors truncate max-w-[120px]">
                       {s.title || 'Source'}
                     </a>
                   ))}
                 </div>
               </div>
             )}
          </div>
        ) : (
          <div className={`p-5 rounded-2xl border-2 border-dashed border-[#333]/30 ${isColorful ? 'bg-[#FFF9E6]' : 'bg-gray-50'} text-left text-sm`}>
            <p className="opacity-70 text-center py-4 italic font-medium">✨ 準備前往{targetLocation === 'Hanoi' ? '河內' : '寧平'}嗎？點擊按鈕獲取最新當地氣象建議！</p>
            
            <div className="space-y-3 mt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-[#333] flex items-center justify-center flex-shrink-0"><Icons.Paw /></div>
                <div>
                  <p className="font-black text-xs">寧平特別注意</p>
                  <p className="text-[11px] opacity-70">長安遊船無遮蔽物，若有小雨體感溫度會下降 3-5 度，建議攜帶輕便雨衣或防風外套。</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-[#333] flex items-center justify-center flex-shrink-0"><Icons.Sun /></div>
                <div>
                  <p className="font-black text-xs">防曬與保濕</p>
                  <p className="text-[11px] opacity-70">1 月份北越氣候較乾，除了禦寒，乳液與護唇膏也是必備喔！</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SpotListView = ({ isSnoopy, isColorful, cardClass, tagColor }: any) => {
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
  const categories = ['ALL', ...Object.values(Category)];
  const filteredSpots = filter === 'ALL' ? ALL_SPOTS : ALL_SPOTS.filter(s => s.category === filter);

  return (
    <div className="space-y-4 animate-fade-in">
       <div className="flex items-end gap-2">
         <div className="mb-2 text-[#333] opacity-80"><Icons.JoeCool /></div>
         <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 flex-1">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setFilter(cat as any)}
               className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all
                 ${filter === cat 
                    ? (isColorful ? 'bg-[#333] text-white shadow-[2px_2px_0px_#FF6B6B]' : 'bg-[#2d2d2d] text-white') 
                    : (isColorful ? 'bg-white border border-[#333] text-[#333]' : 'bg-white border border-[#2d2d2d] text-[#2d2d2d]')}`}
             >
               {cat === 'ALL' ? '全部' : cat}
             </button>
           ))}
         </div>
       </div>

       <div className="grid gap-4">
          {filteredSpots.map((spot, i) => (
             <div key={i} className={`${cardClass} p-4 flex flex-col gap-2 relative overflow-hidden`}>
                {i % 3 === 0 && <div className="absolute -right-2 -top-2 opacity-5 rotate-12 text-3xl pointer-events-none"><Icons.Bone /></div>}
                <div className="flex justify-between items-start relative z-10">
                   <div>
                      <span className={`text-[10px] px-2 py-0.5 rounded border mb-1 inline-block ${isColorful ? 'border-black bg-[#FFE66D]' : 'border-gray-800'}`}>
                        {spot.category}
                      </span>
                      <h3 className="font-bold text-lg leading-tight">{spot.name}</h3>
                      {spot.address && <p className="text-xs opacity-60 mt-0.5">{spot.address}</p>}
                   </div>
                   <div className="flex gap-2">
                     {spot.website && (
                        <a href={spot.website} target="_blank" rel="noreferrer" className={`p-2 rounded-full border border-transparent transition-colors ${isColorful ? 'bg-gray-100 text-[#2d2d2d] hover:bg-[#FFD93D]' : 'bg-gray-100 text-[#2d2d2d] hover:bg-gray-200'}`}>
                          <Icons.ExternalLink />
                        </a>
                     )}
                     <a href={spot.googleMapLink} target="_blank" rel="noreferrer" className={`p-2 rounded-full border border-transparent transition-colors ${isColorful ? 'bg-[#E3F2FD] text-[#4285F4] hover:bg-[#2196F3] hover:text-white' : 'bg-gray-100 text-[#2d2d2d] hover:bg-gray-200'}`}>
                        <Icons.MapPin />
                     </a>
                   </div>
                </div>
                <p className="text-sm opacity-80 relative z-10">{spot.description}</p>
                <div className="flex flex-wrap gap-2 mt-1 relative z-10">
                  {spot.tags.map(tag => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-md ${tagColor(tag)}`}>{tag}</span>
                  ))}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const ItineraryView = ({ isSnoopy, isColorful, cardClass, tagColor }: any) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
    const idx = ITINERARY_DATA.findIndex(d => d.date === todayStr);
    return idx !== -1 ? idx : 0;
  });

  const day = ITINERARY_DATA[selectedDayIndex];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4 snap-x pt-3">
        {ITINERARY_DATA.map((d, i) => {
          const isSelected = selectedDayIndex === i;
          let btnClass = '';
          if (isSnoopy) {
             btnClass = isSelected 
               ? 'bg-[#2d2d2d] text-[#fdfbf7] border-2 border-transparent scale-105' 
               : 'bg-transparent border-2 border-[#2d2d2d] text-[#2d2d2d]';
          } else {
             btnClass = isSelected
               ? 'bg-[#FF6B6B] text-white border-2 border-[#333] shadow-[2px_2px_0px_#333] scale-105'
               : 'bg-white text-[#333] border-2 border-[#333]';
          }

          return (
            <button
              key={d.date}
              onClick={() => setSelectedDayIndex(i)}
              className={`relative flex-shrink-0 snap-center flex flex-col items-center justify-center w-16 h-20 transition-all rounded-[15px_25px_12px_20px] ${btnClass}`}
            >
              {isSelected && <div className="absolute -top-4 text-[#333] scale-75 animate-bounce"><Icons.Woodstock /></div>}
              <span className="text-[9px] font-black opacity-40 leading-none">{getDayOfWeek(d.date)}</span>
              <span className="text-xl font-black leading-tight my-0.5">{d.date.split('/')[2]}</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter opacity-80">{d.dayLabel}</span>
            </button>
          )
        })}
      </div>

      <div className="space-y-6 relative">
        <div className={`absolute left-[19px] top-4 bottom-4 w-0.5 ${isColorful ? 'bg-[#333] border-l-2 border-dashed border-[#333]' : 'bg-gray-300 border-l-2 border-dashed border-gray-400'}`} />

        {day.spots.map((spot, idx) => (
          <div key={spot.id} className="relative pl-12">
            <div className={`absolute left-[-2px] top-3 w-10 text-right pr-4`}>
               <div className={`absolute left-[10px] top-1.5 text-xs ${isColorful ? 'text-[#FF6B6B]' : 'text-[#2d2d2d]'}`}>
                 <Icons.Paw />
               </div>
            </div>
            
            <div className={`p-4 ${cardClass} flex flex-col gap-3 group transition-transform duration-300 hover:scale-[1.01] relative overflow-hidden`}>
              <div className="absolute bottom-2 right-2 opacity-5 pointer-events-none text-4xl rotate-12"><Icons.Paw /></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    <span className={`text-sm font-bold opacity-60 font-mono`}>{spot.time}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${isColorful ? 'border-black bg-[#FFE66D]' : 'border-gray-800'}`}>{spot.category}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight mb-1">{spot.name}</h3>
                </div>
                <div className="flex gap-2">
                  {spot.websiteUrl && (
                     <a href={spot.websiteUrl} target="_blank" rel="noreferrer" className={`p-2 rounded-full transition-colors border border-transparent ${isColorful ? 'hover:bg-[#FFD93D] hover:border-black text-[#2d2d2d]' : 'hover:bg-gray-200 text-[#2d2d2d]'}`}>
                       <Icons.ExternalLink />
                     </a>
                  )}
                  {spot.locationUrl && (
                    <a href={spot.locationUrl} target="_blank" rel="noreferrer" className={`p-2 rounded-full transition-colors border border-transparent ${isColorful ? 'hover:bg-[#4ECDC4] hover:border-black hover:text-white text-[#2d2d2d]' : 'hover:bg-gray-200 text-[#2d2d2d]'}`}>
                      <Icons.MapPin />
                    </a>
                  )}
                </div>
              </div>

              <p className={`text-sm leading-relaxed font-medium relative z-10`}>{spot.description}</p>

              <div className="flex flex-col gap-1 mt-1 relative z-10">
                 {spot.travelTime && (
                  <div className={`flex items-center gap-2 text-xs opacity-60`}>
                     <Icons.Clock />
                     <span>{spot.travelTime}</span>
                  </div>
                )}
                {spot.grabFare && (
                   <div className={`flex items-center gap-2 text-xs font-bold ${isColorful ? 'text-[#FF6B6B]' : 'text-[#2d2d2d] opacity-80'}`}>
                      <Icons.Car />
                      <span>Grab: {spot.grabFare}</span>
                   </div>
                )}
              </div>

              {spot.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1 relative z-10">
                  {spot.tags.map(tag => (
                    <span key={tag} className={`text-xs px-2 py-1 rounded-md font-medium ${tagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {day.notes && day.notes.length > 0 && (
        <div className="mt-8 space-y-4">
           {day.notes.map((note, nIdx) => (
             <div key={nIdx} className={`${cardClass} p-5 relative overflow-hidden bg-[#fafafa]`}>
                {note.type === 'dining' && <div className="absolute top-2 right-2 opacity-10 rotate-12"><Icons.Coffee /></div>}
                {note.type === 'checklist' && <div className="absolute top-2 right-2 opacity-10 rotate-12"><Icons.Clipboard /></div>}
                {note.type === 'info' && <div className="absolute top-2 right-2 opacity-10 rotate-12"><Icons.ExternalLink /></div>}
                
                <h4 className="font-bold flex items-center gap-2 text-sm mb-3">
                   <span className={isColorful ? 'text-[#FF6B6B]' : ''}>•</span> {note.title}
                </h4>
                <ul className="space-y-2">
                   {note.items.map((item, iIdx) => {
                     const hasUrl = item.includes('https://');
                     const textPart = hasUrl ? item.split('https://')[0] : item;
                     const urlPart = hasUrl ? 'https://' + item.split('https://')[1] : null;

                     return (
                      <li key={iIdx} className="text-sm flex items-start gap-2 leading-relaxed">
                          <span className="mt-1 flex-shrink-0"><Icons.Paw /></span>
                          <span className="flex items-center flex-wrap">
                             {textPart}
                             {urlPart && (
                                <a 
                                  href={urlPart} 
                                  target="_blank" 
                                  className={`inline-flex items-center ml-1 p-1 rounded-full transition-all active:scale-95 ${isColorful ? 'text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                                  title="Official Website Reservation"
                                >
                                  <Icons.MapPin />
                                </a>
                             )}
                          </span>
                      </li>
                     );
                   })}
                </ul>
             </div>
           ))}
        </div>
      )}

      <div className={`mt-8 p-4 ${cardClass} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="text-3xl">{day.weather.icon}</div>
          <div>
            <div className="font-bold text-lg">{day.weather.temp}</div>
            <div className="text-xs opacity-70">{day.weather.condition}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-wider opacity-50">建議穿著</div>
            <div className="text-sm max-w-[150px] leading-tight">{day.weather.clothing}</div>
          </div>
          <Icons.Shirt />
        </div>
      </div>
    </div>
  );
};

const GuideView = ({ isSnoopy, isColorful, cardClass }: any) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Google Drive Files Section */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Icons.Cloud /> 雲端備份
        </h2>
        <a 
          href="https://drive.google.com/drive/folders/1ZvWoNzTgL89bVXe1q3fvr2Nh8VaGJUHO" 
          target="_blank" 
          rel="noreferrer"
          className={`${cardClass} p-4 flex items-center justify-between group transition-all hover:translate-y-[-2px] active:translate-y-0`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isColorful ? 'bg-[#FFFBE6] border-2 border-[#333]' : 'bg-gray-100 border border-[#2d2d2d]'}`}>
               <Icons.Clipboard />
            </div>
            <div>
              <p className="font-bold text-sm">重要文件雲端備份</p>
              <p className="text-[10px] opacity-50 uppercase font-black">E-Visa / Insurance / Booking</p>
            </div>
          </div>
          <div className="opacity-40 group-hover:opacity-100 transition-opacity">
            <Icons.ExternalLink />
          </div>
        </a>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Icons.Plane /> 航班資訊
        </h2>
        {FLIGHTS.map((flight, i) => (
          <div key={i} className={`${cardClass} p-4 text-sm`}>
            <div className="flex justify-between font-bold mb-1">
              <span>{flight.code}</span>
              <span className={isColorful ? 'text-[#FF6B6B]' : ''}>{flight.bookingCode}</span>
            </div>
            <div className="opacity-80">{flight.route}</div>
            <div className="opacity-80">{flight.time}</div>
            <div className="mt-2 flex gap-4 text-xs">
              <span className="flex items-center gap-1"><Icons.Paw /> {flight.passengers}</span>
              <span className="flex items-center gap-1"><Icons.Baggage /> {flight.baggage}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Icons.DogHouse /> 飯店住宿
        </h2>
        {HOTELS.map((hotel, i) => (
          <div key={i} className={`${cardClass} p-4 text-sm space-y-2 relative overflow-hidden`}>
            {/* Background Decorative Icon */}
            <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12 pointer-events-none">
              <Icons.DogHouse />
            </div>

            <div className="flex justify-between items-start gap-2 relative z-10">
              <h3 className="font-bold text-base leading-tight">{hotel.name}</h3>
              {hotel.googleMapLink && (
                <a href={hotel.googleMapLink} target="_blank" rel="noreferrer" className={`p-1.5 rounded-full transition-colors ${isColorful ? 'bg-[#E3F2FD] text-[#4285F4] border border-black shadow-[1px_1px_0_black]' : 'bg-gray-100 border border-black shadow-[1px_1px_0_black]'}`}>
                  <Icons.MapPin />
                </a>
              )}
            </div>
            
            <div className="opacity-70 text-xs flex items-center gap-1">
               <Icons.MapPin /> {hotel.address}
            </div>

            <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-dashed border-gray-200">
               <div className="flex justify-between items-baseline">
                 <span className="opacity-50 text-[10px] font-bold uppercase">入住期間</span>
                 <span className="font-bold">{hotel.dates}</span>
               </div>
               <div className="flex justify-between items-baseline">
                 <span className="opacity-50 text-[10px] font-bold uppercase">房型</span>
                 <span className="font-bold text-right">{hotel.roomType}</span>
               </div>
               {hotel.guestName && (
                 <div className="flex justify-between items-baseline">
                   <span className="opacity-50 text-[10px] font-bold uppercase">入住人</span>
                   <span className="font-medium">{hotel.guestName}</span>
                 </div>
               )}
               {hotel.breakfast && (
                 <div className="flex justify-between items-baseline">
                   <span className="opacity-50 text-[10px] font-bold uppercase">早餐</span>
                   <span className="font-medium text-[#4ECDC4]">{hotel.breakfast}</span>
                 </div>
               )}
               {hotel.price && (
                 <div className="flex justify-between items-baseline">
                   <span className="opacity-50 text-[10px] font-bold uppercase">價格</span>
                   <span className="font-black text-[#FF6B6B]">{hotel.price}</span>
                 </div>
               )}
            </div>

            {(hotel.bookingRef || hotel.membership || hotel.pin) && (
              <div className={`mt-2 p-2 rounded-lg text-[10px] ${isColorful ? 'bg-[#FFF9E6] border border-[#333]' : 'bg-gray-50 border border-[#2d2d2d]'} space-y-1 relative z-10`}>
                {hotel.bookingRef && <div className="flex justify-between"><span>預訂單號</span><span className="font-bold">{hotel.bookingRef}</span></div>}
                {hotel.pin && <div className="flex justify-between"><span>PIN</span><span className="font-bold">{hotel.pin}</span></div>}
                {hotel.membership && (
                  <div className="mt-1 pt-1 border-t border-black/10 flex flex-wrap gap-1">
                    <span className={`px-1.5 py-0.5 rounded font-black ${isColorful ? 'bg-[#FFD93D] text-[#333]' : 'bg-[#2d2d2d] text-white'}`}>
                      {hotel.membership}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Icons.Clipboard /> 注意事項
        </h2>
        <div className={`${cardClass} p-4 space-y-3`}>
          {TRAVEL_RULES.map((rule, i) => (
            <div key={i}>
              <div className="font-bold text-sm mb-1">{rule.title}</div>
              <p className="text-xs opacity-80">{rule.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Icons.MapPin /> 緊急聯絡
        </h2>
        <div className={`${cardClass} p-5 space-y-4`}>
          <div className="space-y-3">
            {EMERGENCY_CONTACTS.map((contact, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-dashed pb-2 last:border-0">
                <div>
                  <div className="font-bold">{contact.title}</div>
                  {contact.note && <div className="text-xs opacity-50">{contact.note}</div>}
                </div>
                <a href={`tel:${contact.phone}`} className={`px-3 py-1 rounded-full font-bold text-xs ${isColorful ? 'bg-[#4ECDC4] text-white' : 'bg-[#2d2d2d] text-white'}`}>
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ToolsView = ({ isSnoopy, isColorful, cardClass }: any) => {
  const [exchangeRate, setExchangeRate] = useState('760');
  const [vndInput, setVndInput] = useState('1000');
  
  // Bookkeeping States
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('hanoi_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCurrency, setNewItemCurrency] = useState<'VND' | 'TWD'>('TWD');

  useEffect(() => {
    localStorage.setItem('hanoi_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const rate = parseFloat(exchangeRate) || 0;
  const vnd = parseFloat(vndInput) || 0;
  const twdResult = rate > 0 ? (vnd / rate).toFixed(2) : '0.00';

  const addExpense = () => {
    if (!newItemName || !newItemAmount) return;
    const amount = parseFloat(newItemAmount);
    if (isNaN(amount)) return;

    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      title: newItemName,
      amount: amount,
      currency: newItemCurrency,
      date: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    };

    setExpenses([newExpense, ...expenses]);
    setNewItemName('');
    setNewItemAmount('');
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const clearAllExpenses = () => {
    if (window.confirm('確定要清空所有記帳紀錄嗎？這項動作無法還原喔 🗑️')) {
      setExpenses([]);
    }
  };

  const totalTwd = useMemo(() => {
    return expenses.reduce((sum, exp) => {
      if (exp.currency === 'TWD') return sum + exp.amount;
      return sum + (exp.amount / rate);
    }, 0);
  }, [expenses, rate]);

  const copyToSheets = () => {
    const header = "Date\tItem\tAmount\tCurrency\n";
    const body = expenses.map(e => `${e.date}\t${e.title}\t${e.amount}\t${e.currency}`).join('\n');
    navigator.clipboard.writeText(header + body).then(() => {
      alert('已複製到剪貼簿！可以貼到 Google Sheets 囉 ✨');
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Exchange Tool */}
      <div className={`${cardClass} p-5 space-y-6`}>
        <h2 className="font-bold text-xl flex items-center gap-2">
          <Icons.Coins /> 匯率換算
        </h2>
        <div className="bg-[#f8f9fa] rounded-lg p-3 flex items-center gap-2 text-sm border border-gray-100">
           <span className="text-gray-400 whitespace-nowrap">匯率設定 (1 TWD =)</span>
           <input 
             type="number"
             value={exchangeRate}
             onChange={(e) => setExchangeRate(e.target.value)}
             className="bg-transparent border-b-2 border-gray-300 w-16 text-center font-bold focus:border-[#4ECDC4] outline-none"
           />
           <span className="text-gray-400">VND</span>
        </div>
        <div className="flex flex-col gap-8 py-4">
           <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                 <div className="text-xs font-bold text-gray-400">越南盾 (VND)</div>
                 <div className="relative">
                    <input 
                      type="number"
                      value={vndInput}
                      onChange={(e) => setVndInput(e.target.value)}
                      className="w-full text-3xl font-black bg-transparent border-b-2 border-[#4ECDC4] py-1 outline-none"
                    />
                 </div>
              </div>
              <div className="flex-shrink-0 pt-4">
                 <div className={`p-2 rounded-full border border-gray-200 text-gray-400`}>
                   <Icons.ArrowLeftRight />
                 </div>
              </div>
              <div className="flex-1 space-y-1 text-right">
                 <div className="text-xs font-bold text-gray-400">新台幣 (TWD)</div>
                 <div className="flex items-baseline justify-end gap-2 py-1">
                    <span className="text-gray-300 text-xl">=</span>
                    <span className="text-4xl font-black text-[#8E97A1]">
                       {twdResult}
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bookkeeping Tool */}
      <div className={`${cardClass} p-5 space-y-4`}>
        <div className="flex justify-between items-center">
           <h2 className="font-bold text-xl flex items-center gap-2">
            <Icons.Wallet /> 記帳
          </h2>
          <div className="text-right">
            <span className="text-xs font-bold opacity-40">總計: </span>
            <span className="text-[#FF6B6B] font-black">${Math.round(totalTwd).toLocaleString()}</span>
            <span className="text-[10px] font-bold opacity-40 ml-1">TWD</span>
          </div>
        </div>

        {/* Input Form Area */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 space-y-3">
          <input 
            type="text"
            placeholder="項目名稱 (e.g. 晚餐)"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#4ECDC4] outline-none text-sm font-medium"
          />
          <div className="flex gap-2">
            <input 
              type="number"
              placeholder="金額"
              value={newItemAmount}
              onChange={(e) => setNewItemAmount(e.target.value)}
              className="flex-1 p-3 rounded-lg border-2 border-gray-200 focus:border-[#4ECDC4] outline-none text-sm font-medium"
            />
            <select 
              value={newItemCurrency}
              onChange={(e) => setNewItemCurrency(e.target.value as any)}
              className="w-24 p-3 rounded-lg border-2 border-gray-200 focus:border-[#4ECDC4] outline-none text-sm font-bold bg-white"
            >
              <option value="TWD">TWD</option>
              <option value="VND">VND</option>
            </select>
          </div>
          <button 
            onClick={addExpense}
            className="w-full bg-[#2d2d2d] text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-[2px_4px_0_rgba(255,107,107,0.4)]"
          >
            <Icons.Plus /> 新增
          </button>
        </div>

        {/* Expense List */}
        <div className="space-y-4 py-2">
          {expenses.length === 0 ? (
            <div className="text-center py-8 opacity-20 italic text-sm">還沒有支出記錄喔 🍙</div>
          ) : (
            expenses.map(exp => (
              <div key={exp.id} className="flex justify-between items-center group">
                <div className="flex-1">
                  <div className="font-black text-sm">{exp.title}</div>
                  <div className="text-[10px] text-gray-400 font-bold">{exp.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-black text-sm">{exp.amount.toLocaleString()}</span>
                    <span className="text-[10px] font-bold opacity-40 ml-1 uppercase">{exp.currency}</span>
                  </div>
                  <button 
                    onClick={() => removeExpense(exp.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all p-1"
                  >
                    <Icons.Trash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {expenses.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            <button 
              onClick={copyToSheets}
              className="w-full p-3 border-2 border-dashed border-[#4ECDC4] rounded-xl text-[11px] font-black text-[#4ECDC4] flex items-center justify-center gap-2 hover:bg-[#4ECDC4]/5 transition-colors"
            >
              <Icons.Clipboard /> 複製資料 (貼上至 Google Sheets)
            </button>
            <button 
              onClick={clearAllExpenses}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-[11px] font-black text-gray-400 flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-400 hover:border-red-200 transition-colors"
            >
              <Icons.Trash2 /> 清空所有紀錄
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
