import { useSearchParams, Link } from "react-router-dom";
import { RecipeCard } from "../components/RecipeCard";
import { SearchBox } from "../components/SearchBox";
import { useSearchRecipes } from "../hooks/useSearchRecipes";
import { Home } from "lucide-react"; // Import Home icon

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: recipes, isLoading, error } = useSearchRecipes(query);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="p-2 hover:bg-white rounded-lg transition-colors duration-200 group"
            title="Go to homepage"
          >
            <Home className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
          </Link>
          <div className="flex-1">
            <SearchBox />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            Search Results for "{query}"
          </h2>

          {error && (
            <div className="text-center text-red-600 py-8">
              Error loading recipes. Please try again.
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
          ) : recipes && recipes.length > 0 ? (
            <div className="space-y-4 flex flex-col">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-16">
              No recipes found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}