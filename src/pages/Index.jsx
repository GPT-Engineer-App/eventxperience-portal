import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
      <h1 className="text-5xl font-bold mb-8">Welcome to EventXperience</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Discover, attend, and manage events with ease. Enjoy seamless bar ordering and venue navigation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/events">
          <Button variant="secondary" size="lg" className="w-full">
            Explore Events
          </Button>
        </Link>
        <Link to="/bar">
          <Button variant="secondary" size="lg" className="w-full">
            Bar Ordering
          </Button>
        </Link>
        <Link to="/navigation">
          <Button variant="secondary" size="lg" className="w-full">
            Venue Navigation
          </Button>
        </Link>
        <Link to="/support">
          <Button variant="secondary" size="lg" className="w-full">
            User Support
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;