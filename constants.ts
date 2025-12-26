
import { Category, DayItinerary, FlightInfo, HotelInfo, PackingItem, EmergencyContact, TravelRule, SpotLocation } from './types';

export const FLIGHTS: FlightInfo[] = [
  { 
    code: 'VJ947', 
    route: '高雄 KHH -> 河內 HAN', 
    time: '2026/01/05 16:15 - 18:05', 
    bookingCode: 'Y3YK4Y', 
    passengers: '3 名乘客',
    price: '6,250 TWD',
    baggage: '20kg 托運'
  },
  { 
    code: 'VJ942', 
    route: '河內 HAN -> 台北 TPE', 
    time: '2026/01/11 14:25 - 18:00', 
    bookingCode: 'KU2QJG', 
    passengers: '1 名乘客',
    price: '2,145 VND',
    baggage: '0kg (僅手提)'
  },
  { 
    code: 'VJ946', 
    route: '河內 HAN -> 高雄 KHH', 
    time: '2026/01/11 11:45 - 15:15', 
    bookingCode: 'TZ5KRP', 
    passengers: '2 名乘客',
    price: '5,296 TWD',
    baggage: '30kg 托運'
  },
];

export const HOTELS: HotelInfo[] = [
  { 
    name: 'PARKROYAL Serviced Suites Hanoi', 
    address: 'Ho Tay District (西湖區)', 
    dates: '01/05 - 01/11 (6晚)', 
    roomType: '2 Bedroom Suite (兩臥室套房)',
    price: 'USD 693.48',
    guestName: 'SHIN YU JENG',
    bookingRef: 'GHA DISCOVERY',
    membership: 'TITANIUM member - 8305888270',
    breakfast: '包含 3 客早餐',
    googleMapLink: 'https://www.google.com/maps/search/?api=1&query=PARKROYAL+Serviced+Suites+Hanoi' 
  },
  { 
    name: 'Emeralda Resort Ninh Binh', 
    address: 'Van Long Reserve (寧平)', 
    dates: '01/07 - 01/08 (1晚)', 
    roomType: '家庭複式房 (Duplex)',
    breakfast: '包含 3 客早餐',
    price: 'TWD 3,530',
    bookingRef: '1616325306743968',
    pin: '7957',
    googleMapLink: 'https://www.google.com/maps/search/?api=1&query=Emeralda+Resort+Ninh+Binh' 
  },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { title: '越南報警', phone: '113' },
  { title: '越南急救/消防', phone: '115 / 114' },
  { title: '駐越南台北代表處', phone: '+84-24-3833-5501', note: '河內 Cau Giay 區' },
  { title: '代表處緊急求助', phone: '+84-913-219-986', note: '僅限生命財產安全緊急情況' },
];

export const TRAVEL_RULES: TravelRule[] = [
  { title: '簽證 Visa', content: '請務必攜帶電子簽證 (E-visa) 紙本列印件。' },
  { title: '貨幣 Currency', content: '準備小面額越南盾 (VND) 以便支付小費。' },
  { title: '交通 Traffic', content: '過馬路時請保持均速前進，切勿突然停下或後退。' },
  { title: '飲水 Water', content: '請勿直接飲用自來水，建議購買瓶裝水。' },
];

export const DEFAULT_PACKING_LIST: PackingItem[] = [
  { id: '1', label: '護照 & 簽證 (紙本)', category: 'backpack', checked: false, count: 1 },
  { id: '2', label: '錢包 (越南盾/美金)', category: 'backpack', checked: false, count: 1 },
  { id: '3', label: '行動電源', category: 'carry-on', checked: false, count: 1 },
  { id: '4', label: '頸枕', category: 'carry-on', checked: false, count: 1 },
  { id: '5', label: '衣物 (7天份)', category: 'checked', checked: false, count: 7 },
  { id: '6', label: '盥洗用品', category: 'checked', checked: false, count: 1 },
  { id: '7', label: '萬用轉接頭', category: 'checked', checked: false, count: 1 },
  { id: '8', label: 'Marou 巧克力', category: 'shopping', checked: false, count: 5 },
  { id: '9', label: '越南咖啡豆', category: 'shopping', checked: false, count: 2 },
];

