
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../store/recipeSlice';
import { RootState } from '../store/store';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.recipes.categories);
  const selectedCategory = useSelector((state: RootState) => state.recipes.selectedCategory);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <ScrollArea className="w-full whitespace-nowrap rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex space-x-2 p-2">
          <button
            onClick={() => dispatch(setSelectedCategory('all'))}
            className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
              ${selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
                : 'bg-accent hover:bg-accent/80 text-accent-foreground'
              }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.idCategory}
              onClick={() => dispatch(setSelectedCategory(category.strCategory))}
              className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
                ${selectedCategory === category.strCategory
                  ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
                  : 'bg-accent hover:bg-accent/80 text-accent-foreground'
                }`}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2.5" />
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;

