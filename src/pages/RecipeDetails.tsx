import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Recipe } from '../types';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRecipe: Recipe = {
          id: id!,
          name: 'Simple Pasta Recipe',
          minutes: 30,
          n_steps: 4,
          description: 'A delicious and easy to make pasta recipe',
          steps: [
            'Boil water and add salt',
            'Cook pasta according to package instructions',
            'Prepare the sauce',
            'Combine pasta and sauce'
          ],
          ingredients: [
            'Pasta',
            'Salt',
            'Olive oil',
            'Garlic'
          ]
        };
        
        setRecipe(mockRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold">Recipe not found</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto px-4">
      <Link to="/search" className="flex items-center gap-2 text-gray-600 mb-6">
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
        <div>
          {recipe.n_steps} steps
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2">
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
              <li key={index} className="flex gap-4">
                <span className="font-semibold min-w-[24px]">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}