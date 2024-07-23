import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DigitalMenuDisplay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['menuItems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const filteredItems = menuItems?.filter(item => {
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

  if (isLoading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Digital Menu</h2>
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
          <TabsTrigger value="All">All</TabsTrigger>
          {categories?.map(category => (
            <TabsTrigger key={category.id} value={category.name}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="All">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems?.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        {categories?.map(category => (
          <TabsContent key={category.id} value={category.name}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems?.filter(item => item.category === category.name).map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const MenuItemCard = ({ item }) => {
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
        <Button>Add to Order</Button>
      </CardFooter>
    </Card>
  );
};

export default DigitalMenuDisplay;