export interface RentalProduct {
  slug: string;
  wooProductId: number;
  name: string;
  size: string;
  eyebrow?: string;
  heroTitle?: string;
  heroHighlight?: string;
  heroTitleSecondLine?: string;
  price: string;
  image: string;
  angles?: string[];
  color: string;
  badge?: string;
  features: string[];
  desc: string;
  summary: string;
  detail?: string;
  heroLead?: string;
  heroProofBullets?: string[];
  description?: string[];
  descriptionBullets?: Array<{
    icon: string;
    title?: string;
    text: string;
  }>;
  additionalInfo?: string[];
  additionalSectionTitle?: string;
  additionalSectionHeading?: string;
  additionalSectionSubtitle?: string;
  rentalColumns?: Array<{
    label: string;
    icon: "shield" | "home" | "calendar" | "card";
    body: string;
  }>;
  additionalSectionRows?: Array<{
    icon: string;
    label: string;
    body: string[];
  }>;
  rentalInfo?: string[];
  requirementsSectionTitle?: string;
  requirementsSectionSubtitle?: string;
  benefitsHeading?: string;
  benefitsIntro?: string;
  requirementsRows?: Array<{
    label: string;
    value: string;
  }>;
  reasons?: Array<{
    icon: string;
    title: string;
    text: string;
    tone: string;
  }>;
  points?: string[];
}

const WP_UPLOADS_BASE = "https://wp.heavenlygiggles.com/wp-content/uploads";