export const ALL_SPOTS: SpotLocation[] = [
  {
    name: 'Cilantro Restaurant',
    category: Category.FOOD,
    description: 'PARKROYAL 飯店內餐廳，提供精緻越式與國際料理。Titanium 會員享有 25% 折扣。',
    tags: ['方便首選', '飯店晚餐', '會員優惠'],
    googleMapLink: 'https://www.google.com/maps/search/?api=1&query=Cilantro+Restaurant+PARKROYAL+Hanoi',
    address: '飯店 1 樓'
  },
  {
    name: 'Savvy Artisanal Restaurant',
    category: Category.FOOD,
    description: '距離飯店僅 300 公尺的高評價餐廳，氣氛佳。',
    tags: ['步行300m', '手工料理'],
    googleMapLink: 'https://www.google.com/maps/search/?api=1&query=Savvy+Artisanal+Restaurant+Hanoi',
    address: '飯店附近'
  },
  {
    name: 'Not so Early',
    category: Category.FOOD,
    description: '步行約 700 公尺的質感小店。',
    tags: ['步行700m', '網美風'],
    googleMapLink: 'https://www.google.com/maps/search/?api=1&query=Not+so+Early+Hanoi'
  },
  {
    name: 'Sushi House Tây Hồ',
    category: Category.FOOD,
    description: '位於西湖區的日式壽司店，食材新鮮。',
    tags: ['步行700m', '日式料理'],
    googleMapLink: 'https://www.google.com/maps/search/?api=1&query=Sushi+House+Tay+Ho'
  },
  {
    name: 'La Spa Hàng Bè',
    category: Category.MASSAGE,
    description: '河內評價極高的專業 SPA 按摩店，環境優雅舒適，提供多種放鬆療程。',
    tags: ['必去', '放鬆', '需預約'],
    googleMapLink: 'https://www.google.com/maps/place/La+Spa+H%C3%A0ng+B%C3%A8/@21.0331252,105.8539806,16z/data=!4m9!3m8!1s0x3135ab95596d3a05:0xb2286e41fb7a32a3!5m2!4m1!1i2!8m2!3d21.0331252!4d105.8539806!16s%2Fg%2F11fl44zsc3?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
    address: '27 Hàng Bè, Hoàn Kiếm',
    website: 'https://laspas.vn/hang-be/'
  },
  {
    name: 'Quán Gốc Đa (枕頭餃 & 蟹肉春捲)',
    category: Category.FOOD,
    description: '位於大教堂旁的傳奇小吃店，以枕頭餃 (Bánh Gối) 與方型蟹肉春捲 (Nem Cua Bể) 聞名。營業至 22:00。',
    tags: ['必吃', '傳統小吃', '大教堂旁'],
    googleMapLink: 'https://maps.app.goo.gl/3ZJ8qM1tV798P6S67',
    address: '52 Lý Quốc Sư, Hoàn Kiếm'
  },
  {
    name: 'La Badiane',
    category: Category.FOOD,
    description: '河內頂級法式料理，融合越南在地食材。環境典雅，是精緻午餐與慶祝的首選。',
    tags: ['法式料理', '精緻', '米其林推薦'],
    googleMapLink: 'https://maps.app.goo.gl/JkTRv3Max75sgHeD8',
    address: '10 Nam Ngư, Hoàn Kiếm'
  },
  {
    name: 'Maison Marou Flagship Hanoi',
    category: Category.FOOD,
    description: '越南精品巧克力的代表。旗艦店販售各種口味巧克力排，提供甜點與現做飲品。',
    tags: ['必去', '巧克力', '下午茶', '伴手禮'],
    googleMapLink: 'https://maps.app.goo.gl/3e4aMpYHGfS49Fdx7',
    address: '91 Thợ Nhuộm, Hoàn Kiếm'
  },
  {
    name: 'XOFA Cafe & Bistro',
    category: Category.FOOD,
    description: '河內超人氣 24 小時咖啡館，裝潢復古溫馨，氛圍極佳。適合享受悠閒的午後時光。',
    tags: ['網美咖啡', '氣氛佳'],
    googleMapLink: 'https://maps.app.goo.gl/A7mJ9S8JqH8J8J8J8',
    address: '14 Tống Duy Tân, Hoàn Kiếm'
  },
  {
    name: 'Ginkgo Concept Store',
    category: Category.SHOPPING,
    description: '提供高品質有機棉製作的越南設計 T-shirt。圖案充滿越南文化特色，質感極佳。',
    tags: ['必買', '設計服裝'],
    googleMapLink: 'https://maps.app.goo.gl/2RzpzyeyhHRRWXk67',
    address: '54 Hàng Bè, Hoàn Kiếm'
  },
  {
    name: 'Culcat (精緻設計服飾)',
    category: Category.SHOPPING,
    description: '主打現代設計風格的精緻服飾店。風格獨特且充滿創意。',
    tags: ['必逛', '設計服裝'],
    googleMapLink: 'https://maps.app.goo.gl/ENKiwXrvywsk6yg18',
    address: '56 Đào Duy Từ, Hoàn Kiếm'
  },
  {
    name: '同春市場 (Đồng Xuân Market)',
    category: Category.SHOPPING,
    description: '河內最大的室內傳統市場。推薦在這裡購買高品質腰果與各類乾貨。',
    tags: ['必逛', '傳統市場', '伴手禮'],
    googleMapLink: 'https://maps.app.goo.gl/4HMNPS2muKJ7R7rw9',
    address: 'P. Đồng Xuân, Hoàn Kiếm'
  },
  {
    name: 'Lotte Center Hanoi',
    category: Category.SHOPPING,
    description: '河內地標建築，集百貨公司、飯店與展望台於一身。',
    tags: ['百貨公司', '購物', '地標'],
    googleMapLink: 'https://maps.app.goo.gl/3K5K7X6W1T6P7N7A6',
    address: '54 Liễu Giai, Ba Đình'
  },
  {
    name: 'Chè 4 Mùa Hàng Cân',
    category: Category.FOOD,
    description: '河內老字號傳統甜湯店，蓮子與綠豆湯是招牌。',
    tags: ['必吃', '傳統甜點', '老店'],
    googleMapLink: 'https://maps.app.goo.gl/djguFBweN3QgFwp38',
    address: '4 Hàng Cân, Hoàn Kiếm'
  },
  {
    name: 'Pizza 4P’s Tràng Tiền',
    category: Category.FOOD,
    description: '越南傳奇級的披薩連鎖。Tràng Tiền 分店裝潢大氣。',
    tags: ['必吃', '鮮起司', '人氣餐廳'],
    googleMapLink: 'https://maps.app.goo.gl/bczkn8vBSH83bvK6',
    address: '43 Tràng Tiền, Hoàn Kiếm'
  },
  {
    name: 'Mr Bảy Miền Tây - Bánh Xèo',
    category: Category.FOOD,
    description: '主打越南西南部特色煎餅 (Bánh Xèo)。米其林推薦。',
    tags: ['必吃', '越南煎餅', '傳統小吃', '米其林'],
    googleMapLink: 'https://maps.app.goo.gl/JvWRGTuAf26XMvWQ8',
    address: '79 Hàng Điếu, Hoàn Kiếm'
  },
  {
    name: 'Chả Cá Thăng Long',
    category: Category.FOOD,
    description: '米其林必比登推薦。薑黃魚塊桌邊現炒。有兩間分店。營業時間：週一/二/五/六 10:30-21:30，週三/四/日 10:00-21:00。',
    tags: ['必吃', '米其林', '鱧魚鍋'],
    googleMapLink: 'https://www.google.com/maps/place/6B+P.+%C4%90%C6%B0%E1%BB%9Dng+Th%C3%A0nh,+C%E1%BB%ADa+%C4%90%C3%B4ng,+Ho%C3%A0n+Ki%E1%BA%BFm,+H%C3%A0+N%E1%BB%99i+000084/@21.032937,105.8461542,1014m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3135abbddeac740f:0x1ed60ec67fc0e186!8m2!3d21.032937!4d105.8461542!16s%2Fg%2F11c27x37_2?entry=tts&g_ep=EgoyMDI0MDgyOC4wKgBIAVAD',
    address: '6B Đường Thành, Hoàn Kiếm',
    website: 'https://chacathanglong.com.vn/'
  },
  {
    name: 'Banh Mi 25',
    category: Category.FOOD,
    description: '古城區超人氣法國麵包。',
    tags: ['必吃', '法國麵包'],
    googleMapLink: 'https://www.google.com/maps/search/?api=1&query=Banh+Mi+25',
    address: '25 Hàng Cá'
  },
];

