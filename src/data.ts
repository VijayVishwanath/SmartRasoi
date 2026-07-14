import { SeasonInfo } from "./types";

export const SEASONS: SeasonInfo[] = [
  {
    name: "Summer",
    sanskritName: "Grishma Ritu",
    period: "May to July",
    vibe: "Dry, intense solar heat. Pitta energy accumulates.",
    description: "During Grishma, the dry heat drains body moisture and weakens digestion. It is crucial to consume cooling, hydrating ingredients and avoid excessive spices.",
    spices: ["Elaichi (Cardamom)", "Saunf (Fennel)", "Pudina (Mint)", "Dhania (Coriander)", "Kokum", "Gond Katira"],
    avoid: ["Deep-fried foods", "Excess chilli", "Heated mustard oil", "Uncooked red meat"],
    tips: [
      "Drink cooling buttermilk (Chaas) with roasted cumin powder during the day.",
      "Incorporate hydrating melons, gourds, and sattu (roasted chickpea flour) into meals.",
      "Avoid direct afternoon sun and intense, heavy workouts."
    ],
    wellnessShot: {
      title: "Elaichi-Saunf Digestive Cooler",
      description: "A calming digestive shot that pacifies Pitta and cools down stomach heat instantly.",
      ingredients: [
        "1 tsp Saunf (Fennel) seeds, lightly crushed",
        "2 pods of Elaichi (Cardamom)",
        "5-6 fresh Pudina (Mint) leaves",
        "1/2 cup chilled water or thin buttermilk"
      ],
      steps: [
        "Soak crushed saunf and cardamom pods in warm water for 15 minutes to extract juices.",
        "Strain the water and blend it with mint leaves and cold water or thin buttermilk.",
        "Sip slowly in the morning or post-lunch for refreshing digestion."
      ]
    }
  },
  {
    name: "Monsoon",
    sanskritName: "Varsha Ritu",
    period: "July to September",
    vibe: "Humid, damp, and rainy. Digestive Agni is at its weakest.",
    description: "Monsoon humidity brings dampness and weakens the stomach's fire. Immunity must be prioritized with warming spices, avoiding uncooked vegetables and raw green leaves.",
    spices: ["Adrak (Ginger)", "Kali Mirch (Black Pepper)", "Ajwain (Carom)", "Haldi (Turmeric)", "Heeng (Asafoetida)", "Tulsi"],
    avoid: ["Raw salads", "Heavy curds at night", "Leafy greens (cabbage, spinach) unless thoroughly washed", "Stale street food"],
    tips: [
      "Always drink boiled or warm water infused with ginger or tulsi.",
      "Prioritize warm soups, stews, khichdi, and thoroughly cooked foods.",
      "Keep dry spices airtight to prevent moisture-led mold or loss of potency."
    ],
    wellnessShot: {
      title: "Tulsi-Adrak Immunity Kadha",
      description: "A warming herbal decoction to boost respiratory immunity and stimulate digestion.",
      ingredients: [
        "6-8 fresh Tulsi (Holy Basil) leaves",
        "1 inch fresh Ginger, crushed",
        "3 whole Black Peppercorns, crushed",
        "1 cup water",
        "1 tsp pure organic Honey"
      ],
      steps: [
        "Boil the water in a small pan, then add crushed ginger, black peppercorns, and tulsi leaves.",
        "Simmer on low heat for 5-7 minutes until the liquid reduces to half.",
        "Strain into a glass, let it cool to lukewarm (very important before adding honey!), stir in honey and drink."
      ]
    }
  },
  {
    name: "Autumn",
    sanskritName: "Sharad Ritu",
    period: "September to November",
    vibe: "Warm days, cool nights. Sudden 'October Heat' spikes Pitta.",
    description: "The transition from wet monsoon to dry warmth causes accumulated Pitta to manifest as rashes, acidity, or seasonal viral fevers. Sweet, bitter, and light foods pacify this heat.",
    spices: ["Ghee (Cow's Ghee)", "Elaichi (Cardamom)", "Mishri (Rock Sugar)", "Pudina (Mint)", "Fennel", "Coconut water"],
    avoid: ["Excessive salt", "Fermented foods like idli batter/pickles", "Sour curds", "Alcohol"],
    tips: [
      "Use pure cow's ghee in cooking; it is the ultimate Pitta-pacifying food.",
      "Eat bitter and sweet vegetables like bottle gourd, pumpkin, and sweet potato.",
      "Expose milk to moonlight before drinking (traditional Sharad Purnima ritual for cooling)."
    ],
    wellnessShot: {
      title: "Moonlight Ghee & Cardamom Elixir",
      description: "A traditional soothing bedtime shot to calm acidity, lubricate joints, and improve sleep.",
      ingredients: [
        "1/2 cup warm organic Milk (or warm Almond milk)",
        "1/2 tsp pure A2 Cow's Ghee",
        "A generous pinch of Elaichi (Cardamom) powder",
        "A small piece of Mishri (Rock sugar) for subtle sweetness"
      ],
      steps: [
        "Heat the milk and mix in the cardamom powder and rock sugar until dissolved.",
        "Pour into a small clay cup or glass, and stir in the ghee while still warm.",
        "Drink slowly just before sleeping to calm the mind and soothe digestive acids."
      ]
    }
  },
  {
    name: "Winter",
    sanskritName: "Hemant & Shishir",
    period: "November to March",
    vibe: "Chilly winds, dry air. Internal digestive fire (Agni) is at its strongest.",
    description: "With cold external temperatures, the body's internal heat concentrates inside. Digestion is powerful, meaning the body can easily process heavy, warming, and sweet strength-building foods.",
    spices: ["Dalchini (Cinnamon)", "Methi (Fenugreek)", "Haldi (Turmeric)", "Til (Sesame seeds)", "Gur (Jaggery)", "Dry Ginger (Saonth)"],
    avoid: ["Ice-cold beverages", "Very light, dry foods (like dry puffed rice)", "Late night heavy dinners"],
    tips: [
      "Cook with heavy, nourishing grains like Bajra (Pearl Millet) and Ragi (Finger Millet).",
      "Eat Til-Chikki or Gur-Para daily for sustained inner warmth and iron boost.",
      "Abhyanga: Self-massage with warm sesame oil before a hot bath keeps skin protected."
    ],
    wellnessShot: {
      title: "Turmeric-Dalchini Golden Milk",
      description: "The classic comforting winter shield to guard joints, soothe muscles, and prevent colds.",
      ingredients: [
        "1/2 cup warm milk (or oat/almond milk)",
        "1/2 tsp pure turmeric powder (Haldi)",
        "A small pinch of Dalchini (Cinnamon) powder",
        "A pinch of black pepper (essential to absorb curcumin!)",
        "1/2 tsp Jaggery (Gur) powder"
      ],
      steps: [
        "Simmer the milk with turmeric, cinnamon, and black pepper on low heat for 3 minutes.",
        "Turn off the heat and stir in the jaggery powder until melted.",
        "Serve warm in a tiny shot-sized earthen cup (Kullhad) to ward off winter chill."
      ]
    }
  },
  {
    name: "Spring",
    sanskritName: "Vasant Ritu",
    period: "March to May",
    vibe: "Warm, blooming sunshine. Accumulated winter Kapha melts, causing congestion.",
    description: "As the winter ice melts, Kapha in the body liquefies, manifesting as spring allergies, respiratory congestion, and sluggishness. It is time for deep cleansing, warm fluids, and dry, bitter, astringent foods.",
    spices: ["Black Pepper", "Ginger", "Honey (Pure)", "Mustard Seeds (Rai)", "Tulsi", "Jeera"],
    avoid: ["Cold water", "Heavy milk creams and cheese", "Sweets and rich desserts", "Sleeping during daytime"],
    tips: [
      "Incorporate bitter greens (like methi leaves, mustard greens, or even neem leaves) into the diet.",
      "Substitute heavy wheat with lighter grains like barley (jau) or millet.",
      "Sip on honey-infused warm lemon water to clear mucous pathways."
    ],
    wellnessShot: {
      title: "Spring Cleansing Honey-Lemon Shot",
      description: "A simple, stimulating morning shot that aids metabolic fire and clears spring allergies.",
      ingredients: [
        "1/2 cup warm water",
        "1 tsp organic raw Honey",
        "1 tbsp freshly squeezed Lemon juice",
        "A pinch of freshly ground Kali Mirch (Black pepper)"
      ],
      steps: [
        "Ensure the water is comfortably warm, but not boiling hot (hot water denatures honey's benefits).",
        "Stir in the lemon juice and organic raw honey until fully integrated.",
        "Top with fresh black pepper and drink on an empty stomach in the morning."
      ]
    }
  }
];

