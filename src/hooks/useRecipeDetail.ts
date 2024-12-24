import useSWR from "swr"
import { RecipeDetail } from '../types';

const API_BASE_URL = "http://localhost:8008"; 


export const useRecipeDetail = (id: string) => {
  const { data, error,isLoading } = useSWR<RecipeDetail,Error>(`${API_BASE_URL}/recipe/${id}`, fetcher);

  return {
    data,
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

