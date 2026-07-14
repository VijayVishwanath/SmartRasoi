export interface RecipeIngredient {
  name: string;
  amount: string;
  isKeyLeftover: boolean;
}

export interface Recipe {
  recipeName: string;
  recipeHinglishName: string;
  description: string;
  prepCookTime: string;
  difficulty: string;
  estimatedSavings: string;
  dietLabel: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  jugaadProTip: string;
}

export interface RemedyIngredient {
  name: string;
  amount: string;
}

export interface Remedy {
  remedyName: string;
  remedyLocalName: string;
  scienceExplanation: string;
  prepTime: string;
  ingredients: RemedyIngredient[];
  preparationSteps: string[];
  usageInstructions: string;
  safetyWarning: string;
}

export interface BachatTip {
  tipTitle: string;
  storageHack: string;
  revivalHack: string;
  alternativeUse: string;
}

export interface SeasonInfo {
  name: string;
  sanskritName: string;
  period: string;
  description: string;
  vibe: string;
  spices: string[];
  avoid: string[];
  tips: string[];
  wellnessShot: {
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
  };
}
