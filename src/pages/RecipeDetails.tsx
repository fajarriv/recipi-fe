import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { useRecipeDetail } from "../hooks/useRecipeDetail";
import { Footer } from "../components/Footer";

export default function RecipeDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: recipe, isLoading, error } = useRecipeDetail(id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-600">
          Error loading recipe
        </h2>
        <Link
          to="/search"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Return to search
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold">Recipe not found</h2>
        <Link
          to="/search"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Return to search results
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="py-8 max-w-4xl mx-auto px-4">
          <Link
            to={`/search?q=${encodeURIComponent(query)}`}
            className="flex items-center gap-2 text-gray-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to search results
          </Link>

          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{recipe.minutes} minutes</span>
            </div>
            <div>{recipe.n_steps} steps</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Steps</h2>
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-4"
                  >
                    <span className="font-semibold min-w-[24px]">
                      {index + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
