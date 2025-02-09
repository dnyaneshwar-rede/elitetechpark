
import React from 'react';
import { X, Clock, Users, Globe, Tag, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRecipe } from '../store/recipeSlice';
import { RootState } from '../store/store';
import { Button } from './ui/button';

const RecipeModal = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state: RootState) => state.recipes.selectedRecipe);

  if (!recipe) return null;

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map(i => ({
      ingredient: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`]
    }))
    .filter(({ ingredient }) => ingredient);

  const handleClose = () => dispatch(setSelectedRecipe(null));

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-up shadow-xl relative">
        <div className="sticky top-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-6 border-b z-10 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h2 className="text-2xl font-semibold text-gradient flex-1">{recipe.strMeal}</h2>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <div className="relative h-72 rounded-xl overflow-hidden mb-6">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>30 min</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span>4 servings</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-5 h-5" />
                <span>{recipe.strArea}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="w-5 h-5" />
                <span>{recipe.strCategory}</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <ul className="space-y-3">
                {ingredients.map(({ ingredient, measure }, index) => (
                  <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-primary/70 flex-shrink-0" />
                    <span className="font-medium">{measure}</span>
                    <span className="text-muted-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Instructions</h3>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {recipe.strInstructions}
              </p>
              
              {recipe.strYoutube && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Video Tutorial</h3>
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;