export const rentalProducts: RentalProduct[] = [
  {
    slug: "standard-jumping-castle-4m-x-4m",
    wooProductId: 703,
    rentalColumns: [
      {
        label: "Ages & Safety",
        icon: "shield",
        body: "Suitable for kids aged 1 to 12. An adult must be present at all times. We clean and sanitise every castle before and after each hire.",
      },
      {
        label: "Space & Power",
        icon: "home",
        body: "Needs a flat, grassy area of 4m x 4m with no slopes or sharp objects. Requires a standard 220v plug point within reach.",
      },
      {
        label: "Booking & Collection",
        icon: "calendar",
        body: "Weekend hire from R700. Free delivery and setup in Fourways, with Monday collection. Cancel 48 hours before your event to avoid fees. Full terms apply.",
      },
      {
        label: "Payment",
        icon: "card",
        body: "Full payment is required before delivery. We accept credit and debit cards.",
      },
    ],
    name: "Standard Jumping Castle",
    size: "4m × 4m",
    eyebrow: "Standard Jumping Castle 4m × 4m",
    heroTitle: "They Bounce",
    heroHighlight: "You Relax",
    heroTitleSecondLine: undefined,
    price: "R700",
    image: "/standard-jumping-castle-photo-v3.jpg",
    angles: [
      "/products/standard-jumping-castle/angle-1.jpg",
      "/products/standard-jumping-castle/angle-2.jpg",
      "/products/standard-jumping-castle/angle-3.jpg",
    ],
    color: "card-purple",
    features: ["Up to 6 kids at once", "Suitable ages 3–12", "SABS safety checked", "Includes blower & pegs"],
    desc: "The classic. Perfect for birthdays, playdates, and any excuse to keep the kids busy for hours. Easy to set up in any standard garden.",
    summary: "Keep the kids bouncing, laughing and entertained for hours. Our classic jumping castle is perfect for birthdays, playdates and a whole weekend of fun.",
    detail:
      "Our 4m x 4m Standard Jumping Castle is the perfect party lifesaver: fun, safe, and designed to keep kids entertained for hours while you actually get to enjoy the day too.",
    heroLead:
      "Our 4m x 4m Standard Jumping Castle is the perfect party lifesaver; fun, safe, and designed to keep kids entertained for hours so bedtime actually happens.",
    heroProofBullets: [
      "⭐ Double-stitched throughout and reinforced at stress points.",
      "🔧 Made from ultra-durable, SABS-approved 700gm coated fabric.",
      "💨 Powered by a high-quality 0.75kw (220v) blower fan for endless bouncing.",
    ],
    description: [
      "They jump. They laugh. They burn energy. Meanwhile, you get to sit down for five minutes without someone asking for snacks.",
      "Our 4m x 4m Standard Jumping Castle is the perfect party lifesaver: fun, safe, and designed to keep kids entertained for hours, so bedtime actually has a chance of happening.",
      "It is the classic choice for birthdays, playdates, and weekend gatherings when you want simple fun that keeps the kids happy without making the setup feel complicated.",
    ],
    descriptionBullets: [
      {
        icon: "🎢",
        title: "Jump. Laugh. Repeat.",
        text: "This jumping castle is the ultimate hack for keeping kids entertained, happy, and safely contained.",
      },
      {
        icon: "💙",
        title: "Classic, Timeless Fun",
        text: "Watch them bounce their little hearts out while you kick back.",
      },
      {
        icon: "💙",
        title: "Soft Landings, Zero Stress",
        text: "Built for max fun and minimum party-day meltdowns.",
      },
      {
        icon: "🎈",
        title: "Perfect for Any Party Day",
        text: "Perfect for birthdays, school events, and any day you need them to burn off steam without using your couch as a trampoline.",
      },
      {
        icon: "👩",
        title: "Less Work for Parents",
        text: "Because parenting is exhausting, let us do the hard part.",
      },
      {
        icon: "📅",
        title: "A Full Weekend of Fun",
        text: "Weekend hire only, because mums deserve two days off, not one.",
      },
    ],
    additionalInfo: [
      "Size: 4m x 4m.",
      "Double-stitched throughout and reinforced at stress points.",
      "Made from ultra-durable, SABS-approved 700gm coated fabric.",
      "Powered by a high-quality 0.75kw (220v) blower fan.",
      "Blower and pegs are included with every hire.",
    ],
    additionalSectionTitle: "Additional Info",
    additionalSectionHeading: "What to Know Before We Arrive",
    additionalSectionSubtitle: "Everything that helps the weekend run smoothly.",
    additionalSectionRows: [
      {
        icon: "🚚",
        label: "Delivery & Setup",
        body: [
          "We handle setup and takedown. Weekend pickups happen on Monday.",
        ],
      },
      {
        icon: "🌿",
        label: "Setting Up for Maximum Fun",
        body: [
          "Set up on flat grass with no sharp objects underneath. We peg everything down securely.",
        ],
      },
      {
        icon: "🔌",
        label: "Power Connection",
        body: [
          "Keep a standard 220v plug point within reach. No electrician is needed.",
        ],
      },
      {
        icon: "🪪",
        label: "Identification & Security",
        body: [
          "A valid ID or driver’s licence is required on delivery.",
        ],
      },
      {
        icon: "⚠️",
        label: "Indemnity (AKA, Don’t Sue Us)",
        body: [
          "Using the inflatable means accepting our standard indemnity terms. Please follow the safety rules and use it as intended.",
        ],
      },
      {
        icon: "🎈",
        label: "Quick Signature on Arrival",
        body: [
          "We’ll need a quick signature on arrival, so everyone is covered.",
        ],
      },
    ],
    rentalInfo: [
      "Weekend hire from R700.",
      "Free delivery in Fourways.",
      "We only rent for the whole weekend because two days off are better than one.",
      "Setup is included, with Monday collection handled for you.",
      "Need a longer hire? WhatsApp us and we’ll help with the best option.",
    ],
    requirementsSectionTitle: "Requirements",
    requirementsSectionSubtitle: "The simple setup rules that keep the bouncing safe, stable, and stress-free.",
    benefitsHeading: "Why This Standard Jumping Castle Works So Well",
    benefitsIntro:
      "Four metres of bouncy fun that keeps kids busy and gives you a breather.",
    requirementsRows: [
      {
        label: "Requirements",
        value:
          "🌿 This 4m × 4m jumping castle needs a flat, grassy surface to ensure safe, stable bouncing. No slopes, no sharp objects, just a soft, secure spot for maximum fun. Got an uneven yard? Don’t worry, we’ll help you find the best setup for a wobble-free bounce zone.",
      },
      {
        label: "Power",
        value:
          "🔌 This jumping castle runs on a standard 220v plug point. No electrician required. Just make sure there is a power point within reach.",
      },
      {
        label: "Ages",
        value:
          "👧👦 This jumping castle is suitable for kids aged 1 to 12.",
      },
      {
        label: "Safety",
        value:
          "👀 An adult must be present at all times while the inflatable is in use. Our inflatables are built for safe play, so please keep an eye on the children whenever they are on it.",
      },
      {
        label: "Hygiene",
        value:
          "🧼 We clean and sanitise every jumping castle before and after each hire.",
      },
      {
        label: "T&C's",
        value:
          "🎈 Booking & Cancellations: All bookings are subject to our standard rental terms. Change of plans? No worries, just cancel at least 48 hours before your event to avoid cancellation fees.",
      },
      {
        label: "Payment",
        value:
          "💳 Full payment is required before delivery. We accept credit and debit cards.",
      },
    ],
    reasons: [
      {
        icon: "🏰",
        title: "They Jump. They Laugh. They Burn Energy.",
        text: "A safe place to bounce for hours, and a rare chance for you to catch your breath.",
        tone: "gold",
      },
      {
        icon: "🪑",
        title: "You Actually Get Five Quiet Minutes",
        text: "Kids stay busy jumping, so you have room to host, chat, or enjoy a hot coffee.",
        tone: "pink",
      },
      {
        icon: "📏",
        title: "Fits Beautifully into Standard Gardens",
        text: "The 4m x 4m size fits most garden spaces without feeling too big.",
        tone: "teal",
      },
      {
        icon: "⭐",
        title: "A Classic Party Lifesaver",
        text: "The easy choice for birthdays, playdates and family gatherings. Simple and reliable.",
        tone: "purple",
      },
      {
        icon: "🛡️",
        title: "Built for Safe, Durable Fun",
        text: "Reinforced stitching, SABS-approved fabric and a quality blower, ready for every party.",
        tone: "pink",
      },
      {
        icon: "📅",
        title: "Whole-Weekend Hire Just Feels Better",
        text: "A full weekend from R700, so the kids have time to play and you have time to relax.",
        tone: "teal",
      },
    ],
    points: [
      "A great all-rounder for birthdays, braais, family gatherings, and weekend playdates.",
      "Easy to place in a standard garden without taking over the whole space.",
      "Weekend hire means more value and less pressure to cram the fun into one afternoon.",
    ],
  },
  {
    slug: "jumping-castle-slide-7m-x-4m",
    wooProductId: 794,
    rentalColumns: [
      {
        label: "Ages & Safety",
        icon: "shield",
        body: "Suitable for kids aged 1 to 12. An adult must be present at all times. We clean and sanitise every castle before and after each hire.",
      },
      {
        label: "Space & Power",
        icon: "home",
        body: "Needs a flat, grassy area of 7m x 4m with no slopes or sharp objects. Requires a standard 220v plug point within reach.",
      },
      {
        label: "Booking & Collection",
        icon: "calendar",
        body: "Weekend hire from R900. Free delivery and setup in Fourways, with Monday collection. Cancel 48 hours before your event to avoid fees. Full terms apply.",
      },
      {
        label: "Payment",
        icon: "card",
        body: "Full payment is required before delivery. We accept credit and debit cards.",
      },
    ],
    name: "Jumping Castle & Slide",
    size: "7m × 4m",
    eyebrow: "Jumping Castle & Slide 7m × 4m",
    heroTitle: "They Jump & Slide",
    heroHighlight: "You Sit & Relax",
    heroTitleSecondLine: undefined,
    price: "R900",
    image: "/jumping-castle-slide-photo-v2.jpg",
    angles: [
      "/products/jumping-castle-slide/angle-1.jpg",
      "/products/jumping-castle-slide/angle-2.jpg",
      "/products/jumping-castle-slide/angle-3.jpg",
    ],
    color: "card-pink",
    badge: "Most Popular",
    features: ["Jump AND slide", "Up to 8 kids at once", "Suitable ages 3–14", "SABS safety checked"],
    desc: "Double the excitement — jump, climb, and slide. The biggest hit at every party. Kids will be too busy to even think about going inside.",
    summary: "Double the fun with room to jump, climb and slide. The kids stay entertained for hours while you sit back and enjoy the party.",
    detail:
      "If you want the one that usually steals the show, this is it. The jumping castle and slide combo adds more movement, more excitement, and more ways for kids to burn energy while you enjoy a party that feels effortlessly entertaining.",
    heroLead:
      "This 7m x 4m Jumping Castle & Slide is the best of both worlds, a spacious bouncing zone plus an awesome slide for endless fun. The kids stay entertained, and you get a well-earned break.",
    heroProofBullets: [
      "⭐ Double-stitched throughout and reinforced at stress points.",
      "🔧 Made from ultra-durable, SABS-approved 700gm coated fabric.",
      "💨 Powered by a high-quality 0.75kw (220v) blower fan for all-day bouncing.",
    ],
    descriptionBullets: [
      {
        icon: "🎉",
        title: "Double the Fun",
        text: "A bouncing zone and a built-in slide in one inflatable means there is always something exciting happening.",
      },
      {
        icon: "🛝",
        title: "Best of Both Worlds",
        text: "Perfect for kids who want to bounce, climb, slide, and race straight back for another turn.",
      },
      {
        icon: "💥",
        title: "Maximum Energy Burner",
        text: "Built to keep little ones moving for hours so they burn off that never-ending party energy.",
      },
      {
        icon: "🛡️",
        title: "Safe, Durable Fun",
        text: "Double-stitched, reinforced, and made from SABS-approved materials for confident play.",
      },
      {
        icon: "😌",
        title: "Less Work for You",
        text: "No setup, no takedown, no admin spiral. We handle the logistics while you enjoy the breather.",
      },
      {
        icon: "✨",
        title: "Clean and Party-Ready",
        text: "Fully cleaned and sanitised before and after every hire, because fun should not come with mystery stickiness.",
      },
    ],
    additionalSectionTitle: "Additional Info",
    additionalSectionHeading: "What to Know Before We Arrive",
    additionalSectionSubtitle: "Everything that helps the weekend run smoothly.",
    additionalSectionRows: [
      {
        icon: "🚚",
        label: "Delivery & Setup",
        body: [
          "We handle setup and takedown. Weekend pickups happen on Monday.",
        ],
      },
      {
        icon: "🌿",
        label: "Setting Up for Maximum Fun",
        body: [
          "Set up on flat grass with no sharp objects underneath. We peg everything down securely.",
        ],
      },
      {
        icon: "🔌",
        label: "Power Connection",
        body: [
          "Keep a standard 220v plug point within reach. No electrician is needed.",
        ],
      },
      {
        icon: "🪪",
        label: "Identification & Security",
        body: [
          "A valid ID or driver’s licence is required on delivery.",
        ],
      },
      {
        icon: "⚠️",
        label: "Indemnity (AKA, Don’t Sue Us)",
        body: [
          "Using the inflatable means accepting our standard indemnity terms. Please follow the safety rules and use it as intended.",
        ],
      },
      {
        icon: "🎈",
        label: "Quick Signature on Arrival",
        body: [
          "We’ll need a quick signature on arrival, so everyone is covered.",
        ],
      },
    ],
    requirementsSectionSubtitle: "The simple setup rules that keep the bouncing and sliding safe, stable, and stress-free.",
    benefitsHeading: "Why This Jumping Castle & Slide Works So Well",
    benefitsIntro:
      "Some kids want to bounce. Others want to slide. This one does both, which means less arguing for them and a whole lot more peace for you.",
    requirementsRows: [
      {
        label: "Requirements",
        value:
          "🌿 This 7m x 4m Jumping Castle & Slide needs a flat, grassy surface to keep both the bouncing and sliding safe and steady. No slopes, no sharp objects, just a soft landing zone for maximum fun.",
      },
      {
        label: "Power",
        value:
          "🔌 This castle runs on a standard 220v plug point, no electrician required. Just make sure there is power within reach and we will handle the rest.",
      },
      {
        label: "Ages",
        value:
          "👧👦 Perfect for kids aged 1 to 12, the sweet spot for bouncing, sliding, and burning off energy in the best way possible.",
      },
      {
        label: "Safety",
        value:
          "👀 An adult must be present at all times during use, because kids plus inflatables plus no supervision equals absolute chaos. Our inflatables are built for maximum fun and minimum bumps.",
      },
      {
        label: "Hygiene",
        value:
          "🧼 Kids + bouncing + sliding = chaos, so we deep clean and sanitise every inflatable before and after each hire. No weird smells, no mystery stickiness, just fresh, clean fun.",
      },
      {
        label: "T&C's",
        value:
          "🎈 All bookings follow our standard rental terms, and changes can be cancelled at least 48 hours before the event to avoid fees.",
      },
      {
        label: "Payment",
        value:
          "💳 Full payment is required before delivery, and we accept credit and debit cards.",
      },
    ],
  },
  {
    slug: "inflatable-water-slide-7m-x-1m",
    wooProductId: 795,
    rentalColumns: [
      {
        label: "Ages & Safety",
        icon: "shield",
        body: "Suitable for kids aged 3 and up. An adult must be present at all times. We clean and sanitise every slide before and after each hire.",
      },
      {
        label: "Space & Power",
        icon: "home",
        body: "Needs a level area of 7m x 1m with no slopes or sharp objects. Electrical: a standard 220v plug point within reach, kept covered and away from water. Water: a hosepipe connection with a steady supply nearby.",
      },
      {
        label: "Booking & Collection",
        icon: "calendar",
        body: "Weekend hire from R800. Free delivery and setup in Fourways, with Monday collection. Cancel 48 hours before your event to avoid fees. Full terms apply.",
      },
      {
        label: "Payment",
        icon: "card",
        body: "Full payment is required before delivery. We accept credit and debit cards.",
      },
    ],
    name: "Inflatable Water Slide",
    size: "7m × 1m",
    eyebrow: "Inflatable Water Slide 7m × 1m",
    heroTitle: "They Slide",
    heroHighlight: "You Unwind",
    heroTitleSecondLine: undefined,
    price: "R800",
    image: "/inflatable-water-slide-hero.jpg",
    angles: [
      "/products/inflatable-water-slide/angle-1.jpg",
      "/products/inflatable-water-slide/angle-2.jpg",
      "/products/inflatable-water-slide/angle-3.jpg",
    ],
    color: "card-teal",
    features: ["Water slide fun", "Suitable ages 4–14", "Needs garden hose connection", "SABS safety checked"],
    desc: "Summer sorted. Attach a garden hose and watch them go. They'll be too busy sliding to even think about coming inside.",
    summary: "Turn up the summer fun with seven metres of sliding, splashing and laughter. Perfect for keeping the kids cool, active and entertained.",
    detail:
      "When the weather is hot and the kids have endless energy, the inflatable water slide is the answer. Add a hose, let the sliding begin, and instantly turn your space into the kind of summer fun they will talk about long after the weekend is over.",
    heroLead:
      "Our 7m Inflatable Water Slide is fun, fast, and energy-draining in the best way possible, with zero effort from you and maximum summer chaos for them.",
    heroProofBullets: [
      "⭐ Double-stitched throughout and reinforced at stress points.",
      "🔧 Made from ultra-durable, SABS-approved 700gm coated fabric.",
      "💨 Powered by a high-quality 0.75kw (220v) blower fan for endless fun.",
    ],
    descriptionBullets: [
      {
        icon: "💦",
        title: "Up. Down. Repeat.",
        text: "Seven meters of sliding fun keeps them climbing, whooshing, and going straight back for another turn.",
      },
      {
        icon: "☀️",
        title: "Summer Sorted",
        text: "Perfect for hot birthdays, holiday playdates, and any weekend where the weather is begging for water fun.",
      },
      {
        icon: "😌",
        title: "Less Boredom, More Peace",
        text: "Watching them slide for hours means fewer interruptions and far fewer “Mom, I’m bored” moments.",
      },
      {
        icon: "🛟",
        title: "Soft Landings, Zero Stress",
        text: "Built for max fun and minimum injuries, because no one needs unnecessary water-slide drama.",
      },
      {
        icon: "🧼",
        title: "Clean and Ready to Go",
        text: "Deep cleaned and sanitised before and after every use, so the only thing they bring home is tiredness.",
      },
      {
        icon: "🏡",
        title: "Keep the Chaos Outside",
        text: "Ideal for birthdays, school events, and steam-burning days without turning your house into a splash zone.",
      },
    ],
    additionalSectionTitle: "Additional Info",
    additionalSectionHeading: "What to Know Before We Arrive",
    additionalSectionSubtitle: "Everything that helps the weekend run smoothly.",
    additionalSectionRows: [
      {
        icon: "🚚",
        label: "Delivery & Setup",
        body: [
          "We handle setup and takedown. Weekend pickups happen on Monday.",
        ],
      },
      {
        icon: "🌿",
        label: "Setting Up for Maximum Fun",
        body: [
          "Set up on flat grass with no sharp objects underneath. We peg everything down securely.",
        ],
      },
      {
        icon: "💦",
        label: "For Water Slides Only",
        body: [
          "Keep the plug covered with the supplied cover, away from water. Have a hosepipe connection and steady water supply nearby.",
        ],
      },
      {
        icon: "🪪",
        label: "Identification & Security",
        body: [
          "A valid ID or driver’s licence is required on delivery.",
        ],
      },
      {
        icon: "⚠️",
        label: "Indemnity (AKA, Don’t Sue Us)",
        body: [
          "Using the inflatable means accepting our standard indemnity terms. Please follow the safety rules and use it as intended.",
        ],
      },
      {
        icon: "🎈",
        label: "Quick Signature on Arrival",
        body: [
          "We’ll need a quick signature on arrival, so everyone is covered.",
        ],
      },
    ],
    requirementsSectionSubtitle: "The simple setup rules that keep the sliding safe, splashy, and stress-free.",
    benefitsHeading: "Why This Water Slide Works So Well",
    benefitsIntro:
      "Have you ever watched your kids run laps around the house and thought, “Seriously, how do they still have energy?” We do not have the science, but we do have seven meters of pure sliding fun.",
    requirementsRows: [
      {
        label: "Requirements",
        value:
          "🌿 This 7m water slide needs a level surface to keep the fun safe and slip-free. Got a slightly uneven yard? Don’t worry, we’ll help you find the best placement.",
      },
      {
        label: "Power",
        value:
          "🔌 This slide runs on a standard 220v plug point. Just keep a hosepipe connection and steady water supply nearby, and you’re set for a day of soaking fun.",
      },
      {
        label: "Ages",
        value:
          "👧 Perfect for kids aged 3 and up. Big kids at heart, we won’t judge if you take a sneaky turn.",
      },
      {
        label: "Safety",
        value:
          "👀 An adult must be present at all times during use, because kids plus inflatables plus no supervision equals absolute chaos. Our inflatables are designed for maximum fun and minimum bumps.",
      },
      {
        label: "Hygiene",
        value:
          "🧼 Kids + water + outdoors = mess, so we deep clean and sanitise every inflatable before and after use. No surprises, just good, clean fun.",
      },
      {
        label: "T&C's",
        value:
          "🎈 All bookings follow our standard rental terms, and changes can be cancelled at least 48 hours before the event to avoid fees.",
      },
      {
        label: "Payment",
        value:
          "💳 Full payment is required before delivery, and we accept credit and debit cards.",
      },
    ],
  },
] ;

export function getRentalProduct(slug: string) {
  return rentalProducts.find((product) => product.slug === slug);
}
