import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const DigitalMenuDisplay = ({ menuItems, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { toast } = useToast();

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesFilters = activeFilters.length === 0 || 
                           activeFilters.every(filter => item.tags.includes(filter));
    return matchesSearch && matchesCategory && matchesFilters;
  });

  const handleFilterToggle = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Search menu items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4">
        <span className="font-semibold mr-2">Filters:</span>
        {['Vegetarian', 'Gluten-Free', 'Spicy'].map(filter => (
          <Badge
            key={filter}
            variant={activeFilters.includes(filter) ? "default" : "outline"}
            className="mr-2 cursor-pointer"
            onClick={() => handleFilterToggle(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems
                .filter(item => category === 'All' || item.category === category)
                .map(item => (
                  <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const MenuItemCard = ({ item, onAddToCart }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover mb-2" />
        <p className="font-bold">${item.price.toFixed(2)}</p>
        {item.is_special && (
          <Badge variant="secondary" className="mt-2">Special</Badge>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(item)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default DigitalMenuDisplay;