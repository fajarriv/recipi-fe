export interface RecipePreview {
  rank: number;
  id: string;
  name: string;
  minutes: number;
  n_steps: number;
  description: string;
  n_ingredients: number;
}

export interface SearchResult {
  total_results: number;
  recipes: RecipePreview[];
}

export interface RecipeDetail {
  id: string;
  name: string;
  minutes: number;
  n_steps: number;
  n_ingredients: number;
  steps: string[];
  description: string;
  ingredients: string[];
}