export const POPULAR_LEFTOVERS = [
  { name: "Leftover Chapati/Roti", category: "Grain", icon: "🍪" },
  { name: "Leftover Cooked Rice", category: "Grain", icon: "🍚" },
  { name: "Leftover Curd (Dahi)", category: "Dairy", icon: "🥛" },
  { name: "Overripe Bananas", category: "Fruit", icon: "🍌" },
  { name: "Over-boiled Daal", category: "Pulse", icon: "🍲" },
  { name: "Potato Peels/Stems", category: "Veggie", icon: "🥔" },
  { name: "Coriander Stems (Dhania)", category: "Herb", icon: "🌿" },
  { name: "Half-used Lemon/Citrus", category: "Fruit", icon: "🍋" },
  { name: "Leftover Idli/Dosa Batter", category: "Batter", icon: "🥞" },
  { name: "Stale Bread Slices", category: "Grain", icon: "🍞" }
];

export const SPICE_Pantry = [
  { name: "Haldi (Turmeric)", benefit: "Anti-inflammatory & Immunity booster" },
  { name: "Adrak (Ginger)", benefit: "Digestive fire & Soothes throat" },
  { name: "Kali Mirch (Black Pepper)", benefit: "Aids absorption & Respiration" },
  { name: "Tulsi (Holy Basil)", benefit: "Adaptogen, relieves cough & fever" },
  { name: "Ajwain (Carom)", benefit: "Cures bloating & stomach cramps" },
  { name: "Saunf (Fennel)", benefit: "Cooling & digestive freshener" },
  { name: "Jeera (Cumin)", benefit: "Stops acidity & aids metabolism" },
  { name: "Laung (Clove)", benefit: "Relieves toothache & respiratory block" },
  { name: "Elaichi (Cardamom)", benefit: "Pitta cooling & fresh breath" },
  { name: "Honey (Madh)", benefit: "Coats dry throat & scrapes Kapha" }
];

export const AILMENTS = [
  { name: "Sore Throat & Dry Cough", icon: "🗣️" },
  { name: "Acidity & Indigestion", icon: "🔥" },
  { name: "Bloating & Gas", icon: "🎈" },
  { name: "Monsoon Cold & Runny Nose", icon: "🌧️" },
  { name: "Summer Exhaustion / Heat Stroke", icon: "☀️" },
  { name: "Lack of Appetite / Sluggishness", icon: "🥱" }
];
