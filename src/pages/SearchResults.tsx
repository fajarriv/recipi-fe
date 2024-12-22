import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { SearchBox } from '../components/SearchBox';
import { Recipe } from '../types';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRecipes: Recipe[] = [
          {
            id: '1',
            name: 'Simple Pasta',
            minutes: 30,
            n_steps: 4,
            description: 'Easy to make pasta recipe',
            steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
            ingredients: ['Pasta', 'Salt', 'Oil', 'Garlic']
          },
        ];
        
        setRecipes(mockRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-xl mx-auto mb-8">
        <SearchBox />
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      ) : recipes.length > 0 ? (
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