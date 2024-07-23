import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainMenu from './components/Navigation/MainMenu';
import Breadcrumbs from './components/Navigation/Breadcrumbs';
import SearchBar from './components/Navigation/SearchBar';
import PageTransition from './components/Navigation/PageTransition';
import { navItems } from './nav-items';

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <MainMenu />
      <div className="container mx-auto px-4">
        <div className="my-4">
          <SearchBar />
        </div>
        <Breadcrumbs />
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              {navItems.map((item) => (
                <Route key={item.to} path={item.to} element={item.page} />
              ))}
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <AppContent />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;