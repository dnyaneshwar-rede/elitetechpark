
import React, { useState, useCallback } from 'react';
import { Recipe } from '../types';
import { Heart, Clock, Users, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, setSelectedRecipe } from '../store/recipeSlice';
import { RootState } from '../store/store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const favorites = useSelector((state: RootState) => state.recipes.favorites);
  const isFavorite = favorites.some(f => f.idMeal === recipe.idMeal);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Memoize the category icon getter
  const getCategoryIcon = useCallback((category: string) => {
    const icons: Record<string, string> = {
      beef: '🥩',
      chicken: '🍗',
      dessert: '🍰',
      lamb: '🍖',
      pasta: '🍝',
      seafood: '🦐',
      side: '🥗',
      starter: '🥪',
      vegetarian: '🥬',
      breakfast: '🍳'
    };
    return icons[category.toLowerCase()] || '🍽️';
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(recipe));
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: recipe.strMeal,
      variant: "default",
      className: isFavorite ? "toast-error" : "toast-success",
      duration: 2000,
    });
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Generate smaller image URL for thumbnail
  const optimizedImageUrl = `${recipe.strMealThumb}/preview`;

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in dark:bg-card/80"
      onClick={() => dispatch(setSelectedRecipe(recipe))}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {/* Blur placeholder */}
        <div
          className={cn(
            "absolute inset-0 blur-lg scale-110 transition-opacity duration-300",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          <img
            src={optimizedImageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main image */}
        {!imageError ? (
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className={cn(
              "w-full h-full object-cover transform transition-all duration-300 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            No image available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2.5 rounded-full glass-effect hover:scale-110 transition-transform duration-200 dark:bg-secondary/20"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite ? 'fill-primary text-primary' : 'text-white'
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl" role="img" aria-label={recipe.strCategory}>
            {getCategoryIcon(recipe.strCategory)}
          </span>
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors dark:text-foreground">
            {recipe.strMeal}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm px-3 py-1 bg-accent dark:bg-accent/20 rounded-full text-secondary dark:text-foreground font-medium">
            {recipe.strCategory}
          </span>
          {recipe.strArea && (
            <span className="text-sm px-3 py-1 bg-accent dark:bg-accent/20 rounded-full text-secondary dark:text-foreground font-medium">
              {recipe.strArea}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>4 servings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
