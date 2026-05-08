export interface Design {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  tags: string[];
  stitchCount: number;
  width: number;
  height: number;
  colors: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  formats: string[];
  thumbnail: string;
  previewImages: string[];
  designerId: string;
  rating: number;
  reviewCount: number;
  favorites: number;
  views: number;
  createdAt: string;
  featured?: boolean;
}

export interface Designer {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  shopName: string;
  tagline: string;
  bio: string;
  totalSales: number;
  rating: number;
  reviewCount: number;
  responseTime: string;
  isVerified: boolean;
  memberSince: string;
  designs: number;
  followers: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "floral", name: "Floral & Botanical", icon: "Flower2", count: 2847 },
  { id: "geometric", name: "Geometric & Abstract", icon: "Hexagon", count: 1523 },
  { id: "monogram", name: "Monograms & Letters", icon: "Type", count: 3456 },
  { id: "holiday", name: "Holiday & Seasonal", icon: "Snowflake", count: 4211 },
  { id: "custom", name: "Custom & Personalized", icon: "Sparkles", count: 1892 },
  { id: "animals", name: "Animals & Pets", icon: "Cat", count: 2134 },
  { id: "vintage", name: "Vintage & Retro", icon: "Clock", count: 987 },
  { id: "sport", name: "Sports & Fitness", icon: "Dumbbell", count: 756 },
  { id: "kids", name: "Kids & Baby", icon: "Baby", count: 3567 },
  { id: "quotes", name: "Quotes & Sayings", icon: "MessageCircle", count: 1234 },
];

export const designers: Designer[] = [
  {
    id: "d1",
    name: "Elena Martinez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
    shopName: "Elena's Embroidery Art",
    tagline: "Handcrafted digital embroidery designs",
    bio: "Professional embroidery designer with over 10 years of experience creating unique designs for machine embroidery enthusiasts worldwide.",
    totalSales: 12847,
    rating: 4.9,
    reviewCount: 2341,
    responseTime: "Within 2 hours",
    isVerified: true,
    memberSince: "2021",
    designs: 245,
    followers: 3420,
  },
  {
    id: "d2",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1200&h=400&fit=crop",
    shopName: "Chen Custom Cuts",
    tagline: "Precision in every stitch",
    bio: "Specializing in custom logo digitization and commercial-grade embroidery designs with fast turnaround times.",
    totalSales: 8923,
    rating: 4.8,
    reviewCount: 1567,
    responseTime: "Within 4 hours",
    isVerified: true,
    memberSince: "2020",
    designs: 189,
    followers: 2156,
  },
  {
    id: "d3",
    name: "Sophia Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=400&fit=crop",
    shopName: "Willow & Wonder",
    tagline: "Whimsical designs for dreamers",
    bio: "Creating enchanting embroidery designs that bring stories to life. From fantasy creatures to botanical gardens.",
    totalSales: 6543,
    rating: 4.7,
    reviewCount: 892,
    responseTime: "Within 6 hours",
    isVerified: true,
    memberSince: "2022",
    designs: 156,
    followers: 1876,
  },
  {
    id: "d4",
    name: "James Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=400&fit=crop",
    shopName: "Thompson Threads",
    tagline: "Traditional craftsmanship, modern designs",
    bio: "Heritage-inspired embroidery designs that honor classic techniques while embracing contemporary aesthetics.",
    totalSales: 4231,
    rating: 4.6,
    reviewCount: 567,
    responseTime: "Within 12 hours",
    isVerified: false,
    memberSince: "2023",
    designs: 98,
    followers: 654,
  },
  {
    id: "d5",
    name: "Aisha Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=400&fit=crop",
    shopName: "Patel Premium Designs",
    tagline: "Luxury embroidery, accessible prices",
    bio: "Former fashion designer bringing high-end runway aesthetics to the embroidery community.",
    totalSales: 9876,
    rating: 4.9,
    reviewCount: 1234,
    responseTime: "Within 1 hour",
    isVerified: true,
    memberSince: "2021",
    designs: 312,
    followers: 4532,
  },
];

