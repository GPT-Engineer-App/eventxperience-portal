import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from 'lucide-react';

const MainMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { title: 'Home', path: '/' },
    { 
      title: 'Events', 
      path: '/events',
      subItems: [
        { title: 'Upcoming Events', path: '/events/upcoming' },
        { title: 'Past Events', path: '/events/past' },
        { title: 'My Bookings', path: '/events/my-bookings' },
      ]
    },
    { title: 'Bar Menu', path: '/bar' },
    { title: 'My Account', path: '/account' },
    { title: 'Contact Us', path: '/contact' },
    { title: 'Help', path: '/help' },
  ];

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">EventXperience</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            item.subItems ? (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">{item.title}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.subItems.map((subItem) => (
                    <DropdownMenuItem key={subItem.title}>
                      <Link to={subItem.path} className="w-full">{subItem.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={item.title} to={item.path}>
                <Button variant="ghost">{item.title}</Button>
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          {menuItems.map((item) => (
            <div key={item.title} className="py-2">
              {item.subItems ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      {item.title}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.title}>
                        <Link to={subItem.path} className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                          {subItem.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to={item.path} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">{item.title}</Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default MainMenu;