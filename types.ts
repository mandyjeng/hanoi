
export enum Theme {
  COLORFUL = 'COLORFUL',
  SNOOPY = 'SNOOPY',
}

export enum Category {
  FOOD = '美食',
  ACTIVITY = '活動',
  SHOPPING = '購物',
  SIGHTSEEING = '景點',
  HOTEL = '住宿',
  TRANSPORT = '交通',
  MASSAGE = '按摩',
}

export interface Spot {
  id: string;
  time: string;
  category: Category;
  name: string;
  description: string;
  tags: string[]; // e.g., "必吃", "必買"
  locationUrl: string;
  websiteUrl?: string; // Optional website link
  photoTip?: string;
  userPhoto?: string;
  mustDo?: boolean;
  travelTime?: string; // New field for travel time
  grabFare?: string; // Estimated Grab cost
}

export interface SpotLocation {
  name: string;
  category: Category;
  description: string;
  tags: string[];
  googleMapLink: string;
  address?: string;
  website?: string;
}

export interface DayNote {
  title: string;
  items: string[];
  type: 'dining' | 'checklist' | 'info';
}

export interface DayItinerary {
  date: string;
  dayLabel: string; // e.g., "Day 1"
  weather: {
    temp: string;
    condition: string;
    icon: string; // emoji or code
    clothing: string;
  };
  spots: Spot[];
  notes?: DayNote[];
}

export interface FlightInfo {
  code: string;
  route: string;
  time: string;
  bookingCode: string;
  passengers: string;
  price?: string;
  baggage?: string;
}

export interface HotelInfo {
  name: string;
  address: string;
  bookingRef?: string;
  pin?: string;
  dates: string;
  roomType?: string;
  price?: string;
  breakfast?: string;
  guestName?: string;
  membership?: string;
  googleMapLink?: string;
}

export interface PackingItem {
  id: string;
  label: string;
  checked: boolean;
  category: 'carry-on' | 'checked' | 'backpack' | 'shopping';
  count: number;
}

export interface EmergencyContact {
  title: string;
  phone: string;
  note?: string;
}

export interface TravelRule {
  title: string;
  content: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  currency: 'TWD' | 'VND';
  date: string;
}
