export const PROPERTIES = [
  {
    id: 'p1', title: 'Modern 3BR with City Views', type: 'Apartment', listingType: 'sale',
    price: 8500000, priceLabel: '₹85,00,000',
    address: '42 Willow Ave, Coimbatore, TN', city: 'Coimbatore',
    beds: 3, baths: 2, sqft: 1450, parking: 2, yearBuilt: 2019, floor: 8,
    status: 'active', agentId: 'a1',
    amenities: ['Parking','Gym','Lift','Security','Balcony','WiFi'],
    description: 'Stunning modern apartment with panoramic city views. Open-plan living, designer kitchen, and floor-to-ceiling windows on the 8th floor.',
    images: ['🏢'],
    color: '#e8f0fb',
    featured: true,
  },
  {
    id: 'p2', title: 'Luxury 4BR Villa with Pool', type: 'Villa', listingType: 'sale',
    price: 12000000, priceLabel: '₹1,20,00,000',
    address: '12 Oak Lane, Chennai, TN', city: 'Chennai',
    beds: 4, baths: 3, sqft: 2200, parking: 3, yearBuilt: 2020, floor: 1,
    status: 'active', agentId: 'a2',
    amenities: ['Parking','Pool','Garden','Security','Generator','CCTV'],
    description: 'Elegant villa in a gated community with private pool, manicured garden, and premium finishes throughout.',
    images: ['🏡'],
    color: '#eaf4ef',
    featured: true,
  },
  {
    id: 'p3', title: 'Cozy Studio Near IT Hub', type: 'Studio', listingType: 'rent',
    price: 18000, priceLabel: '₹18,000/mo',
    address: '8 Maple St, Bangalore, KA', city: 'Bangalore',
    beds: 1, baths: 1, sqft: 480, parking: 1, yearBuilt: 2018, floor: 3,
    status: 'sold', agentId: 'a1',
    amenities: ['Parking','Lift','WiFi','Power backup'],
    description: 'Compact, well-designed studio apartment minutes from major IT parks. Fully furnished option available.',
    images: ['🏠'],
    color: '#fef3e2',
    featured: false,
  },
  {
    id: 'p4', title: 'Spacious 3BR River View House', type: 'House', listingType: 'sale',
    price: 9500000, priceLabel: '₹95,00,000',
    address: '7 River View, Hyderabad, TS', city: 'Hyderabad',
    beds: 3, baths: 2, sqft: 1650, parking: 2, yearBuilt: 2017, floor: 1,
    status: 'active', agentId: 'a2',
    amenities: ['Parking','Garden','Security','CCTV'],
    description: 'Independent house with stunning river views, large terrace, and ample natural light. Prime locality.',
    images: ['🏘️'],
    color: '#fce8f0',
    featured: true,
  },
  {
    id: 'p5', title: '2BR Tech Park Apartment', type: 'Apartment', listingType: 'rent',
    price: 32000, priceLabel: '₹32,000/mo',
    address: '33 Tech Park Rd, Pune, MH', city: 'Pune',
    beds: 2, baths: 2, sqft: 1100, parking: 1, yearBuilt: 2021, floor: 12,
    status: 'pending', agentId: 'a1',
    amenities: ['Parking','Gym','Lift','Security','WiFi','Pool'],
    description: 'Premium apartment in the heart of Pune tech corridor. High-speed fiber, concierge service, rooftop pool.',
    images: ['🏢'],
    color: '#eeecfd',
    featured: false,
  },
  {
    id: 'p6', title: 'Beachside 5BR Luxury Villa', type: 'Villa', listingType: 'sale',
    price: 18000000, priceLabel: '₹1,80,00,000',
    address: '2 Palm Grove, Goa, GA', city: 'Goa',
    beds: 5, baths: 4, sqft: 3100, parking: 4, yearBuilt: 2022, floor: 1,
    status: 'active', agentId: 'a2',
    amenities: ['Parking','Pool','Garden','Security','Generator','Home Theater','Chef Kitchen'],
    description: 'Ultra-premium beachside villa with private pool, home theater, and professional chef kitchen. Steps from the beach.',
    images: ['🏡'],
    color: '#e1f5ee',
    featured: true,
  },
]

export const USERS = [
  { id: 'a1', name: 'James Davidson', role: 'agent', email: 'james@propspace.in', avatar: 'JD', phone: '+91 98765 43210', listings: 12, sales: 9, rating: 4.8 },
  { id: 'a2', name: 'Sarah Menon', role: 'agent', email: 'sarah@propspace.in', avatar: 'SM', phone: '+91 98765 12345', listings: 8, sales: 6, rating: 4.9 },
  { id: 'b1', name: 'Alex Thornton', role: 'buyer', email: 'alex@email.com', avatar: 'AT', phone: '+91 99001 11234', savedProperties: ['p1', 'p4'] },
  { id: 'b2', name: 'Priya Sharma', role: 'buyer', email: 'priya@email.com', avatar: 'PS', phone: '+91 99002 22345', savedProperties: ['p2'] },
  { id: 'b3', name: 'Carlos Ruiz', role: 'buyer', email: 'carlos@email.com', avatar: 'CR', phone: '+91 99003 33456', savedProperties: ['p6'] },
  { id: 'b4', name: 'Nina Johnson', role: 'buyer', email: 'nina@email.com', avatar: 'NJ', phone: '+91 99004 44567', savedProperties: [] },
]

