
import { useState, useEffect } from 'react';
import { Menu, X, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavLink from '../common/NavLink';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center font-display">
              SD
            </span>
            <span>SocioDent</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/appointments">Appointments</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/records">Records</NavLink>
          <NavLink to="/treatment-planner">Treatment Plan</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="rounded-full px-5 flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            Login
          </Button>
          <Button size="sm" className="rounded-full px-5">
            Sign Up
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container px-4 pt-20 pb-6 h-full flex flex-col">
          <nav className="flex flex-col space-y-6 text-center text-lg">
            <NavLink 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="py-3"
              activeClassName="text-primary font-medium"
              inactiveClassName="text-foreground/80 hover:text-foreground"
            >
              Home
            </NavLink>
            <NavLink 
              to="/appointments" 
              onClick={() => setIsOpen(false)}
              className="py-3"
              activeClassName="text-primary font-medium"
              inactiveClassName="text-foreground/80 hover:text-foreground"
            >
              Appointments
            </NavLink>
            <NavLink 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="py-3"
              activeClassName="text-primary font-medium"
              inactiveClassName="text-foreground/80 hover:text-foreground"
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/records" 
              onClick={() => setIsOpen(false)}
              className="py-3"
              activeClassName="text-primary font-medium"
              inactiveClassName="text-foreground/80 hover:text-foreground"
            >
              Records
            </NavLink>
            <NavLink 
              to="/treatment-planner" 
              onClick={() => setIsOpen(false)}
              className="py-3"
              activeClassName="text-primary font-medium"
              inactiveClassName="text-foreground/80 hover:text-foreground"
            >
              Treatment Plan
            </NavLink>
          </nav>
          
          <div className="mt-auto flex flex-col space-y-4 w-full">
            <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2">
              <UserCircle className="h-5 w-5" />
              Login
            </Button>
            <Button className="w-full py-6">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
