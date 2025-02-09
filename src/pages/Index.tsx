
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchCategories } from '../store/recipeSlice';
import type { AppDispatch, RootState } from '../store/store';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import RecipeModal from '../components/RecipeModal';
import { ThemeToggle } from '../components/ThemeToggle';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import RecipeSkeleton from '../components/RecipeSkeleton';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    recipes,
    loading,
    error,
    searchTerm,
    selectedCategory,
    selectedRecipe
  } = useSelector((state: RootState) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.strCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <header className="text-center mb-12 animate-fade-down relative">
          <div className="absolute right-4 top-0">
            <ThemeToggle />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            Culinary Delights
          </h1>
          <p className="text-muted-foreground mb-8">Discover and save your favorite recipes</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <SearchBar />
            <CategoryFilter />
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <RecipeSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedRecipes.map((recipe, index) => (
                <div
                  key={recipe.idMeal}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedRecipe && <RecipeModal />}
    </div>
  );
};

export default Index;
