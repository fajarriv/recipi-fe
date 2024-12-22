import useSWR from "swr"
import { Recipe } from '../types';

// Mock data
const mockRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Classic Spaghetti Carbonara',
      minutes: 30,
      n_steps: 5,
      description: 'A creamy Italian pasta dish with eggs, cheese, pancetta, and black pepper',
      steps: [
        'Bring a large pot of salted water to boil and cook spaghetti',
        'In a bowl, whisk eggs, cheese, and pepper',
        'Cook pancetta until crispy',
        'Combine hot pasta with egg mixture',
        'Add pancetta and serve immediately'
      ],
      ingredients: [
        'Spaghetti',
        'Eggs',
        'Pecorino Romano',
        'Pancetta',
        'Black pepper',
        'Salt'
      ]
    },
    {
      id: '2',
      name: 'Chicken Stir Fry',
      minutes: 25,
      n_steps: 4,
      description: 'Quick and healthy Asian-style chicken with vegetables',
      steps: [
        'Cut chicken and vegetables into bite-sized pieces',
        'Stir-fry chicken until golden',
        'Add vegetables and sauce',
        'Cook until vegetables are tender-crisp'
      ],
      ingredients: [
        'Chicken breast',
        'Bell peppers',
        'Broccoli',
        'Carrots',
        'Soy sauce',
        'Ginger'
      ]
    },
    {
      id: '3',
      name: 'Greek Salad',
      minutes: 15,
      n_steps: 3,
      description: 'Fresh and healthy traditional Greek salad with feta cheese',
      steps: [
        'Chop all vegetables',
        'Combine in a bowl with olives and feta',
        'Dress with olive oil and oregano'
      ],
      ingredients: [
        'Cucumber',
        'Tomatoes',
        'Red onion',
        'Feta cheese',
        'Kalamata olives',
        'Olive oil'
      ]
    },
    {
      id: '4',
      name: 'Chocolate Chip Cookies',
      minutes: 45,
      n_steps: 6,
      description: 'Classic homemade cookies that are crispy outside and chewy inside',
      steps: [
        'Cream butter and sugars',
        'Add eggs and vanilla',
        'Mix dry ingredients',
        'Combine wet and dry ingredients',
        'Add chocolate chips',
        'Bake until golden brown'
      ],
      ingredients: [
        'Butter',
        'Sugar',
        'Brown sugar',
        'Eggs',
        'Flour',
        'Chocolate chips'
      ]
    },
    {
      id: '5',
      name: 'Vegetable Soup',
      minutes: 40,
      n_steps: 4,
      description: 'Hearty and healthy vegetable soup perfect for any season',
      steps: [
        'Sauté onions, carrots, and celery',
        'Add remaining vegetables and broth',
        'Simmer until vegetables are tender',
        'Season to taste'
      ],
      ingredients: [
        'Carrots',
        'Celery',
        'Onions',
        'Potatoes',
        'Vegetable broth',
        'Herbs'
      ]
    }
  ];
  
  export const useSearchRecipes = (query: string) => {
    const { data, error, isLoading } = useSWR<Recipe[], Error>(
      query ? `/api/recipes?q=${query}` : null,
      async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockRecipes;
      }
    );
  
    return {
      data,
      isLoading,
      error,
    };
  };
// export const useSearchRecipes = (query: string) => {
//   const { data, error,isLoading } = useSWR<Recipe[],Error>(`/api/recipes?q=${query}`, fetcher);

//   return {
//     data,
//     isLoading,
//     error,
//   };
// };

// const fetcher = async (url: string) => {
//   const response = await fetch(url);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error("Failed to fetch recipes");
//   }

//   return data;
// };