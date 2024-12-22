import useSWR from "swr";

interface Suggestion {
  id: string;
  result: string;
}

const mockSuggestions = [
  { id: '1', result: 'Pasta with garlic' },
  { id: '2', result: 'Chicken soup recipe' },
  { id: '3', result: 'Greek yogurt dressing' },
  { id: '4', result: 'Chocolate ganache' },
  { id: '5', result: 'Fresh vegetables' },
  { id: '6', result: 'Beef broth' },
  { id: '7', result: 'Fish sauce' },
  { id: '8', result: 'Caesar dressing' },
];

export const useSuggestions = (query: string) => {
  const { data, error, isLoading } = useSWR<Suggestion[], Error>(
    query.length > 2 ? `/api/suggestions?q=${query}` : null,
    async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockSuggestions
    }
  );

  return {
    suggestions: data || [],
    isLoading,
    error
  };
};