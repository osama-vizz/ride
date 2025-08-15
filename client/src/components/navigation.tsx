import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Car, Menu, User, Settings, LogOut, BarChart, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

export default function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getUserInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <Link href="/" className="flex items-center space-x-3 group" data-testid="link-home">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl transition-transform group-hover:scale-110">
              <Car className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">RideShare Pro</span>
          </Link>
          
          <nav className="hidden lg:flex space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${location === '/' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link 
              href="/rides" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${location === '/rides' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
              data-testid="nav-rides"
            >
              Browse Rides
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${location === '/about' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
              data-testid="nav-about"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${location === '/contact' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl p-2 transition-all duration-300" data-testid="button-user-menu">
                    <Avatar className="w-10 h-10 ring-2 ring-blue-500/20">
                      <AvatarImage src={user.profileImageUrl || ''} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                        {getUserInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block font-medium text-slate-700 dark:text-slate-300">
                      {user.firstName || user.email?.split('@')[0] || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-xl p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" data-testid="link-dashboard">
                      <User className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" data-testid="link-admin">
                        <BarChart className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <Settings className="w-5 h-5 text-slate-500" />
                    <span className="font-medium">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 border-slate-200 dark:border-slate-700" />
                  <DropdownMenuItem 
                    onClick={() => window.location.href = "/api/logout"}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                    data-testid="link-logout"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = "/api/login"}
                  className="hidden sm:block hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => window.location.href = "/api/login"}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  data-testid="button-sign-up"
                >
                  Sign Up
                </Button>
              </>
            )}
            
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl p-2 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
            <div className="px-4 py-6 space-y-2">
              <Link 
                href="/" 
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${location === '/' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-home"
              >
                Home
              </Link>
              <Link 
                href="/rides" 
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${location === '/rides' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-rides"
              >
                Browse Rides
              </Link>
              <Link 
                href="/about" 
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${location === '/about' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-about"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${location === '/contact' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-contact"
              >
                Contact
              </Link>
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      window.location.href = "/api/login";
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                    data-testid="mobile-button-sign-in"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.href = "/api/login";
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
                    data-testid="mobile-button-sign-up"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
