import { Clock } from "lucide-react";
import { Recipe } from "../types";
import { Link, useSearchParams } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <Link to={`/recipe/${recipe.id}?q=${encodeURIComponent(query)}`}>
      <div className="border rounded-lg hover:shadow-md transition-shadow p-4 bg-white">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
          <p className="text-gray-600 mt-2 line-clamp-2">{recipe.description}</p>
          <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.minutes} mins</span>
            </div>
            <div>{recipe.n_steps} steps</div>
            <div>• {recipe.ingredients.length} ingredients</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
