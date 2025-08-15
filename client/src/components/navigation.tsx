import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Car, Menu, User, Settings, LogOut, BarChart } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  const getUserInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="text-primary text-2xl" />
            <span className="text-xl font-bold text-slate-800">RideShare Pro</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${location === '/' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              href="/rides" 
              className={`transition-colors ${location === '/rides' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              Browse Rides
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors ${location === '/about' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors ${location === '/contact' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2" data-testid="button-user-menu">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.profileImageUrl} />
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {getUserInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block">
                      {user.firstName || user.email?.split('@')[0] || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center" data-testid="link-dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center" data-testid="link-admin">
                        <BarChart className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.location.href = "/api/logout"}
                    className="flex items-center text-red-600"
                    data-testid="link-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = "/api/login"}
                  className="hidden sm:block"
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="button-sign-up"
                >
                  Sign Up
                </Button>
              </>
            )}
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
