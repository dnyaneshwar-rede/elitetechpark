
import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/recipeSlice';
import { RootState } from '../store/store';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.recipes.searchTerm);

  return (
    <div className="relative max-w-md w-full animate-fade-up">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
          transition-all duration-200 hover:border-primary
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;