export const CONVERSATIONS = [
  {
    id: 'c1', buyerId: 'b1', agentId: 'a1', propertyId: 'p1',
    messages: [
      { id: 'm1', senderId: 'b1', text: 'Hi James, I saw the listing for 42 Willow Ave. Is it still available?', time: '10:02 AM', date: 'Today' },
      { id: 'm2', senderId: 'a1', text: "Yes, it is! It's a lovely 3-bedroom with city views. Would you like to schedule a viewing?", time: '10:05 AM', date: 'Today' },
      { id: 'm3', senderId: 'b1', text: 'That sounds great. When is the earliest slot available?', time: '10:07 AM', date: 'Today' },
      { id: 'm4', senderId: 'a1', text: 'I have tomorrow at 2:00 PM or Thursday morning. Which works for you?', time: '10:09 AM', date: 'Today' },
      { id: 'm5', senderId: 'b1', text: 'Tomorrow at 2 PM works perfectly. Is parking included?', time: '10:11 AM', date: 'Today' },
    ],
    unread: 2,
  },
  {
    id: 'c2', buyerId: 'b2', agentId: 'a1', propertyId: 'p3',
    messages: [
      { id: 'm1', senderId: 'b2', text: 'Hello, I am interested in the studio near IT Hub. Is parking available?', time: '9:30 AM', date: 'Today' },
      { id: 'm2', senderId: 'a1', text: 'Hi Priya! Yes, one covered parking spot is included in the rent.', time: '9:45 AM', date: 'Today' },
    ],
    unread: 1,
  },
  {
    id: 'c3', buyerId: 'b3', agentId: 'a1', propertyId: 'p6',
    messages: [
      { id: 'm1', senderId: 'b3', text: 'The Goa villa looks amazing. Can you send me the property documents?', time: '3:00 PM', date: 'Yesterday' },
      { id: 'm2', senderId: 'a1', text: 'Absolutely! I will share the brochure and legal documents by EOD.', time: '3:15 PM', date: 'Yesterday' },
      { id: 'm3', senderId: 'b3', text: 'Sounds great, thanks!', time: '3:20 PM', date: 'Yesterday' },
    ],
    unread: 0,
  },
  {
    id: 'c4', buyerId: 'b4', agentId: 'a1', propertyId: 'p4',
    messages: [
      { id: 'm1', senderId: 'b4', text: 'Hi, can you send me more details and docs for the River View house?', time: '11:00 AM', date: 'Yesterday' },
    ],
    unread: 0,
  },
]

export const APPOINTMENTS = [
  { id: 'apt1', propertyId: 'p1', buyerId: 'b1', agentId: 'a1', date: 'Today', time: '2:00 PM', status: 'confirmed', notes: '' },
  { id: 'apt2', propertyId: 'p3', buyerId: 'b2', agentId: 'a1', date: 'Tomorrow', time: '10:30 AM', status: 'pending', notes: 'Wants fully furnished option.' },
  { id: 'apt3', propertyId: 'p4', buyerId: 'b3', agentId: 'a1', date: 'Apr 19, 2026', time: '3:00 PM', status: 'confirmed', notes: '' },
  { id: 'apt4', propertyId: 'p5', buyerId: 'b4', agentId: 'a1', date: 'Apr 21, 2026', time: '11:00 AM', status: 'confirmed', notes: 'Bring floor plan.' },
]

export const LEADS = [
  { buyerId: 'b1', propertyId: 'p1', heat: 'hot', source: 'Direct enquiry', date: 'Today' },
  { buyerId: 'b2', propertyId: 'p3', heat: 'warm', source: 'Search result', date: 'Today' },
  { buyerId: 'b3', propertyId: 'p6', heat: 'warm', source: 'Featured listing', date: 'Yesterday' },
  { buyerId: 'b4', propertyId: 'p4', heat: 'cold', source: 'Search result', date: 'Yesterday' },
]

export const MONTHLY_ENQUIRIES = [
  { month: 'Nov', value: 32 },
  { month: 'Dec', value: 47 },
  { month: 'Jan', value: 29 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 43 },
  { month: 'Apr', value: 61 },
]

export const TIME_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
export const BOOKED_SLOTS = ['10:00 AM', '3:00 PM']