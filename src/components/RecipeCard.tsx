import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link to={`/recipe/${recipe.id}`}>
          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4">
            <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
            <p className="text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.minutes} mins</span>
              </div>
              <div className="text-sm">
                {recipe.n_steps} steps
              </div>
            </div>
          </div>
        </Link>
      );
}
export { RecipeCard };