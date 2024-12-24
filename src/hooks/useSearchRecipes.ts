import useSWR from "swr"
import { SearchResult } from '../types';

const API_BASE_URL = "http://localhost:8008"; 

  
  // export const useSearchRecipes = (query: string) => {
  //   const { data, error, isLoading } = useSWR<Recipe[], Error>(
  //     query ? `/api/recipes?q=${query}` : null,
  //     async () => {
  //       // Simulate API delay
  //       await new Promise(resolve => setTimeout(resolve, 800));
  //       return mockRecipes;
  //     }
  //   );
  
  //   return {
  //     data,
  //     isLoading,
  //     error,
  //   };
  // };
export const useSearchRecipes = (query: string) => {
  const { data, error,isLoading } = useSWR<SearchResult,Error>(`${API_BASE_URL}/search/?query=${encodeURIComponent(query)}`, fetcher);

  return {
    data: data?.recipes,
    isLoading,
    error,
  };
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return data;
};

