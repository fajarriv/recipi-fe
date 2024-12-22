export interface Recipe {
    id: string;
    name: string;
    minutes: number;
    n_steps: number;
    steps: string[];
    description: string;
    ingredients: string[];
  }