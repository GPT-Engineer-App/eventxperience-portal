import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Implement autocomplete logic here
    // For now, we'll use a simple example
    const dummySuggestions = ['Event 1', 'Event 2', 'Bar Menu', 'Help Center'];
    setSuggestions(dummySuggestions.filter(item => item.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full"
        />
        <Button type="submit" className="ml-2">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-background border border-input mt-1 rounded-md shadow-lg">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-accent cursor-pointer"
              onClick={() => {
                setSearchTerm(item);
                setSuggestions([]);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;