export const designs: Design[] = [
  {
    id: "des1",
    title: "Magnolia Bloom Collection",
    description: "A stunning collection of magnolia flowers in full bloom, perfect for adding a touch of elegance to any project. This design features realistic petal details and natural stem work.",
    price: 24.99,
    salePrice: 19.99,
    category: "Floral & Botanical",
    tags: ["floral", "magnolia", "flowers", "elegant", "spring"],
    stitchCount: 15420,
    width: 7.5,
    height: 9.2,
    colors: 8,
    difficulty: "Intermediate",
    formats: ["DST", "PES", "EXP", "JEF", "XXX"],
    thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=800&fit=crop",
    ],
    designerId: "d1",
    rating: 4.8,
    reviewCount: 234,
    favorites: 567,
    views: 4521,
    createdAt: "2024-02-15",
    featured: true,
  },
  {
    id: "des2",
    title: "Modern Geometric Set",
    description: "Contemporary geometric patterns perfect for minimalist home decor and fashion accessories. Includes 6 coordinating designs.",
    price: 34.99,
    category: "Geometric & Abstract",
    tags: ["geometric", "modern", "minimalist", "set", "abstract"],
    stitchCount: 8750,
    width: 5.0,
    height: 5.0,
    colors: 4,
    difficulty: "Beginner",
    formats: ["DST", "PES", "EXP", "VP3"],
    thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=800&fit=crop",
    ],
    designerId: "d2",
    rating: 4.9,
    reviewCount: 189,
    favorites: 423,
    views: 3210,
    createdAt: "2024-02-20",
    featured: true,
  },
  {
    id: "des3",
    title: "Royal Monogram Frame",
    description: "Elegant decorative monogram frame perfect for personalizing towels, linens, and garments. Custom letter available after purchase.",
    price: 14.99,
    category: "Monograms & Letters",
    tags: ["monogram", "letter", "royal", "elegant", "personalized"],
    stitchCount: 4520,
    width: 4.5,
    height: 4.5,
    colors: 2,
    difficulty: "Beginner",
    formats: ["DST", "PES", "EXP", "JEF", "XXX", "PEC"],
    thumbnail: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&h=800&fit=crop",
    ],
    designerId: "d1",
    rating: 4.7,
    reviewCount: 456,
    favorites: 892,
    views: 6789,
    createdAt: "2024-02-10",
    featured: true,
  },
  {
    id: "des4",
    title: "Enchanted Forest Animals",
    description: "Magical woodland creatures including deer, fox, owl, and rabbit in a whimsical storybook style. Perfect for nursery decor.",
    price: 44.99,
    salePrice: 37.99,
    category: "Animals & Pets",
    tags: ["animals", "forest", "whimsical", "nursery", "woodland"],
    stitchCount: 23400,
    width: 8.0,
    height: 10.0,
    colors: 12,
    difficulty: "Advanced",
    formats: ["DST", "PES", "EXP", "JEF"],
    thumbnail: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=800&fit=crop",
    ],
    designerId: "d3",
    rating: 4.9,
    reviewCount: 123,
    favorites: 345,
    views: 2345,
    createdAt: "2024-02-25",
    featured: true,
  },
  {
    id: "des5",
    title: "Holiday Wreath Bundle",
    description: "Festive holiday wreath designs for Christmas, Thanksgiving, and year-round seasonal decor. Includes 12 designs.",
    price: 29.99,
    category: "Holiday & Seasonal",
    tags: ["holiday", "wreath", "christmas", "seasonal", "bundle"],
    stitchCount: 18200,
    width: 6.5,
    height: 6.5,
    colors: 6,
    difficulty: "Intermediate",
    formats: ["DST", "PES", "EXP", "JEF", "XXX"],
    thumbnail: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=800&fit=crop",
    ],
    designerId: "d5",
    rating: 4.8,
    reviewCount: 567,
    favorites: 1234,
    views: 8901,
    createdAt: "2024-02-05",
    featured: true,
  },
  {
    id: "des6",
    title: "Custom Pet Portrait",
    description: "Turn your beloved pet into a beautiful embroidery design. Upload your photo and receive a custom digitized design.",
    price: 89.99,
    category: "Custom & Personalized",
    tags: ["custom", "pet", "portrait", "personalized", "dog", "cat"],
    stitchCount: 35000,
    width: 10.0,
    height: 12.0,
    colors: 15,
    difficulty: "Advanced",
    formats: ["DST", "PES", "EXP", "JEF", "XXX"],
    thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop",
    ],
    designerId: "d2",
    rating: 5.0,
    reviewCount: 78,
    favorites: 156,
    views: 1234,
    createdAt: "2024-03-01",
  },
  {
    id: "des7",
    title: "Art Deco Fan Pattern",
    description: "Stunning 1920s-inspired Art Deco fan design with geometric patterns and elegant curves. Perfect for Gatsby-themed projects.",
    price: 19.99,
    category: "Vintage & Retro",
    tags: ["art deco", "vintage", "geometric", "roaring twenties", "fan"],
    stitchCount: 9800,
    width: 6.0,
    height: 8.0,
    colors: 5,
    difficulty: "Intermediate",
    formats: ["DST", "PES", "EXP", "JEF"],
    thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop",
    ],
    designerId: "d4",
    rating: 4.6,
    reviewCount: 89,
    favorites: 234,
    views: 1567,
    createdAt: "2024-02-18",
  },
  {
    id: "des8",
    title: "Baby Safari Collection",
    description: "Adorable safari animals including lion, giraffe, elephant, and zebra in a sweet, simplified style perfect for baby items.",
    price: 27.99,
    category: "Kids & Baby",
    tags: ["baby", "safari", "animals", "kids", "nursery", "lion", "giraffe"],
    stitchCount: 11200,
    width: 5.5,
    height: 7.0,
    colors: 6,
    difficulty: "Beginner",
    formats: ["DST", "PES", "EXP", "JEF", "XXX", "PEC"],
    thumbnail: "https://images.unsplash.com/photo-1518882605630-8b17f65f4399?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1518882605630-8b17f65f4399?w=800&h=800&fit=crop",
    ],
    designerId: "d3",
    rating: 4.9,
    reviewCount: 345,
    favorites: 678,
    views: 5678,
    createdAt: "2024-02-12",
  },
  {
    id: "des9",
    title: "Fitness Gym Logo Set",
    description: "Professional gym and fitness center logo designs including dumbbells, weights, motivational quotes, and workout icons.",
    price: 39.99,
    category: "Sports & Fitness",
    tags: ["fitness", "gym", "logo", "sports", "workout", "health"],
    stitchCount: 6500,
    width: 4.0,
    height: 4.0,
    colors: 3,
    difficulty: "Beginner",
    formats: ["DST", "PES", "EXP", "JEF", "XXX", "VP3"],
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop",
    ],
    designerId: "d2",
    rating: 4.7,
    reviewCount: 156,
    favorites: 312,
    views: 2345,
    createdAt: "2024-02-22",
  },
  {
    id: "des10",
    title: "Inspirational Quotes Bundle",
    description: "Beautiful hand-lettered inspirational quotes perfect for decor and gifts. Includes 10 designs with motivational messages.",
    price: 22.99,
    salePrice: 17.99,
    category: "Quotes & Sayings",
    tags: ["quotes", "sayings", "typography", "inspiration", "hand-lettered"],
    stitchCount: 7800,
    width: 6.0,
    height: 4.0,
    colors: 4,
    difficulty: "Beginner",
    formats: ["DST", "PES", "EXP", "JEF", "XXX"],
    thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=800&fit=crop",
    ],
    designerId: "d5",
    rating: 4.8,
    reviewCount: 234,
    favorites: 456,
    views: 3456,
    createdAt: "2024-02-08",
  },
  {
    id: "des11",
    title: "Japanese Cherry Blossom",
    description: "Delicate sakura flowers with falling petals in traditional Japanese style. Perfect for spring projects and Asian-inspired decor.",
    price: 26.99,
    category: "Floral & Botanical",
    tags: ["floral", "cherry blossom", "japanese", "sakura", "spring", "asian"],
    stitchCount: 12300,
    width: 7.0,
    height: 8.5,
    colors: 5,
    difficulty: "Intermediate",
    formats: ["DST", "PES", "EXP", "JEF", "XXX"],
    thumbnail: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=800&fit=crop",
    ],
    designerId: "d1",
    rating: 4.9,
    reviewCount: 178,
    favorites: 567,
    views: 4123,
    createdAt: "2024-02-28",
  },
  {
    id: "des12",
    title: "Celtic Knot Border Set",
    description: "Traditional Celtic knotwork borders and corners in authentic patterns. Great for historical and fantasy projects.",
    price: 31.99,
    category: "Vintage & Retro",
    tags: ["celtic", "knotwork", "border", "traditional", "historical", "irish"],
    stitchCount: 14500,
    width: 8.0,
    height: 2.0,
    colors: 3,
    difficulty: "Advanced",
    formats: ["DST", "PES", "EXP", "JEF"],
    thumbnail: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=800&fit=crop",
    ],
    designerId: "d4",
    rating: 4.5,
    reviewCount: 67,
    favorites: 189,
    views: 1234,
    createdAt: "2024-02-30",
  },
];

export function getDesignById(id: string): Design | undefined {
  return designs.find((d) => d.id === id);
}

export function getDesignerById(id: string): Designer | undefined {
  return designers.find((d) => d.id === id);
}

export function getDesignsByDesigner(designerId: string): Design[] {
  return designs.filter((d) => d.designerId === designerId);
}

export function getDesignsByCategory(category: string): Design[] {
  return designs.filter((d) => d.category.toLowerCase().includes(category.toLowerCase()));
}

export function getFeaturedDesigns(): Design[] {
  return designs.filter((d) => d.featured);
}

export function getTrendingDesigns(): Design[] {
  return [...designs].sort((a, b) => b.favorites - a.favorites).slice(0, 6);
}

export function getNewArrivals(): Design[] {
  return [...designs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
}