export interface Review {
  id: string;
  designId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  qualityRating: number;
  accuracyRating: number;
  comment: string;
  images: string[];
  helpful: number;
  createdAt: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: "rev1",
    designId: "des1",
    userId: "u1",
    userName: "Sarah Mitchell",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "Absolutely stunning design! The stitches came out perfectly on my Brother PE800. The color changes are smooth and the detail is incredible. I've already purchased two more designs from this seller.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    ],
    helpful: 24,
    createdAt: "2024-02-15",
    verified: true,
  },
  {
    id: "rev2",
    designId: "des1",
    userId: "u2",
    userName: "Jennifer Blake",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 4,
    comment: "Beautiful magnolia design! I made it as a table runner for spring and it turned out gorgeous. One small note - the green leaf sections have quite a lot of jump stitches, but nothing a quick trim won't fix.",
    images: [],
    helpful: 18,
    createdAt: "2024-02-10",
    verified: true,
  },
  {
    id: "rev3",
    designId: "des1",
    userId: "u3",
    userName: "Amanda Chen",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 4,
    qualityRating: 4,
    accuracyRating: 5,
    comment: "Love this design! The sizing was perfect for my 6x10 hoop. Stitched beautifully on my Janome MC9900. Only giving 4 stars because one petal section seemed slightly under-filled, but overall very happy.",
    images: [],
    helpful: 12,
    createdAt: "2024-01-28",
    verified: true,
  },
  {
    id: "rev4",
    designId: "des2",
    userId: "u4",
    userName: "Michael Torres",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "Perfect for my minimalist brand logo! The geometric patterns are crisp and clean. I've used these on several corporate uniform shirts and they look very professional.",
    images: [
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
    ],
    helpful: 31,
    createdAt: "2024-02-18",
    verified: true,
  },
  {
    id: "rev5",
    designId: "des2",
    userId: "u5",
    userName: "David Park",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "Exactly what I needed! The set of 6 designs works great together or separately. Very easy to stitch out, even for a beginner like me. Highly recommend!",
    images: [],
    helpful: 8,
    createdAt: "2024-02-05",
    verified: true,
  },
  {
    id: "rev6",
    designId: "des3",
    userId: "u6",
    userName: "Emily Roberts",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "The monogram frame is absolutely elegant! I personalized it with my initials for a wedding gift and it turned out beautifully. The seller was also quick to help me with a custom modification.",
    images: [
      "https://images.unsplash.com/photo-1565120347669-3067e1b243ec?w=400&h=400&fit=crop",
    ],
    helpful: 45,
    createdAt: "2024-02-20",
    verified: true,
  },
  {
    id: "rev7",
    designId: "des3",
    userId: "u7",
    userName: "Rachel Green",
    userAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
    rating: 4,
    qualityRating: 4,
    accuracyRating: 4,
    comment: "Beautiful design, stitched out nicely. I used it for spa towels as wedding favors. The only reason for 4 stars is that I wish there were more decorative flourishes included.",
    images: [],
    helpful: 15,
    createdAt: "2024-02-01",
    verified: true,
  },
  {
    id: "rev8",
    designId: "des4",
    userId: "u8",
    userName: "Lisa Anderson",
    userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "My nursery is going to look amazing with these woodland creatures! The designs are so detailed and cute. Stitched beautifully on 100% cotton fabric. Worth every penny!",
    images: [
      "https://images.unsplash.com/photo-1446292267125-fecb4ecbf355?w=400&h=400&fit=crop",
    ],
    helpful: 52,
    createdAt: "2024-02-22",
    verified: true,
  },
  {
    id: "rev9",
    designId: "des4",
    userId: "u9",
    userName: "Nicole Williams",
    userAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "These enchanted forest animals are ADORABLE! I've made bibs and burp cloths with the set. The thread colors suggested work perfectly. My baby shower guests loved them!",
    images: [],
    helpful: 38,
    createdAt: "2024-02-12",
    verified: true,
  },
  {
    id: "rev10",
    designId: "des5",
    userId: "u10",
    userName: "Karen Miller",
    userAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "Perfect for the holidays! I made these wreaths on ornament frames and they're selling like hotcakes at my craft fair. The designs are versatile enough for multiple seasons.",
    images: [
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=400&fit=crop",
    ],
    helpful: 29,
    createdAt: "2024-02-08",
    verified: true,
  },
  {
    id: "rev11",
    designId: "des5",
    userId: "u11",
    userName: "Patricia Davis",
    userAvatar: "https://images.unsplash.com/photo-1527788263495-3518a5c1c42d?w=100&h=100&fit=crop",
    rating: 4,
    qualityRating: 4,
    accuracyRating: 4,
    comment: "Great holiday bundle! The designs are well digitized and stitch out beautifully. I would have liked more Easter/spring options, but what is included is excellent quality.",
    images: [],
    helpful: 11,
    createdAt: "2024-01-30",
    verified: true,
  },
  {
    id: "rev12",
    designId: "des6",
    userId: "u12",
    userName: "Stephanie Johnson",
    userAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "I can't believe how much this looks like my Golden Retriever! The custom pet portrait is absolutely perfect. The designer captured every detail. This is a treasured keepsake.",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    ],
    helpful: 67,
    createdAt: "2024-02-25",
    verified: true,
  },
  {
    id: "rev13",
    designId: "des7",
    userId: "u13",
    userName: "Victoria Martinez",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "This Art Deco fan is STUNNING! I used it for a Great Gatsby themed wedding and everyone loved it. The design has such beautiful detail and the pearls/stones stitch out perfectly.",
    images: [],
    helpful: 41,
    createdAt: "2024-02-16",
    verified: true,
  },
  {
    id: "rev14",
    designId: "des8",
    userId: "u14",
    userName: "Christina Brown",
    userAvatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "Perfect for my baby shower decorations! The safari animals are so cute and the simplified style works great on onesies. I'm making a whole set as a gift. Love it!",
    images: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop",
    ],
    helpful: 33,
    createdAt: "2024-02-14",
    verified: true,
  },
  {
    id: "rev15",
    designId: "des9",
    userId: "u15",
    userName: "Brandon Scott",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4,
    qualityRating: 5,
    accuracyRating: 4,
    comment: "Solid gym logo set. The designs are clean and professional. I had to adjust the sizing a bit for my commercial machines but overall very happy with the purchase.",
    images: [],
    helpful: 19,
    createdAt: "2024-02-03",
    verified: true,
  },
  {
    id: "rev16",
    designId: "des10",
    userId: "u16",
    userName: "Angela White",
    userAvatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "These inspirational quotes are gorgeous! The hand-lettered style is so elegant. I've made several for my home and as gifts. The text is perfectly balanced and stitches out beautifully.",
    images: [],
    helpful: 27,
    createdAt: "2024-02-19",
    verified: true,
  },
  {
    id: "rev17",
    designId: "des11",
    userId: "u17",
    userName: "Hana Kimura",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    qualityRating: 5,
    accuracyRating: 5,
    comment: "Japanese cherry blossom at its finest! The falling petals design is so delicate and beautiful. It reminds me of home. Stitched perfectly on my Singer.",
    images: [
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=400&fit=crop",
    ],
    helpful: 36,
    createdAt: "2024-02-11",
    verified: true,
  },
  {
    id: "rev18",
    designId: "des12",
    userId: "u18",
    userName: "Maureen O'Brien",
    userAvatar: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=100&h=100&fit=crop",
    rating: 4,
    qualityRating: 4,
    accuracyRating: 5,
    comment: "Beautiful Celtic knotwork! The borders are historically accurate and beautifully designed. I used them on my medieval-themed tapestry. Very impressed with the craftsmanship.",
    images: [],
    helpful: 22,
    createdAt: "2024-02-06",
    verified: true,
  },
];

export function getReviewsByDesignId(designId: string): Review[] {
  return reviews.filter((r) => r.designId === designId);
}

export function getReviewStats(designId: string) {
  const designReviews = getReviewsByDesignId(designId);
  if (designReviews.length === 0) {
    return {
      averageRating: 0,
      averageQuality: 0,
      averageAccuracy: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const totalRating = designReviews.reduce((sum, r) => sum + r.rating, 0);
  const totalQuality = designReviews.reduce((sum, r) => sum + r.qualityRating, 0);
  const totalAccuracy = designReviews.reduce((sum, r) => sum + r.accuracyRating, 0);

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  designReviews.forEach((r) => {
    ratingDistribution[r.rating as keyof typeof ratingDistribution]++;
  });

  return {
    averageRating: totalRating / designReviews.length,
    averageQuality: totalQuality / designReviews.length,
    averageAccuracy: totalAccuracy / designReviews.length,
    totalReviews: designReviews.length,
    ratingDistribution,
  };
}
