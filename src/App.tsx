import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Leaf, 
  Soup, 
  Heart, 
  Sparkles, 
  Clock, 
  Coins, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Search, 
  Compass, 
  HelpCircle, 
  Info, 
  Calendar, 
  TrendingUp, 
  Droplet, 
  BookOpen, 
  Sparkle, 
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  AlertTriangle
} from "lucide-react";
import { SEASONS, POPULAR_LEFTOVERS, SPICE_Pantry, AILMENTS } from "./data";
import { Recipe, Remedy, BachatTip, SeasonInfo } from "./types";

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<"jugaad" | "nuskhe" | "bachat" | "seasonal">("jugaad");
  const [currentSeason, setCurrentSeason] = useState<SeasonInfo>(SEASONS[0]);
  
  // Jugaad Recipe States
  const [selectedLeftovers, setSelectedLeftovers] = useState<string[]>([]);
  const [customLeftover, setCustomLeftover] = useState("");
  const [dietType, setDietType] = useState<"veg" | "vegan" | "any">("veg");
  const [prepTime, setPrepTime] = useState<"15" | "30" | "45+">("15");
  const [recipeLanguage, setRecipeLanguage] = useState("English (with regional Hinglish terms)");
  
  // Dadi Ma States
  const [selectedAilment, setSelectedAilment] = useState("");
  const [customAilment, setCustomAilment] = useState("");
  const [selectedSpices, setSelectedSpices] = useState<string[]>(["Haldi (Turmeric)", "Adrak (Ginger)"]);
  const [remedyLanguage, setRemedyLanguage] = useState("English (Grandmotherly style)");
  
  // Bachat States
  const [searchVeggie, setSearchVeggie] = useState("");
  const [selectedVeggie, setSelectedVeggie] = useState("");
  const [bachatLanguage, setBachatLanguage] = useState("English (Simple & Practical)");

  // API Results States
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [generatedRemedy, setGeneratedRemedy] = useState<Remedy | null>(null);
  const [generatedBachat, setGeneratedBachat] = useState<BachatTip | null>(null);

  // Status & Loader States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Saved/Bookmarked Items (Local Storage)
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [savedRemedies, setSavedRemedies] = useState<Remedy[]>([]);
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Dynamic cooking tip during loading
  const loadingTips = [
    "To keep coriander fresh for weeks, chop the roots, dry the leaves completely, wrap in newspaper, and keep in an airtight box.",
    "Leftover dry subzi? Mash it, add chopped onion and coriander, wrap in a wheat dough ball, and make a stuffed paratha!",
    "If curd is too sour, hang it in a muslin cloth to make hung curd (Chakka) for healthy sandwiches or Shrikhand.",
    "Revive dry, limp carrots or radishes by submerging them in an ice-water bath for 30 minutes.",
    "Don't throw away lemon peels! Boil them in water with salt to make a natural, grease-cutting stove-top cleanser.",
    "Sore throat? Mixing a pinch of turmeric and black pepper in lukewarm water provides instant antiseptic action.",
    "Water plants with the unsalted water used to boil rice or vegetables; it's packed with natural starch and nutrients!"
  ];
  const [currentLoadingTip, setCurrentLoadingTip] = useState(loadingTips[0]);

  // Set current season based on local calendar month automatically
  useEffect(() => {
    const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
    // India Seasons: 
    // Grishma (Summer): May-July (4, 5, 6)
    // Varsha (Monsoon): July-Sept (7, 8)
    // Sharad (Autumn): Sept-Nov (9, 10)
    // Hemant/Winter: Nov-March (11, 0, 1, 2)
    // Vasant (Spring): March-May (3)
    if (month >= 4 && month <= 6) {
      setCurrentSeason(SEASONS.find(s => s.name === "Summer") || SEASONS[0]);
    } else if (month >= 7 && month <= 8) {
      setCurrentSeason(SEASONS.find(s => s.name === "Monsoon") || SEASONS[0]);
    } else if (month >= 9 && month <= 10) {
      setCurrentSeason(SEASONS.find(s => s.name === "Autumn") || SEASONS[0]);
    } else if (month === 11 || month <= 2) {
      setCurrentSeason(SEASONS.find(s => s.name === "Winter") || SEASONS[0]);
    } else {
      setCurrentSeason(SEASONS.find(s => s.name === "Spring") || SEASONS[0]);
    }

    // Load saved items
    const recipes = localStorage.getItem("savedRecipes");
    const remedies = localStorage.getItem("savedRemedies");
    if (recipes) setSavedRecipes(JSON.parse(recipes));
    if (remedies) setSavedRemedies(JSON.parse(remedies));
  }, []);

  // Set up loading tip interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        const rand = Math.floor(Math.random() * loadingTips.length);
        setCurrentLoadingTip(loadingTips[rand]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // State Persistence Helpers
  const saveRecipe = (recipe: Recipe) => {
    const updated = [...savedRecipes, recipe];
    setSavedRecipes(updated);
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
  };

  const unsaveRecipe = (recipeName: string) => {
    const updated = savedRecipes.filter(r => r.recipeName !== recipeName);
    setSavedRecipes(updated);
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
  };

  const isRecipeSaved = (recipeName: string) => {
    return savedRecipes.some(r => r.recipeName === recipeName);
  };

  const saveRemedy = (remedy: Remedy) => {
    const updated = [...savedRemedies, remedy];
    setSavedRemedies(updated);
    localStorage.setItem("savedRemedies", JSON.stringify(updated));
  };

  const unsaveRemedy = (remedyName: string) => {
    const updated = savedRemedies.filter(r => r.remedyName !== remedyName);
    setSavedRemedies(updated);
    localStorage.setItem("savedRemedies", JSON.stringify(updated));
  };

  const isRemedySaved = (remedyName: string) => {
    return savedRemedies.some(r => r.remedyName === remedyName);
  };

  // API Call handlers
  const handleGenerateRecipe = async () => {
    setErrorMsg(null);
    setLoading(true);
    setLoadingText("Dishing up an innovative Jugaad recipe from your kitchen scraps...");
    
    // Combine selected leftovers and custom leftovers
    let ingredients = [...selectedLeftovers];
    if (customLeftover.trim()) {
      ingredients.push(customLeftover.trim());
    }

    if (ingredients.length === 0) {
      setErrorMsg("Please select or type at least one leftover ingredient so our AI Chef can cook!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          dietType,
          prepTime,
          language: recipeLanguage
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate recipe. Please try again.");
      }

      setGeneratedRecipe(data);
      // Scroll to result
      setTimeout(() => {
        document.getElementById("recipe-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred while cooking.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRemedy = async () => {
    setErrorMsg(null);
    setLoading(true);
    setLoadingText("Asking Dadi Ma to prepare her warm traditional herbal nuskha...");

    const ailment = customAilment.trim() || selectedAilment;
    if (!ailment) {
      setErrorMsg("Please select or describe an ailment so Dadi Ma can recommend a remedy.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/remedy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ailment,
          availableSpices: selectedSpices,
          language: remedyLanguage
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to contact Dadi Ma. Please try again.");
      }

      setGeneratedRemedy(data);
      setTimeout(() => {
        document.getElementById("remedy-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Could not retrieve grandma's remedies.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBachat = async (veg: string) => {
    setSelectedVeggie(veg);
    setErrorMsg(null);
    setLoading(true);
    setLoadingText(`Retrieving clever Indian household budget & storage hacks for ${veg}...`);

    try {
      const res = await fetch("/api/bachat-tip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vegetable: veg,
          language: bachatLanguage
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to retrieve storage tips.");
      }

      setGeneratedBachat(data);
      setTimeout(() => {
        document.getElementById("bachat-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Could not load preservation tips.");
    } finally {
      setLoading(false);
    }
  };

  const toggleLeftover = (name: string) => {
    if (selectedLeftovers.includes(name)) {
      setSelectedLeftovers(selectedLeftovers.filter(i => i !== name));
    } else {
      setSelectedLeftovers([...selectedLeftovers, name]);
    }
  };

  const toggleSpice = (name: string) => {
    if (selectedSpices.includes(name)) {
      setSelectedSpices(selectedSpices.filter(i => i !== name));
    } else {
      setSelectedSpices([...selectedSpices, name]);
    }
  };

  // Indian Languages dropdown list
  const LANGUAGES = [
    "English (with regional Hinglish words)",
    "Hinglish (Hindi written in English alphabets)",
    "Hindi (हिन्दी)",
    "Tamil (தமிழ்)",
    "Telugu (తెలుగు)",
    "Bengali (বাংলা)",
    "Marathi (मराठी)",
    "Gujarati (ગુજરાતી)",
    "Kannada (ಕನ್ನಡ)",
    "Malayalam (മലയാളம்)",
    "Punjabi (ਪੰਜਾਬੀ)"
  ];

  return (
    <div className="min-h-screen bg-warm-canvas text-gray-800 font-sans flex flex-col pb-16">
      
      {/* Dynamic Header */}
      <header className="bg-white border-b border-cardamom-100 py-6 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cardamom-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-cardamom-100">
              <Flame className="w-7 h-7" id="header-flame-icon" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-display text-cardamom-700 tracking-tight">Smart Rasoi</h1>
                <span className="bg-saffron-100 text-saffron-700 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">IDEATHON SPECIAL</span>
              </div>
              <p className="text-xs text-gray-500 font-sans">Everyday AI Indian Kitchen & Traditional Wellness Companion</p>
            </div>
          </div>

          {/* Quick Stats or Actions */}
          <div className="flex items-center gap-4">
            
            {/* Saved Items Trigger Button */}
            <button 
              onClick={() => setShowSavedModal(true)}
              className="flex items-center gap-2 bg-cardamom-50 hover:bg-cardamom-100 text-cardamom-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition duration-150 border border-cardamom-100 cursor-pointer"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>My Saved Hacks ({savedRecipes.length + savedRemedies.length})</span>
            </button>

            {/* Live Season Indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-saffron-50 text-saffron-700 text-xs px-4 py-2 rounded-xl border border-saffron-100">
              <Calendar className="w-4 h-4 text-saffron-500" />
              <div>
                <span className="font-semibold block leading-none">{currentSeason.name} Season</span>
                <span className="text-[10px] text-saffron-600 font-mono italic">{currentSeason.sanskritName}</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Interactive Tools (Tabs & Options) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Tab buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-cardamom-50/50 p-1.5 rounded-2xl border border-cardamom-100/30">
            <button
              onClick={() => { setActiveTab("jugaad"); setErrorMsg(null); }}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeTab === "jugaad"
                  ? "bg-cardamom-500 text-white shadow-sm shadow-cardamom-700/20"
                  : "text-gray-600 hover:bg-cardamom-50 hover:text-cardamom-700"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Jugaad Cooking</span>
            </button>
            <button
              onClick={() => { setActiveTab("nuskhe"); setErrorMsg(null); }}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeTab === "nuskhe"
                  ? "bg-cardamom-500 text-white shadow-sm shadow-cardamom-700/20"
                  : "text-gray-600 hover:bg-cardamom-50 hover:text-cardamom-700"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Dadi Ma's Nuskhe</span>
            </button>
            <button
              onClick={() => { setActiveTab("bachat"); setErrorMsg(null); }}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeTab === "bachat"
                  ? "bg-cardamom-500 text-white shadow-sm shadow-cardamom-700/20"
                  : "text-gray-600 hover:bg-cardamom-50 hover:text-cardamom-700"
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Bachat Hacks</span>
            </button>
            <button
              onClick={() => { setActiveTab("seasonal"); setErrorMsg(null); }}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeTab === "seasonal"
                  ? "bg-cardamom-500 text-white shadow-sm shadow-cardamom-700/20"
                  : "text-gray-600 hover:bg-cardamom-50 hover:text-cardamom-700"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Mausam Guide</span>
            </button>
          </div>

          {/* Interactive Screen container */}
          <div className="bg-white rounded-3xl premium-shadow border border-cardamom-100/50 p-6 md:p-8">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: JUGAAD COOKING */}
              {activeTab === "jugaad" && (
                <motion.div
                  key="jugaad-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-xl font-bold font-display text-cardamom-700 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-saffron-500 fill-saffron-100" />
                      Zero-Waste Jugaad Cooking
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Clear out your fridge! Tell us what leftovers or surplus items you have. We will turn them into nutritious, tasty regional Indian meals—saving you money and cutting kitchen waste.
                    </p>
                  </div>

                  {/* Leftover Selection */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                      <span>1. Select leftovers or pantry surplus in your kitchen:</span>
                      <span className="text-[10px] text-cardamom-600 font-mono">Tap multiple items</span>
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
                      {POPULAR_LEFTOVERS.map((item) => {
                        const selected = selectedLeftovers.includes(item.name);
                        return (
                          <button
                            key={item.name}
                            onClick={() => toggleLeftover(item.name)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 cursor-pointer ${
                              selected 
                                ? "bg-cardamom-500 text-white border-cardamom-500 shadow-sm" 
                                : "bg-white text-gray-700 border-gray-200 hover:border-cardamom-300"
                            }`}
                          >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                            {selected && <Check className="w-3.5 h-3.5 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Custom Leftover */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Or type custom ingredients (separate with commas):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customLeftover}
                        onChange={(e) => setCustomLeftover(e.target.value)}
                        placeholder="e.g. half cauliflower, sour curd, leftover paneer subzi"
                        className="flex-1 bg-gray-50 border border-gray-200 focus:border-cardamom-500 focus:ring-1 focus:ring-cardamom-500/20 rounded-xl px-4 py-3 text-xs outline-none transition"
                      />
                      {customLeftover && (
                        <button
                          onClick={() => setCustomLeftover("")}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-3 rounded-xl transition cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cooking Prefs & Language Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-warm-canvas p-4 rounded-2xl border border-cardamom-100/30">
                    
                    {/* Diet type */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-gray-700">Dietary Profile:</span>
                      <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-gray-200">
                        {(["veg", "vegan", "any"] as const).map((diet) => (
                          <button
                            key={diet}
                            onClick={() => setDietType(diet)}
                            className={`py-1.5 rounded-lg text-[11px] font-bold capitalize transition cursor-pointer ${
                              dietType === diet
                                ? "bg-cardamom-500 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {diet === "any" ? "Any" : diet}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Prep Time */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-gray-700">Preparation Limit:</span>
                      <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-gray-200">
                        {(["15", "30", "45+"] as const).map((time) => (
                          <button
                            key={time}
                            onClick={() => setPrepTime(time)}
                            className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                              prepTime === time
                                ? "bg-cardamom-500 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {time === "45+" ? "Any" : `${time}m`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language Selection */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-gray-700">Recipe Language:</span>
                      <select
                        value={recipeLanguage}
                        onChange={(e) => setRecipeLanguage(e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-cardamom-500 cursor-pointer h-full"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* COOK BUTTON */}
                  <button
                    onClick={handleGenerateRecipe}
                    disabled={loading}
                    className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold font-display py-4 px-6 rounded-2xl shadow-lg shadow-saffron-500/25 transition duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <Flame className="w-5 h-5 fill-current animate-pulse" />
                    <span>Generate AI Jugaad Recipe</span>
                  </button>

                </motion.div>
              )}

              {/* TAB 2: DADI MA'S HOME REMEDIES (NUSKHE) */}
              {activeTab === "nuskhe" && (
                <motion.div
                  key="nuskhe-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div className="border-b border-orange-100 pb-4">
                    <h2 className="text-xl font-bold font-display text-saffron-700 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-saffron-500 fill-saffron-50" />
                      Dadi Ma ke Nuskhe (Traditional Home Remedies)
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Consult your wise Indian Grandma. Avoid popping pills instantly for minor everyday ailments. Select a symptom, choose spices currently in your kitchen box (masala dabba), and Dadi Ma will prepare a gentle, scientific herbal solution.
                    </p>
                  </div>

                  {/* Ailment quick select */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-semibold text-gray-700">
                      1. What seasonal or general ailment are you experiencing?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {AILMENTS.map((ail) => {
                        const isSelected = selectedAilment === ail.name;
                        return (
                          <button
                            key={ail.name}
                            onClick={() => { setSelectedAilment(ail.name); setCustomAilment(""); }}
                            className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                              isSelected 
                                ? "bg-saffron-100 border-saffron-500 text-saffron-800 font-medium" 
                                : "bg-white border-gray-200 text-gray-700 hover:border-saffron-300"
                            }`}
                          >
                            <span className="text-lg">{ail.icon}</span>
                            <span className="text-xs leading-tight">{ail.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom ailment */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Or type a custom symptom (e.g. insect bite, split heels, summer rash):
                    </label>
                    <input
                      type="text"
                      value={customAilment}
                      onChange={(e) => { setCustomAilment(e.target.value); setSelectedAilment(""); }}
                      placeholder="Describe your minor ailment..."
                      className="w-full bg-gray-50 border border-gray-200 focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500/20 rounded-xl px-4 py-3 text-xs outline-none transition"
                    />
                  </div>

                  {/* Spice box check */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                      <span>2. What ingredients do you currently have in your Spices Box (Masala Dabba)?</span>
                      <span className="text-[10px] text-saffron-600 font-mono">Select available items</span>
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
                      {SPICE_Pantry.map((spice) => {
                        const hasSpice = selectedSpices.includes(spice.name);
                        return (
                          <button
                            key={spice.name}
                            onClick={() => toggleSpice(spice.name)}
                            title={spice.benefit}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 cursor-pointer ${
                              hasSpice 
                                ? "bg-saffron-500 text-white border-saffron-500 shadow-sm" 
                                : "bg-white text-gray-700 border-gray-200 hover:border-saffron-200"
                            }`}
                          >
                            <span>🍲</span>
                            <span>{spice.name}</span>
                            {hasSpice && <Check className="w-3.5 h-3.5 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Language & Action */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-gray-700">Grandma's Advice Language:</span>
                      <select
                        value={remedyLanguage}
                        onChange={(e) => setRemedyLanguage(e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-700 outline-none focus:border-saffron-500 cursor-pointer"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateRemedy}
                      disabled={loading}
                      className="md:mt-5 bg-cardamom-500 hover:bg-cardamom-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold font-display py-3.5 px-6 rounded-xl shadow-lg shadow-cardamom-500/25 transition duration-150 flex items-center justify-center gap-2 cursor-pointer text-xs"
                    >
                      <Heart className="w-4 h-4 fill-current animate-pulse text-red-100" />
                      <span>Consult Grandma Dadi Ma</span>
                    </button>
                  </div>

                </motion.div>
              )}

              {/* TAB 3: BACHAT & PRESERVATION (STORAGE HACKS) */}
              {activeTab === "bachat" && (
                <motion.div
                  key="bachat-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-xl font-bold font-display text-cardamom-700 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-saffron-500 fill-saffron-100" />
                      Bachat Diary: Smart Preservation & Storage
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      In warm, humid Indian kitchens, vegetables like coriander, green chillies, garlic, and tomatoes spoil rapidly. Select any ingredient below to retrieve smart local preservation hacks, revival methods, and creative zero-waste upcycling recipes.
                    </p>
                  </div>

                  {/* Veggie quick search list */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-semibold text-gray-700">
                      Select or type a vegetable or herb to get smart Bachat (savings) hacks:
                    </label>
                    
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={searchVeggie}
                          onChange={(e) => setSearchVeggie(e.target.value)}
                          placeholder="Search e.g. Coriander (Dhania), Chillies, Tomato, Lemon, Ginger..."
                          className="w-full bg-gray-50 border border-gray-200 focus:border-cardamom-500 rounded-xl pl-9 pr-4 py-2.5 text-xs outline-none"
                        />
                      </div>
                      {searchVeggie && (
                        <button
                          onClick={() => handleGenerateBachat(searchVeggie)}
                          disabled={loading}
                          className="bg-cardamom-500 hover:bg-cardamom-600 text-white font-bold px-5 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>Get Hacks</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Quick popular items list */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Coriander (Dhania)", "Green Chillies", "Tomatoes", "Garlic", "Lemons", "Ginger", "Potatoes & Onions", "Curry Leaves"].map((veg) => (
                        <button
                          key={veg}
                          onClick={() => handleGenerateBachat(veg)}
                          className="bg-cardamom-50 hover:bg-cardamom-100 text-cardamom-700 border border-cardamom-100/30 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition"
                        >
                          🍃 {veg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-700">Bachat Advice Language:</span>
                    <select
                      value={bachatLanguage}
                      onChange={(e) => setBachatLanguage(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-700 outline-none focus:border-cardamom-500 cursor-pointer max-w-sm"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                </motion.div>
              )}

              {/* TAB 4: MAUSAM WELLNESS GUIDE */}
              {activeTab === "seasonal" && (
                <motion.div
                  key="seasonal-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div className="border-b border-cardamom-100 pb-4">
                    <h2 className="text-xl font-bold font-display text-cardamom-700 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-saffron-500 fill-saffron-100 animate-spin-slow" />
                      Mausam Wellness & Seasonal Spices
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Traditional Indian science (Shad Ritu) adapts nutrition to natural seasonal rhythms. Select a season to explore recommended foods, cooling/warming spices, items to avoid, and custom home wellness shots.
                    </p>
                  </div>

                  {/* Seasonal Tab Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                    {SEASONS.map((season) => {
                      const isActive = currentSeason.name === season.name;
                      return (
                        <button
                          key={season.name}
                          onClick={() => setCurrentSeason(season)}
                          className={`py-2 px-1 rounded-lg text-xs font-bold transition duration-150 cursor-pointer text-center ${
                            isActive 
                              ? "bg-cardamom-500 text-white shadow-sm" 
                              : "text-gray-600 hover:bg-white hover:text-cardamom-700"
                          }`}
                        >
                          <span className="block text-[10px] opacity-75 font-mono">{season.sanskritName.split(" ")[0]}</span>
                          <span className="text-[11px] block">{season.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Season Info Card */}
                  <div className="bg-gradient-to-br from-cardamom-50/50 to-saffron-50/30 border border-cardamom-100/40 p-5 rounded-2xl flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cardamom-100/30 pb-3">
                      <div>
                        <h3 className="text-lg font-bold font-display text-cardamom-700 flex items-center gap-2">
                          {currentSeason.name} Wellness ({currentSeason.sanskritName})
                        </h3>
                        <p className="text-[10px] font-semibold text-saffron-700 font-mono tracking-wider">{currentSeason.period.toUpperCase()}</p>
                      </div>
                      <span className="bg-white px-3 py-1 rounded-lg text-[10px] font-bold text-gray-500 border border-gray-200">
                        {currentSeason.vibe}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed italic">
                      "{currentSeason.description}"
                    </p>

                    {/* Spices Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="bg-white p-4 rounded-xl border border-cardamom-100/30 shadow-sm">
                        <span className="text-xs font-bold text-cardamom-700 flex items-center gap-1.5 mb-2 border-b border-gray-50 pb-1">
                          <Leaf className="w-4 h-4 text-cardamom-500" />
                          Recommended Spices & Herbs:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentSeason.spices.map((spice) => (
                            <span key={spice} className="bg-cardamom-50 text-cardamom-700 text-[10px] px-2.5 py-1 rounded-md font-medium border border-cardamom-100/20">
                              🌱 {spice}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                        <span className="text-xs font-bold text-red-700 flex items-center gap-1.5 mb-2 border-b border-gray-50 pb-1">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          Avoid or Reduce:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentSeason.avoid.map((item) => (
                            <span key={item} className="bg-red-50 text-red-700 text-[10px] px-2.5 py-1 rounded-md font-medium border border-red-100/30">
                              🚫 {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tips Checklist */}
                    <div className="bg-white p-4 rounded-xl border border-cardamom-100/20 shadow-sm">
                      <span className="text-xs font-bold text-gray-700 block mb-2">Daily Ayurvedic Wellness Checklist:</span>
                      <ul className="flex flex-col gap-2">
                        {currentSeason.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-cardamom-500 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Seasonal Wellness Shot Recipe */}
                    <div className="bg-saffron-50/50 border border-saffron-100 p-4 rounded-xl">
                      <span className="bg-saffron-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full font-mono mb-2 inline-block">DAILY WELLNESS ELIXIR RECIPE</span>
                      <h4 className="text-sm font-bold text-saffron-800 font-display flex items-center gap-1.5">
                        <Droplet className="w-4 h-4 text-saffron-500 fill-saffron-100" />
                        {currentSeason.wellnessShot.title}
                      </h4>
                      <p className="text-[11px] text-saffron-700 mt-1 mb-3">
                        {currentSeason.wellnessShot.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-5 bg-white p-3 rounded-lg border border-saffron-100">
                          <span className="text-[10px] font-bold text-gray-700 block mb-1">Shot Ingredients:</span>
                          <ul className="flex flex-col gap-1 text-[10px] text-gray-600">
                            {currentSeason.wellnessShot.ingredients.map((ing, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <span className="text-saffron-500">•</span>
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="md:col-span-7 bg-white p-3 rounded-lg border border-saffron-100">
                          <span className="text-[10px] font-bold text-gray-700 block mb-1">Preparation Steps:</span>
                          <ol className="flex flex-col gap-1 text-[10px] text-gray-600 list-decimal pl-4">
                            {currentSeason.wellnessShot.steps.map((step, s) => (
                              <li key={s} className="leading-tight mb-1">{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>

        {/* Right Side: Generated Output & Real-time results */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          
          {/* LOADER COMPONENT */}
          {loading && (
            <div className="bg-white border-2 border-saffron-200 rounded-3xl premium-shadow p-6 text-center flex flex-col items-center justify-center min-h-[300px] animate-pulse">
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-t-saffron-500 border-cardamom-100 rounded-full animate-spin"></div>
                <Flame className="w-6 h-6 text-saffron-500 absolute top-5 left-5 animate-bounce" />
              </div>
              <h3 className="text-sm font-bold text-cardamom-700 mb-1">Rasoi AI is thinking...</h3>
              <p className="text-xs text-gray-500 max-w-xs">{loadingText}</p>
              
              {/* Dynamic Frugal Tip Panel */}
              <div className="mt-8 bg-cardamom-50 p-4 rounded-2xl border border-cardamom-100/40 text-left max-w-sm w-full">
                <span className="text-[9px] font-bold text-cardamom-700 block mb-1 font-mono tracking-wider">DID YOU KNOW? (BACHAT TIP)</span>
                <p className="text-xs text-cardamom-800 leading-relaxed font-medium">
                  "{currentLoadingTip}"
                </p>
              </div>
            </div>
          )}

          {/* ERROR DISPLAY */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-3xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-xs font-bold">Something went wrong</span>
              </div>
              <p className="text-xs leading-normal">{errorMsg}</p>
              {errorMsg.includes("GEMINI_API_KEY") && (
                <div className="bg-white border border-red-100 p-3 rounded-xl text-[11px] text-red-700 mt-1">
                  💡 <strong>To fix this in AI Studio:</strong> Click the <strong>Settings (gear icon)</strong> in the top right, go to <strong>Secrets</strong>, and add <code>GEMINI_API_KEY</code> with your Gemini API Key. The application will start running instantly!
                </div>
              )}
            </div>
          )}

          {/* NO RESULT PLACEHOLDER */}
          {!loading && !errorMsg && !generatedRecipe && !generatedRemedy && !generatedBachat && (
            <div className="bg-white border border-cardamom-100/30 rounded-3xl premium-shadow p-8 text-center flex flex-col items-center justify-center min-h-[400px] bg-warm-canvas/30">
              <div className="w-16 h-16 bg-cardamom-50 rounded-2xl flex items-center justify-center text-cardamom-500 mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-cardamom-700">Your AI Cookery Book</h3>
              <p className="text-xs text-gray-500 max-w-xs mt-2">
                Select ingredients on the left and tap "Generate AI Jugaad Recipe", or consult Dadi Ma to display beautiful customized wellness cards here.
              </p>
              
              {/* Showcase box */}
              <div className="mt-8 border border-dashed border-gray-200 p-4 rounded-2xl w-full text-left bg-white max-w-xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-700">
                  <Sparkle className="w-4 h-4 text-saffron-500" />
                  <span>Indian Innovation Theme</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Frugal innovation (Jugaad) and zero waste are foundational in traditional Indian households. This app combines those values with Gemini's high-speed AI to empower families, reduce waste, and revive natural remedies!
                </p>
              </div>
            </div>
          )}

          {/* DYNAMIC RESULTS DISPLAY AREA */}
          <AnimatePresence mode="wait">
            
            {/* RECIPE RESULT */}
            {!loading && generatedRecipe && activeTab === "jugaad" && (
              <motion.div
                id="recipe-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-cardamom-100 rounded-3xl premium-shadow overflow-hidden flex flex-col gap-5 p-6 relative"
              >
                {/* Save button */}
                <button
                  onClick={() => isRecipeSaved(generatedRecipe.recipeName) ? unsaveRecipe(generatedRecipe.recipeName) : saveRecipe(generatedRecipe.recipeName)}
                  className="absolute right-5 top-5 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-cardamom-600 border border-gray-100 cursor-pointer transition"
                >
                  {isRecipeSaved(generatedRecipe.recipeName) ? (
                    <BookmarkCheck className="w-5 h-5 text-saffron-500 fill-saffron-500" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>

                {/* Badge tags */}
                <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                  <span className="bg-cardamom-500 text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                    JUGAAD RECIPE
                  </span>
                  <span className="bg-saffron-100 text-saffron-700 text-[9px] font-bold px-2 py-0.5 rounded-md font-mono">
                    {generatedRecipe.estimatedSavings}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-0.5 rounded-md">
                    {generatedRecipe.dietLabel}
                  </span>
                </div>

                {/* Recipe Titles */}
                <div>
                  <h3 className="text-xl font-bold font-display text-cardamom-700 leading-tight">
                    {generatedRecipe.recipeName}
                  </h3>
                  {generatedRecipe.recipeHinglishName && (
                    <span className="text-xs text-saffron-600 font-mono italic mt-0.5 block">
                      Local name: {generatedRecipe.recipeHinglishName}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed bg-warm-canvas p-3.5 rounded-xl border border-cardamom-100/30 italic">
                  "{generatedRecipe.description}"
                </p>

                {/* Quick details */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-center">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-mono">Prep Time</span>
                    <span className="text-xs font-bold text-gray-700 flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-cardamom-500" />
                      {generatedRecipe.prepCookTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-mono">Difficulty</span>
                    <span className="text-xs font-bold text-gray-700 mt-0.5 block">
                      {generatedRecipe.difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-mono">Kitchen Cost</span>
                    <span className="text-xs font-bold text-saffron-600 mt-0.5 block font-mono">
                      Frugal Hack
                    </span>
                  </div>
                </div>

                {/* Ingredients Checklist */}
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-2">Ingredients Required (Check off as you cook):</span>
                  <div className="flex flex-col gap-1.5">
                    {generatedRecipe.ingredients.map((ing, i) => (
                      <label key={i} className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100/50 p-2 rounded-xl border border-gray-100 cursor-pointer text-xs transition">
                        <input type="checkbox" className="rounded text-cardamom-500 focus:ring-cardamom-500" />
                        <div className="flex-1 flex justify-between gap-1 items-center">
                          <span className="text-gray-700">{ing.name}</span>
                          <span className="text-gray-500 font-mono text-[10px]">{ing.amount}</span>
                        </div>
                        {ing.isKeyLeftover && (
                          <span className="bg-cardamom-100 text-cardamom-800 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">LEFTOVER</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-2">Cooking Directions:</span>
                  <ol className="flex flex-col gap-3">
                    {generatedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                        <span className="w-5 h-5 bg-cardamom-100 text-cardamom-700 rounded-full flex items-center justify-center font-bold shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Jugaad Pro-Tip */}
                <div className="bg-saffron-50 border border-saffron-100 rounded-2xl p-4 mt-2">
                  <div className="flex items-center gap-1.5 text-saffron-800 font-bold text-xs mb-1">
                    <Sparkles className="w-4 h-4 text-saffron-500 fill-saffron-100" />
                    <span>Grandma's Jugaad Pro-Tip:</span>
                  </div>
                  <p className="text-xs text-saffron-700 leading-normal">
                    {generatedRecipe.jugaadProTip}
                  </p>
                </div>

              </motion.div>
            )}

            {/* REMEDY RESULT */}
            {!loading && generatedRemedy && activeTab === "nuskhe" && (
              <motion.div
                id="remedy-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-saffron-200 rounded-3xl premium-shadow overflow-hidden flex flex-col gap-5 p-6 relative"
              >
                {/* Save button */}
                <button
                  onClick={() => isRemedySaved(generatedRemedy.remedyName) ? unsaveRemedy(generatedRemedy.remedyName) : saveRemedy(generatedRemedy.remedyName)}
                  className="absolute right-5 top-5 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-saffron-600 border border-gray-100 cursor-pointer transition"
                >
                  {isRemedySaved(generatedRemedy.remedyName) ? (
                    <BookmarkCheck className="w-5 h-5 text-saffron-500 fill-saffron-500" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>

                {/* Badge tags */}
                <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                  <span className="bg-saffron-500 text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                    DADI MA'S REMEDY
                  </span>
                  <span className="bg-cardamom-50 text-cardamom-700 text-[9px] font-bold px-2 py-0.5 rounded-md">
                    Prep: {generatedRemedy.prepTime}
                  </span>
                </div>

                {/* Remedy Titles */}
                <div>
                  <h3 className="text-xl font-bold font-display text-saffron-800 leading-tight">
                    {generatedRemedy.remedyName}
                  </h3>
                  {generatedRemedy.remedyLocalName && (
                    <span className="text-xs text-cardamom-600 font-mono italic mt-0.5 block">
                      Traditional Local Name: {generatedRemedy.remedyLocalName}
                    </span>
                  )}
                </div>

                {/* Ayurvedic logic */}
                <div className="bg-saffron-50/50 p-4 rounded-xl border border-saffron-100 text-xs text-saffron-800 italic leading-relaxed">
                  <strong>Dadi Ma says:</strong> "{generatedRemedy.scienceExplanation}"
                </div>

                {/* Ingredients needed */}
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-2">Natural Herbs & Spices Needed:</span>
                  <ul className="flex flex-col gap-1.5">
                    {generatedRemedy.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-100 text-xs">
                        <span className="text-gray-700">🌱 {ing.name}</span>
                        <span className="text-gray-500 font-mono text-[10px] font-semibold">{ing.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation steps */}
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-2">Preparation steps:</span>
                  <ol className="flex flex-col gap-2.5">
                    {generatedRemedy.preparationSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                        <span className="w-5 h-5 bg-saffron-100 text-saffron-700 rounded-full flex items-center justify-center font-bold shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Usage instructions */}
                <div className="border-t border-gray-100 pt-3">
                  <span className="text-xs font-bold text-gray-700 block mb-1">How & When to Consume:</span>
                  <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {generatedRemedy.usageInstructions}
                  </p>
                </div>

                {/* Safety warning */}
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-3.5 text-[11px] text-red-700 leading-relaxed">
                  <strong>⚠️ Traditional Boundary Warning:</strong> {generatedRemedy.safetyWarning}
                </div>

              </motion.div>
            )}

            {/* BACHAT RESULT */}
            {!loading && generatedBachat && activeTab === "bachat" && (
              <motion.div
                id="bachat-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-cardamom-100 rounded-3xl premium-shadow overflow-hidden flex flex-col gap-5 p-6"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-cardamom-500 text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                    PRESERVATION & SAVINGS DIARY
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-cardamom-700 flex items-center gap-1.5 leading-tight">
                    <TrendingUp className="w-4 h-4 text-cardamom-500" />
                    Preserving: {selectedVeggie}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-mono italic">
                    {generatedBachat.tipTitle}
                  </p>
                </div>

                {/* Storage Hack */}
                <div className="bg-cardamom-50/50 border border-cardamom-100/30 p-4 rounded-xl flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-cardamom-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cardamom-600" />
                    How to Store Safely:
                  </span>
                  <p className="text-xs text-cardamom-900 leading-relaxed">
                    {generatedBachat.storageHack}
                  </p>
                </div>

                {/* Revival Hack */}
                <div className="bg-saffron-50/50 border border-saffron-100/30 p-4 rounded-xl flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-saffron-800 flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-saffron-600" />
                    How to Revive Stale/Wilted:
                  </span>
                  <p className="text-xs text-saffron-900 leading-relaxed">
                    {generatedBachat.revivalHack}
                  </p>
                </div>

                {/* Alternative upcycle use */}
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-gray-600" />
                    Zero-Waste Upcycle / Peel Hack:
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {generatedBachat.alternativeUse}
                  </p>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </section>

      </main>

      {/* SAVED ITEMS MODAL DIALOG */}
      {showSavedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6 shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-cardamom-700 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-saffron-500 fill-saffron-500" />
                  My Saved Rasoi & Wellness Hacks
                </h3>
                <p className="text-xs text-gray-500">Access your saved custom recipes and remedies anytime.</p>
              </div>
              <button 
                onClick={() => setShowSavedModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Saved recipes lists */}
            <div className="flex flex-col gap-6">
              
              {/* Recipes column */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-3 font-mono border-b pb-1">SAVED JUGAAD RECIPES ({savedRecipes.length})</span>
                {savedRecipes.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No recipes saved yet. Generate one and tap the bookmark ribbon to save.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {savedRecipes.map((r, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-[10px] text-saffron-600 font-bold font-mono uppercase">{r.estimatedSavings} • {r.dietLabel}</span>
                          <h4 className="text-sm font-bold text-cardamom-700 font-display">{r.recipeName}</h4>
                          <p className="text-xs text-gray-500 italic mt-1 font-mono">"{r.recipeHinglishName}"</p>
                          <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">{r.description}</p>
                          
                          <button
                            onClick={() => {
                              setGeneratedRecipe(r);
                              setActiveTab("jugaad");
                              setShowSavedModal(false);
                            }}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cardamom-500 hover:text-cardamom-700"
                          >
                            <span>Open Details</span>
                            <ArrowRight className="w-4.5 h-4.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => unsaveRecipe(r.recipeName)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer"
                          title="Remove save"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Remedies column */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-3 font-mono border-b pb-1">SAVED HERBAL REMEDIES (NUSKHAS) ({savedRemedies.length})</span>
                {savedRemedies.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No home remedies saved yet. Query Dadi Ma and save items to view them here.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {savedRemedies.map((rem, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-[10px] text-cardamom-600 font-bold font-mono uppercase">PREP: {rem.prepTime}</span>
                          <h4 className="text-sm font-bold text-saffron-800 font-display">{rem.remedyName}</h4>
                          <p className="text-xs text-gray-500 italic mt-1 font-mono">"{rem.remedyLocalName}"</p>
                          <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">{rem.scienceExplanation.substring(0, 150)}...</p>
                          
                          <button
                            onClick={() => {
                              setGeneratedRemedy(rem);
                              setActiveTab("nuskhe");
                              setShowSavedModal(false);
                            }}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:text-saffron-700"
                          >
                            <span>Open Details</span>
                            <ArrowRight className="w-4.5 h-4.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => unsaveRemedy(rem.remedyName)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer"
                          title="Remove save"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-end">
              <button
                onClick={() => setShowSavedModal(false)}
                className="bg-cardamom-500 hover:bg-cardamom-600 text-white text-xs font-bold py-2.5 px-6 rounded-xl cursor-pointer"
              >
                Close Diary
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Decorative footer */}
      <footer className="mt-auto border-t border-cardamom-100/30 py-6 text-center text-xs text-gray-400 bg-white">
        <p className="font-display font-medium text-gray-500">Smart Rasoi — Local Household Innovation</p>
        <p className="text-[10px] text-gray-400 mt-1">Empowering the Indian kitchen with modern AI to revive traditional wisdom and minimize food waste.</p>
      </footer>

    </div>
  );
}
