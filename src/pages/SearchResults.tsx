import { useSearchParams } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { SearchBox } from '../components/SearchBox';
import { useSearchRecipes } from '../hooks/useSearchRecipes';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data: recipes, isLoading, error } = useSearchRecipes(query);

  return (
    <div className="py-8 px-4">
      <div className="max-w-xl mx-auto mb-8">
        <SearchBox />
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>

      {error && (
        <div className="text-center text-red-600">
          Error loading recipes. Please try again.
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      ) : recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No recipes found for "{query}"
        </div>
      )}
    </div>
  );
}