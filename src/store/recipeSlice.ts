
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Recipe, Category } from '../types';

interface RecipeState {
  recipes: Recipe[];
  favorites: Recipe[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedRecipe: Recipe | null;
  searchTerm: string;
  selectedCategory: string;
}

const initialState: RecipeState = {
  recipes: [],
  favorites: [],
  categories: [],
  loading: false,
  error: null,
  selectedRecipe: null,
  searchTerm: '',
  selectedCategory: 'all',
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals || [];
  }
);

export const fetchCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    return data.categories || [];
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Recipe>) => {
      const exists = state.favorites.find(r => r.idMeal === action.payload.idMeal);
      if (exists) {
        state.favorites = state.favorites.filter(r => r.idMeal !== action.payload.idMeal);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSearchTerm, setSelectedCategory, setSelectedRecipe, toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
