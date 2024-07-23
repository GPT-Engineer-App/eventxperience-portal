import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const AdminInterface = () => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    is_special: false,
    tags: [],
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (newItem) => {
      const { data, error } = await supabase.from('menu_items').insert([newItem]);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['menuItems']);
      toast({
        title: "Item Added",
        description: "The new menu item has been added successfully.",
      });
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: '',
        is_special: false,
        tags: [],
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add item: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemMutation.mutate({
      ...newItem,
      price: parseFloat(newItem.price),
      tags: newItem.tags.split(',').map(tag => tag.trim()),
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Interface</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Item Name"
          required
        />
        <Textarea
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          placeholder="Item Description"
          required
        />
        <Input
          name="price"
          type="number"
          step="0.01"
          value={newItem.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <Select name="category" onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map(category => (
              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_special"
            checked={newItem.is_special}
            onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, is_special: checked }))}
          />
          <label htmlFor="is_special">Special Item</label>
        </div>
        <Input
          name="tags"
          value={newItem.tags}
          onChange={handleInputChange}
          placeholder="Tags (comma-separated)"
        />
        <Button type="submit">Add Item</Button>
      </form>
    </div>
  );
};

export default AdminInterface;