export const ITINERARY_DATA: DayItinerary[] = [
  {
    date: '2026/01/05',
    dayLabel: 'Day 1',
    weather: { temp: '16°C', condition: '多雲', icon: '☁️', clothing: '輕便外套、舒適長褲' },
    spots: [
      {
        id: 'd1-1', time: '16:15', category: Category.TRANSPORT, name: '出發：高雄小港 (VJ947)', 
        description: '搭乘越捷航空前往河內內排機場。預訂碼: Y3YK4Y。',
        tags: ['飛行'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Kaohsiung+International+Airport',
        travelTime: '飛行 2小時50分'
      },
      {
        id: 'd1-2', time: '18:05', category: Category.TRANSPORT, name: '抵達：河內內排機場 (HAN)', 
        description: '抵達後辦理入境，準備前往飯店。',
        tags: ['抵達'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Noi+Bai+International+Airport'
      },
      {
        id: 'd1-3', time: '19:30', category: Category.HOTEL, name: '入住：PARKROYAL Hanoi', 
        description: '辦理入住。鈦金會員記得詢問早餐時間與周邊美食建議。',
        tags: ['休息', '鈦金會員'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=PARKROYAL+Serviced+Suites+Hanoi',
        travelTime: '機場至飯店約 45分',
        grabFare: '310,960 VND (約 $373 TWD)'
      },
      {
        id: 'd1-4', time: '20:00', category: Category.FOOD, name: '晚餐首選：Cilantro Restaurant', 
        description: '飯店 1 樓餐廳。方便美味，鈦金會員出示房號可享 25% 優惠。',
        tags: ['方便首選', '飯店晚餐', '25%折扣'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Cilantro+Restaurant+PARKROYAL+Hanoi'
      },
      {
        id: 'd1-5', time: '20:30', category: Category.FOOD, name: '飯店週邊美食 (步行可達)', 
        description: '若想外出覓食，推薦：Savvy Artisanal (300m)、Not so Early (700m) 或 Sushi House (700m)。',
        tags: ['美食探索', '西湖區'], locationUrl: ''
      }
    ],
    notes: [
      {
        title: '飯店櫃檯 Checklist',
        type: 'info',
        items: [
          '確認明日早餐供應時間。',
          '詢問櫃檯近期推薦的西湖區私藏美食。',
          'Titanium 會員權益：Cilantro Restaurant 消費享 25% 優惠。'
        ]
      },
      {
        title: '抵達週邊美食距離參考',
        type: 'dining',
        items: [
          'Savvy Artisanal Restaurant：走路 300 公尺 (約 4 分鐘)',
          'Not so Early：走路 700 公尺 (約 9 分鐘)',
          'Sushi House Tây Hồ：走路 700 公尺 (約 9 分鐘)'
        ]
      }
    ]
  },
  {
    date: '2026/01/06',
    dayLabel: 'Day 2',
    weather: { temp: '18°C', condition: '晴朗', icon: '☀️', clothing: '洋蔥式穿搭、好走的鞋' },
    spots: [
      {
        id: 'd2-0', time: '09:00', category: Category.FOOD, name: '享用飯店早餐', 
        description: '在飯店內享用豐盛的自助早餐，補足體力。',
        tags: ['美食'], locationUrl: ''
      },
      {
        id: 'd2-1', time: '11:30', category: Category.MASSAGE, name: 'La Spa Hàng Bè 按摩', 
        description: '河內頂級 SPA 體驗。記得出示預約資訊。',
        tags: ['必去', '放鬆', '需預約'], 
        locationUrl: 'https://www.google.com/maps/place/La+Spa+H%C3%A0ng+B%C3%A8/@21.0331252,105.8539806,16z/data=!4m9!3m8!1s0x3135ab95596d3a05:0xb2286e41fb7a32a3!5m2!4m1!1i2!8m2!3d21.0331252!4d105.8539806!16s%2Fg%2F11fl44zsc3?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
        websiteUrl: 'https://laspas.vn/hang-be/',
        travelTime: '飯店出發約 20分'
      },
      {
        id: 'd2-2', time: '15:00', category: Category.FOOD, name: 'Chả Cá Thăng Long (鱧魚鍋)', 
        description: '在熱氣騰騰的油鍋中翻炒薑黃魚塊。有兩間分店。營業時間：10:30-21:30。',
        tags: ['必吃', '米其林', '預約15:00'], 
        locationUrl: 'https://www.google.com/maps/place/6B+P.+%C4%90%C6%B0%E1%BB%9Dng+Th%C3%A0nh,+C%E1%BB%ADa+%C4%90%C3%B4ng,+Ho%C3%A0n+Ki%E1%BA%BFm,+H%C3%A0+N%E1%BB%99i+000084/@21.032937,105.8461542,1014m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3135abbddeac740f:0x1ed60ec67fc0e186!8m2!3d21.032937!4d105.8461542!16s%2Fg%2F11c27x37_2?entry=tts&g_ep=EgoyMDI0MDgyOC4wKgBIAVAD',
        websiteUrl: 'https://chacathanglong.com.vn/',
        travelTime: 'SPA 步行約 15分'
      },
      {
        id: 'd2-3', time: '16:30', category: Category.ACTIVITY, name: '漫步老城區古街', 
        description: '穿梭於河內三十六古街，體驗道地人文風情。',
        tags: ['逛街', '老街'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Hanoi+Old+Quarter'
      },
      {
        id: 'd2-4', time: '18:00', category: Category.FOOD, name: '甜品：Chè Bốn Mùa', 
        description: '享用招牌蓮子、綠豆甜湯，解膩又清爽。',
        tags: ['必吃', '甜點'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Che+Bon+Mua+Hanoi'
      },
      {
        id: 'd2-1-5', time: '19:30', category: Category.FOOD, name: 'Quán Gốc Đa (輕晚餐)', 
        description: '回到飯店前的特色晚餐。品嚐著名的枕頭餃與蟹肉春捲，份量適中。店鋪營業至 22:00。',
        tags: ['必吃', '傳統小吃', '輕晚餐'], locationUrl: 'https://maps.app.goo.gl/3ZJ8qM1tV798P6S67',
        travelTime: '步行約 10分'
      }
    ],
    notes: [
      {
        title: 'Chả Cá Thăng Long 營業細節',
        type: 'dining',
        items: [
          '週一/二/五/六：10:30 - 21:30',
          '週三/四/日：10:00 - 21:00',
          '有兩間分店，地址詳見 Google Maps。'
        ]
      },
      {
        title: 'La Spa 預約與優惠提醒',
        type: 'info',
        items: [
          '⚠️ 務必先預約！熱門時段容易客滿。',
          '💰 HAPPY HOUR 優惠：09:00 - 12:00。',
          '🔥 凡預約 60 分鐘以上療程，現折 20% OFF。'
        ]
      },
      {
        title: 'Quán Gốc Đa 點餐參考',
        type: 'dining',
        items: [
          '營業時間：08:00 - 22:00',
          'Bánh Gối：枕頭餃 (14K) - 招牌',
          'Nem Cua Bể：方型蟹肉春捲 (15K) - 必點',
          'Nem Chua Rán：炸酸肉 (30K/份)'
        ]
      }
    ]
  },
  {
    date: '2026/01/07',
    dayLabel: 'Day 3',
    weather: { temp: '17°C', condition: '多雲', icon: '☁️', clothing: '防風外套、好走的鞋' },
    spots: [
      {
        id: 'd3-0', time: '08:30', category: Category.FOOD, name: '享用飯店早餐', 
        description: '在飯店內享用豐盛早餐後，準備前往寧平。',
        tags: ['美食'], locationUrl: ''
      },
      {
        id: 'd3-1', time: '09:30', category: Category.TRANSPORT, name: '包車前往寧平 (Ninh Binh)', 
        description: '搭乘專車前往寧平。',
        tags: ['移動', '包車'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ninh+Binh',
        travelTime: '車程約 2小時'
      },
      {
        id: 'd3-2', time: '11:30', category: Category.HOTEL, name: 'Check-in：Emeralda Resort', 
        description: '抵達度假村辦理入住。',
        tags: ['休息'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Emeralda+Resort+Ninh+Binh'
      },
      {
        id: 'd3-3', time: '14:00', category: Category.ACTIVITY, name: '渡假村活動體驗', 
        description: '參加渡假村內的各式活動，如腳踏車環湖、戶外游泳池或傳統工藝體驗。',
        tags: ['渡假', '悠閒', '活動'], 
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Emeralda+Resort+Ninh+Binh',
        websiteUrl: 'https://emeraldaresort.com/activities/'
      },
      {
        id: 'd3-4', time: '18:30', category: Category.FOOD, name: '渡假村內享用晚餐', 
        description: '在渡假村餐廳內悠閒享用晚餐，體驗寧平的夜晚寧靜。',
        tags: ['美食', '飯店晚餐'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Emeralda+Resort+Ninh+Binh'
      }
    ],
    notes: [
      {
        title: '代訂任務',
        type: 'checklist',
        items: [
          '請飯店櫃檯幫忙訂 Chả Cá Thăng Long 15:00 用餐。'
        ]
      },
      {
        title: 'Emeralda 渡假村貼心提醒',
        type: 'info',
        items: [
          '活動總覽連結：https://emeraldaresort.com/activities/',
          '晚餐建議：Organics Restaurant 或 Sen Restaurant 提供精緻越式與國際料理。',
          '夜間氣溫較低，建議備妥長袖外套。'
        ]
      }
    ]
  },
  {
    date: '2026/01/08',
    dayLabel: 'Day 4',
    weather: { temp: '19°C', condition: '晴', icon: '☀️', clothing: '薄外套、長褲' },
    spots: [
      {
        id: 'd4-1', time: '08:30', category: Category.FOOD, name: '享用飯店早餐', 
        description: '在渡假村內享用最後一頓豐盛早餐。',
        tags: ['美食'], locationUrl: ''
      },
      {
        id: 'd4-1-5', time: '10:00', category: Category.ACTIVITY, name: '渡假村活動最後體驗', 
        description: '退房前再次享受飯店設施，或租借腳踏車在渡假村周邊漫遊。',
        tags: ['悠閒', '飯店活動'], 
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Emeralda+Resort+Ninh+Binh',
        websiteUrl: 'https://emeraldaresort.com/activities/'
      },
      {
        id: 'd4-2', time: '14:00', category: Category.TRANSPORT, name: '包車返回河內', 
        description: '專車接送返回河內市區，結束寧平兩天一夜之旅。',
        tags: ['移動', '包車'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=PARKROYAL+Serviced+Suites+Hanoi',
        travelTime: '車程約 2小時'
      },
      {
        id: 'd4-3', time: '16:30', category: Category.HOTEL, name: '回到河內飯店放行李', 
        description: '抵達河內飯店放置行李並稍作休息，準備進入老城區。',
        tags: ['休息'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=PARKROYAL+Serviced+Suites+Hanoi'
      },
      {
        id: 'd4-4', time: '17:30', category: Category.FOOD, name: '下午茶點：Banh Mi 25', 
        description: '老城區必吃的法國麵包，外皮酥脆內餡豐富。',
        tags: ['必吃', '法國麵包'], locationUrl: 'https://www.google.com/maps/search/?api=1&query=Banh+Mi+25',
        travelTime: '飯店出發約 20分'
      },
      {
        id: 'd4-5', time: '18:30', category: Category.FOOD, name: '晚餐：Mr Bảy Miền Tây (Bánh Xèo)', 
        description: '享用米其林推薦的越南煎餅，層次分明且清爽不油膩。',
        tags: ['必吃', '越南煎餅', '米其林'], locationUrl: 'https://maps.app.goo.gl/JvWRGTuAf26XMvWQ8',
        travelTime: '步行約 10分'
      },
      {
        id: 'd4-6', time: '19:30', category: Category.SHOPPING, name: '老城區購物：Culcat & Ginkgo', 
        description: '在富有設計感的服飾店挑選具備越南特色的創意服裝與伴手禮。',
        tags: ['必逛', '設計服裝'], locationUrl: 'https://maps.app.goo.gl/ENKiwXrvywsk6yg18',
        travelTime: '步行 5-10分'
      }
    ],
    notes: [
      {
        title: '當日行程與店家提醒',
        type: 'info',
        items: [
          '🏨 飯店活動網址：https://emeraldaresort.com/activities/',
          '🛍️ Ginkgo：提供優質有機棉 T-shirt，圖案設計極具美感。',
          '🛍️ Culcat：風格更偏向現代剪裁，質感優良。',
          '💳 建議隨身攜帶小額現金，部分小吃店可能不支援刷卡。'
        ]
      }
    ]
  },
  {
    date: '2026/01/09',
    dayLabel: 'Day 5',
    weather: { temp: '20°C', condition: '晴朗', icon: '☀️', clothing: '舒適休閒服' },
    spots: [
      {
        id: 'd5-1', time: '09:00', category: Category.FOOD, name: '享用飯店早餐', 
        description: '在飯店內享用豐盛早餐。',
        tags: ['美食'], locationUrl: ''
      },
      {
        id: 'd5-2', time: '12:30', category: Category.FOOD, name: '午餐：La Badiane', 
        description: '於河內最負盛名的法式餐廳享用精緻料理。',
        tags: ['必吃', '精緻法餐'], locationUrl: 'https://maps.app.goo.gl/JkTRv3Max75sgHeD8'
      },
      {
        id: 'd5-3', time: '14:30', category: Category.SHOPPING, name: '同春市場 (Dong Xuan Market)', 
        description: '前往河內最大的市場，購買腰果伴手禮。',
        tags: ['必逛', '腰果', '伴手禮'], locationUrl: 'https://maps.app.goo.gl/4HMNPS2muKJ7R7rw9'
      },
      {
        id: 'd5-5', time: '17:30', category: Category.ACTIVITY, name: 'Lotte 65F 觀景夕陽 (Top of Hanoi)', 
        description: '欣賞河內絕美夕陽，俯瞰整座城市。',
        tags: ['必去', '夕陽', '高空景觀'], locationUrl: 'https://maps.app.goo.gl/3K5K7X6W1T6P7N7A6'
      }
    ]
  },
  {
    date: '2026/01/10',
    dayLabel: 'Day 6',
    weather: { temp: '18°C', condition: '多雲', icon: '🌥️', clothing: '長袖外套' },
    spots: [
      {
        id: 'd6-0', time: '09:30', category: Category.FOOD, name: '自由早晨：享受飯店或漫步西湖', 
        description: '今天不趕行程，在飯店享用早餐後，可以自由選擇想去的地方。',
        tags: ['悠閒', '自由探索'], locationUrl: ''
      },
      {
        id: 'd6-2', time: '13:00', category: Category.FOOD, name: 'XOFA Cafe & Bistro (午餐時光)', 
        description: '前往 24 小時營業的網美咖啡廳，享受復古溫馨的用餐環境與美味輕食。',
        tags: ['必吃', '網美咖啡', '預定13:00'], locationUrl: 'https://maps.app.goo.gl/A7mJ9S8JqH8J8J8J8',
        travelTime: 'Grab 約 15分'
      },
      {
        id: 'd6-4', time: '15:00', category: Category.FOOD, name: 'Maison Marou (巧克力下午茶)', 
        description: '傍晚前來到精品巧克力旗艦店，享受高品質巧克力飲品與精緻甜點。',
        tags: ['必去', '伴手禮', '預定15:00'], locationUrl: 'https://maps.app.goo.gl/3e4aMpYHGfS49Fdx7',
        travelTime: 'Grab 約 8分'
      },
      {
        id: 'd6-5', time: '16:00', category: Category.ACTIVITY, name: '隨心所欲自由行', 
        description: '剩下的時間完全留白，想去納就去納！可以去買伴手禮、逛古街或在大教堂前放空。',
        tags: ['自由行程', '探索河內'], locationUrl: ''
      }
    ],
    notes: [
      {
        title: '當日自由行建議',
        type: 'info',
        items: [
          '🚶 推薦散步：從 Maison Marou 步行至大教堂 (St. Joseph\'s Cathedral) 僅需 5 分鐘。',
          '🛍️ 最後採買：如果腰果或咖啡還沒買齊，這段時間是最後衝刺的好時機。',
          '🛵 自由探索：想去的地方隨時可以用 Grab 叫車，非常方便。'
        ]
      }
    ]
  },
  {
    date: '2026/01/11',
    dayLabel: 'Day 7',
    weather: { temp: '19°C', condition: '晴', icon: '✈️', clothing: '輕便裝' },
    spots: [
      {
        id: 'd7-0', time: '08:00', category: Category.FOOD, name: '享用飯店早餐', 
        description: '最後一天在河內享用早餐，檢查行李準備返程。',
        tags: ['美食'], locationUrl: ''
      },
      {
        id: 'd7-1', time: '11:45', category: Category.TRANSPORT, name: '返程：河內 HAN (VJ946)', 
        description: '結束旅程返回高雄。',
        tags: ['飛行'], locationUrl: ''
      }
    ]
  }
];
