
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavLink from '../common/NavLink';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import UserAvatar from '../common/UserAvatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

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
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center font-display">
              SD
            </span>
            <span>SocioDent</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/appointments">Appointments</NavLink>
            <NavLink to="/records">Records</NavLink>
            <NavLink to="/treatment-planner">Treatment Plan</NavLink>
            <NavLink to="/marketplace">Marketplace</NavLink>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
          </nav>
        )}

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/marketplace" className="relative mr-2">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {getCartCount()}
                    </Badge>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <UserAvatar name={user?.name || "User"} className="h-10 w-10" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-sm font-normal text-muted-foreground">
                    {user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/appointments">Appointments</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/marketplace">Marketplace</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="rounded-full px-5" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" className="rounded-full px-5" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
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
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 mb-6 p-4 border-b">
                <UserAvatar name={user?.name || "User"} className="h-10 w-10" />
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <nav className="flex flex-col space-y-6 text-center text-lg">
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
                  to="/appointments" 
                  onClick={() => setIsOpen(false)}
                  className="py-3"
                  activeClassName="text-primary font-medium"
                  inactiveClassName="text-foreground/80 hover:text-foreground"
                >
                  Appointments
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
                <NavLink 
                  to="/marketplace" 
                  onClick={() => setIsOpen(false)}
                  className="py-3"
                  activeClassName="text-primary font-medium"
                  inactiveClassName="text-foreground/80 hover:text-foreground"
                >
                  Marketplace
                  {getCartCount() > 0 && (
                    <Badge className="ml-2">{getCartCount()}</Badge>
                  )}
                </NavLink>
              </nav>
              <div className="mt-auto">
                <Button 
                  variant="destructive" 
                  className="w-full py-6 flex items-center justify-center gap-2"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  Log Out
                </Button>
              </div>
            </>
          ) : (
            <>
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
              </nav>
              <div className="mt-auto flex flex-col space-y-4 w-full">
                <Button 
                  variant="outline" 
                  className="w-full py-6"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  className="w-full py-6"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
