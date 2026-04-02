export interface RentalProduct {
  slug: string;
  name: string;
  size: string;
  eyebrow?: string;
  heroTitle?: string;
  heroHighlight?: string;
  heroTitleSecondLine?: string;
  price: string;
  image: string;
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
    name: "Standard Jumping Castle",
    size: "4m × 4m",
    eyebrow: "Standard Jumping Castle 4m × 4m",
    heroTitle: "They Get to Bounce",
    heroHighlight: "You Get to Chill",
    heroTitleSecondLine: undefined,
    price: "R700",
    image: `${WP_UPLOADS_BASE}/2024/11/standard-jumping-castle-600x499.webp`,
    color: "card-purple",
    features: ["Up to 6 kids at once", "Suitable ages 3–12", "SABS safety checked", "Includes blower & pegs"],
    desc: "The classic. Perfect for birthdays, playdates, and any excuse to keep the kids busy for hours. Easy to set up in any standard garden.",
    summary: "They jump. They laugh. They burn energy. Meanwhile, you get to sit down for five minutes without someone asking for snacks.",
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
          "We handle the setup and takedown for you, because the last thing you need is an engineering degree just to inflate a castle, and weekend pickups happen on Monday so the fun gets a proper finish.",
        ],
      },
      {
        icon: "🌿",
        label: "Setting Up for Maximum Fun",
        body: [
          "All inflatables must be set up on grass with no sharp objects underneath, and we peg everything down securely because a flying castle is only funny in cartoons.",
        ],
      },
      {
        icon: "💦",
        label: "For Water Slides Only",
        body: [
          "For water slides, the plug must stay covered with the supplied cover because water and electricity should never meet unless you are aiming for a science experiment.",
        ],
      },
      {
        icon: "🪪",
        label: "Identification & Security",
        body: [
          "A valid ID or driver’s license is required on delivery, no ID means no inflatable, and we’d all rather avoid that level of heartbreak at the gate.",
        ],
      },
      {
        icon: "⚠️",
        label: "Indemnity (AKA, Don’t Sue Us)",
        body: [
          "Using the inflatable means accepting our standard indemnity terms, which is the official way of saying have fun, be safe, and please do not do anything that would make your grandma worry.",
        ],
      },
      {
        icon: "🎈",
        label: "Quick Signature on Arrival",
        body: [
          "We’ll need a quick signature on arrival before the fun begins, just a tiny bit of official stuff so everyone is covered while the kids go absolutely wild.",
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
      "Ever seen kids with endless energy and thought, “Is this some kind of sorcery?” We don’t know where it comes from, but we know how to manage it, with four meters of bouncy, giggle-inducing fun.",
    requirementsRows: [
      {
        label: "Requirements",
        value:
          "🌿 This 4m × 4m jumping castle needs a flat, grassy surface to ensure safe, stable bouncing. No slopes, no sharp objects, just a soft, secure spot for maximum fun. Got an uneven yard? Don’t worry, we’ll help you find the best setup for a wobble-free bounce zone.",
      },
      {
        label: "Power",
        value:
          "🔌 This jumping castle runs on a standard 220v plug point. No electrician required, phew. Just make sure there’s a power source within reach, and we’ll handle the rest.",
      },
      {
        label: "Ages",
        value:
          "👧👦 This jumping castle is perfect for kids aged 1 to 12, the ideal age range for non-stop bouncing, giggling, and wearing themselves out. Parents, we know you’re tempted, but maybe leave this one to the little ones.",
      },
      {
        label: "Safety",
        value:
          "👀 An adult must be present at all times while the inflatable is in use, because kids plus inflatables plus no supervision equals absolute chaos. Safety first: our inflatables are designed for maximum fun and minimum bumps, but keep an eye out for daredevils attempting world-record jumps.",
      },
      {
        label: "Hygiene",
        value:
          "🧼 We get it, kids + bouncing + excitement = all kinds of mess. That’s why we deep clean and sanitize every jumping castle before and after each use. No surprises, no sticky situations, just good, clean fun.",
      },
      {
        label: "T&C's",
        value:
          "🎈 Booking & Cancellations: All bookings are subject to our standard rental terms. Change of plans? No worries, just cancel at least 48 hours before your event to avoid cancellation fees.",
      },
      {
        label: "Payment",
        value:
          "💳 No pay, no play. Full payment is required before delivery, or we can’t bring the fun to your doorstep. We accept credit and debit cards.",
      },
    ],
    reasons: [
      {
        icon: "🏰",
        title: "They Jump. They Laugh. They Burn Energy.",
        text: "It gives kids a fun, safe place to bounce for hours and gives you a rare chance to breathe for a minute.",
        tone: "gold",
      },
      {
        icon: "🪑",
        title: "You Actually Get Five Quiet Minutes",
        text: "While they are busy jumping, you get a little breathing room to host, chat, or sip your coffee while it is still hot.",
        tone: "pink",
      },
      {
        icon: "📏",
        title: "Fits Beautifully into Standard Gardens",
        text: "The 4m x 4m size makes it easy to place in most home spaces without the setup feeling too big or overwhelming.",
        tone: "teal",
      },
      {
        icon: "⭐",
        title: "A Classic Party Lifesaver",
        text: "It is the easy yes for birthdays, playdates, and family gatherings when you want fun that is simple and reliable.",
        tone: "purple",
      },
      {
        icon: "🛡️",
        title: "Built for Safe, Durable Fun",
        text: "With reinforced stitching, SABS-approved fabric, and a quality blower, it is made to arrive party-ready.",
        tone: "pink",
      },
      {
        icon: "📅",
        title: "Whole-Weekend Hire Just Feels Better",
        text: "From R700 for the weekend means no rushed few-hour slot, just more time for the kids to play and you to relax.",
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
    name: "Jumping Castle & Slide",
    size: "7m × 4m",
    eyebrow: "Jumping Castle & Slide 7m × 4m",
    heroTitle: "They Jump & Slide",
    heroHighlight: "You Sit & Relax",
    heroTitleSecondLine: undefined,
    price: "R900",
    image: `${WP_UPLOADS_BASE}/2025/02/jumping-cstle-and-slide-600x455.webp`,
    color: "card-pink",
    badge: "Most Popular",
    features: ["Jump AND slide", "Up to 8 kids at once", "Suitable ages 3–14", "SABS safety checked"],
    desc: "Double the excitement — jump, climb, and slide. The biggest hit at every party. Kids will be too busy to even think about going inside.",
    summary: "A bigger jumping castle with a built-in slide for double the fun and bigger party energy.",
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
          "We handle the setup and takedown unless otherwise arranged, because the last thing you need is an engineering degree just to inflate a castle, and weekend pickups happen on Monday so the fun gets a proper finish.",
        ],
      },
      {
        icon: "🌿",
        label: "Setting Up for Maximum Fun",
        body: [
          "All inflatables must be set up on grass with no sharp objects underneath, and we peg everything down securely because a flying castle is only funny in cartoons.",
        ],
      },
      {
        icon: "💦",
        label: "For Water Slides Only",
        body: [
          "For water slides, the plug must stay covered with the supplied cover because water and electricity should never meet unless you are aiming for a science experiment.",
        ],
      },
      {
        icon: "🪪",
        label: "Identification & Security",
        body: [
          "A valid ID or driver’s license is required on delivery, no ID means no inflatable, and we’d all rather avoid that level of heartbreak at the gate.",
        ],
      },
      {
        icon: "⚠️",
        label: "Indemnity (AKA, Don’t Sue Us)",
        body: [
          "Using the inflatable means accepting our standard indemnity terms, which is the official way of saying have fun, be safe, and please do not do anything that would make your grandma worry.",
        ],
      },
      {
        icon: "🎈",
        label: "Quick Signature on Arrival",
        body: [
          "We’ll need a quick signature on arrival before the fun begins, just a tiny bit of official stuff so everyone is covered while the kids go absolutely wild.",
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
    name: "Inflatable Water Slide",
    size: "7m × 1m",
    eyebrow: "Inflatable Water Slide 7m × 1m",
    heroTitle: "They Get to Slide",
    heroHighlight: "You Get to Unwind",
    heroTitleSecondLine: undefined,
    price: "R800",
    image: `${WP_UPLOADS_BASE}/2025/02/large-inflatable-slide-7m-2m--e1741081790716-600x582.webp`,
    color: "card-teal",
    features: ["Water slide fun", "Suitable ages 4–14", "Needs garden hose connection", "SABS safety checked"],
    desc: "Summer sorted. Attach a garden hose and watch them go. They'll be too busy sliding to even think about coming inside.",
    summary: "A 7m inflatable water slide built for warm-weather parties, summer weekends, and nonstop laughs.",
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
          "We handle the setup and takedown unless otherwise arranged, because the last thing you need is an engineering degree just to inflate a castle, and weekend pickups happen on Monday so the fun gets a proper finish.",
        ],
      },
      {
        icon: "🌿",
        label: "Setting Up for Maximum Fun",
        body: [
          "All inflatables must be set up on grass with no sharp objects underneath, and we peg everything down securely because a flying castle is only funny in cartoons.",
        ],
      },
      {
        icon: "💦",
        label: "For Water Slides Only",
        body: [
          "The plug must stay covered with the supplied cover because water and electricity should never meet unless you are aiming for a science experiment.",
        ],
      },
      {
        icon: "🪪",
        label: "Identification & Security",
        body: [
          "A valid ID or driver’s license is required on delivery, no ID means no inflatable, and we’d all rather avoid that level of heartbreak at the gate.",
        ],
      },
      {
        icon: "⚠️",
        label: "Indemnity (AKA, Don’t Sue Us)",
        body: [
          "Using the inflatable means accepting our standard indemnity terms, which is the official way of saying have fun, be safe, and please do not do anything that would make your grandma worry.",
        ],
      },
      {
        icon: "🎈",
        label: "Quick Signature on Arrival",
        body: [
          "We’ll need a quick signature on arrival before the fun begins, just a tiny bit of official stuff so everyone is covered while the kids go absolutely wild.",
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
