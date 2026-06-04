export const featuredProperties = [
  // RESIDENTIAL - HOUSES/VILLAS
  {
    id: 1,
    title: "The Heritage Villa",
    price: "4.50 Cr",
    location: "DLF Phase 5, Gurgaon",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    category: "Residential",
    subCategory: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"
    ],
    description: "Experience unparalleled luxury in this sprawling heritage villa located in the heart of Gurgaon. This architectural masterpiece combines traditional aesthetics with modern high-end amenities, featuring a private pool, landscaped gardens, and smart home automation.",
    features: ["Private Infinity Pool", "Smart Home System", "Landscaped Garden", "4-Car Garage", "Home Theater", "Staff Quarters"],
    owner: {
      name: "Rajesh Malhotra",
      experience: "Owner & Industrialist",
      contact: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    specifications: {
      type: "Residential Villa",
      status: "Verified",
      yearBuilt: "2022",
      furnishing: "Fully Furnished",
      facing: "North-East"
    },
    tags: ["Luxury", "Garden"]
  },
  {
    id: 2,
    title: "Zion Sky Mansion",
    price: "2.10 Cr",
    location: "Worli, Mumbai",
    beds: 3,
    baths: 3,
    sqft: "1,850",
    category: "Residential",
    subCategory: "Apartment",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000"
    ],
    description: "Rise above the city in this exclusive Worli penthouse. Offering breathtaking views of the Arabian Sea, this residence redefined vertical luxury living with floor-to-ceiling windows and Italian marble flooring throughout.",
    features: ["Sea View", "Exclusive Elevator", "Italian Marble", "Concierge Service", "Gym Access"],
    owner: {
      name: "Sarah Fernandes",
      experience: "Architect",
      contact: "+91 99887 76655",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    specifications: {
      type: "High-rise Apartment",
      status: "Premium",
      yearBuilt: "2023",
      furnishing: "Semi-Furnished",
      facing: "West (Sea Facing)"
    },
    tags: ["Sea View", "Premium"]
  },
  // COMMERCIAL - OFFICES/SHOPS
  {
    id: 3,
    title: "Apex Business Hub",
    price: "7.80 Cr",
    location: "Bandra Kurla Complex, Mumbai",
    beds: 0,
    baths: 2,
    sqft: "5,500",
    category: "Commercial",
    subCategory: "Office Space",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    tags: ["Prime Location", "IT Park"]
  },
  {
    id: 4,
    title: "Royal Emporia Mall Shop",
    price: "1.25 Cr",
    location: "MG Road, Bangalore",
    beds: 0,
    baths: 0,
    sqft: "850",
    category: "Commercial",
    subCategory: "Shop",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=1000",
    tags: ["High Footfall"]
  },
  // LAND / PLOTS
  {
    id: 5,
    title: "Golden Acres Plot",
    price: "85.5 L",
    location: "New Chandigarh, Punjab",
    beds: 0,
    baths: 0,
    sqft: "2,250",
    category: "Plots",
    subCategory: "Residential Plot",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    tags: ["Gated Community"]
  },
  {
    id: 6,
    title: "Yamuna Expressway Industrial Land",
    price: "12.4 Cr",
    location: "Greater Noida, UP",
    beds: 0,
    baths: 0,
    sqft: "45,000",
    category: "Industrial",
    subCategory: "Industrial Land",
    image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=1000",
    tags: ["Logistic Hub"]
  },
  // SPECIAL TYPES
  {
    id: 7,
    title: "Eco-Friendly Farmhouse",
    price: "3.20 Cr",
    location: "Chhatarpur, Delhi",
    beds: 4,
    baths: 4,
    sqft: "1.5 Acre",
    category: "Residential",
    subCategory: "Farmhouse",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=1000",
    tags: ["Organic Garden", "Pool"]
  },
  // RENTAL PROPERTIES
  {
    id: 8,
    title: "Skyline View Penthouse",
    price: "85,000 /mo",
    location: "Koramangala, Bangalore",
    beds: 3,
    baths: 3,
    sqft: "2,200",
    category: "Rent",
    subCategory: "Penthouse",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
    tags: ["Furnished", "Gym Access"]
  },
  {
    id: 9,
    title: "Modern Studio Flat",
    price: "25,000 /mo",
    location: "Pune, Maharashtra",
    beds: 1,
    baths: 1,
    sqft: "650",
    category: "Rent",
    subCategory: "Studio",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
    tags: ["Metro Connectivity"]
  },
  {
    id: 10,
    title: "Riverside Duplex",
    price: "1.2 L /mo",
    location: "Noida, Sector 150",
    beds: 4,
    baths: 4,
    sqft: "3,500",
    category: "Rent",
    subCategory: "Duplex",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
    tags: ["Riverside", "Luxury"]
  },
  // ADDITIONAL PLOTS
  {
    id: 11,
    title: "Himalayan View Estate",
    price: "1.20 Cr",
    location: "Rishikesh, Uttarakhand",
    beds: 0,
    baths: 0,
    sqft: "10,000",
    category: "Plots",
    subCategory: "Residential Plot",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    tags: ["Hill View", "Gated"]
  },
  {
    id: 12,
    title: "Palm Breeze Lands",
    price: "45.0 L",
    location: "Vizag, Andhra Pradesh",
    beds: 0,
    baths: 0,
    sqft: "2,400",
    category: "Plots",
    subCategory: "Residential Plot",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    tags: ["Sea Side", "Corner Plot"]
  },
  // ADDITIONAL INDUSTRIAL
  {
    id: 13,
    title: "Cyber City Warehouse",
    price: "8.50 Cr",
    location: "Hyderabad, Telangana",
    beds: 0,
    baths: 2,
    sqft: "25,000",
    category: "Industrial",
    subCategory: "Warehouse",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
    tags: ["Cold Storage", "Loading Docks"]
  },
  {
    id: 14,
    title: "Smart Logistics Hub",
    price: "15.0 Cr",
    location: "Chennai, Tamil Nadu",
    beds: 0,
    baths: 4,
    sqft: "65,000",
    category: "Industrial",
    subCategory: "Distribution Center",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1000",
    tags: ["Tech-Enabled", "24/7 Access"]
  }
];

export const services = [
  { id: 1, name: "Buy Property", icon: "Home" },
  { id: 2, name: "Sell Property", icon: "Tag" },
  { id: 3, name: "Rent Property", icon: "Key" },
  { id: 4, name: "Home Loans", icon: "IndianRupee" },
  { id: 5, name: "Legal Verification", icon: "FileText" },
  { id: 6, name: "Interior Design", icon: "Palette" }
];
