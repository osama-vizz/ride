import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Calendar, CreditCard, LogOut, Plus } from "lucide-react";
import type { BookingWithDetails } from "@shared/schema";

export default function UserDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: bookings, isLoading: bookingsLoading, error } = useQuery<BookingWithDetails[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Handle unauthorized error
  useEffect(() => {
    if (error && isUnauthorizedError(error)) {
      toast({
        title: "Unauthorized", 
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-8"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="h-64 bg-slate-200 rounded"></div>
              <div className="lg:col-span-3 space-y-4">
                <div className="h-32 bg-slate-200 rounded"></div>
                <div className="h-32 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={user?.profileImageUrl} />
                      <AvatarFallback className="bg-primary text-white text-xl">
                        {getUserInitials(user?.firstName, user?.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-slate-800" data-testid="text-user-name">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.email || 'User'}
                    </h3>
                    <p className="text-sm text-slate-600" data-testid="text-user-email">{user?.email}</p>
                  </div>
                  
                  <nav className="space-y-2">
                    <div className="flex items-center px-4 py-2 text-primary bg-blue-50 rounded-lg font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Bookings
                    </div>
                    <button 
                      className="w-full text-left flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                      data-testid="link-profile"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile Settings
                    </button>
                    <button 
                      className="w-full text-left flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                      data-testid="link-payments"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment Methods
                    </button>
                    <button 
                      className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={() => window.location.href = "/api/logout"}
                      data-testid="link-logout"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">My Bookings</h2>
                  <Button onClick={() => navigate("/rides")} data-testid="button-new-booking">
                    <Plus className="w-4 h-4 mr-2" />
                    New Booking
                  </Button>
                </div>

                {bookingsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="animate-pulse flex items-center space-x-4">
                            <Skeleton className="w-16 h-12" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4" />
                              <Skeleton className="h-4 w-2/3" />
                            </div>
                            <Skeleton className="w-24 h-8" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} data-testid={`card-booking-${booking.id}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <Badge className={getStatusColor(booking.status)} data-testid={`status-${booking.id}`}>
                                {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
                              </Badge>
                              <span className="text-slate-600" data-testid={`booking-id-${booking.id}`}>
                                Booking #{booking.id.slice(-6)}
                              </span>
                            </div>
                            <span className="text-slate-600" data-testid={`booking-dates-${booking.id}`}>
                              {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-center space-x-4">
                              <img
                                src={booking.ride.imageUrl}
                                alt={`${booking.ride.model} booking thumbnail`}
                                className="w-16 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="font-semibold text-slate-800" data-testid={`vehicle-${booking.id}`}>
                                  {booking.ride.model}
                                </h4>
                                <p className="text-sm text-slate-600" data-testid={`location-${booking.id}`}>
                                  {booking.pickupLocation}
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm text-slate-600">Total Amount</p>
                              <p className="text-xl font-bold text-slate-800" data-testid={`amount-${booking.id}`}>
                                ${booking.totalAmount}
                              </p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                data-testid={`button-details-${booking.id}`}
                              >
                                View Details
                              </Button>
                              {booking.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  data-testid={`button-modify-${booking.id}`}
                                >
                                  Modify
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="text-6xl text-slate-300 mb-4">📅</div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">No bookings yet</h3>
                      <p className="text-slate-600 mb-6">Start your journey by booking your first ride.</p>
                      <Button onClick={() => navigate("/rides")} data-testid="button-browse-rides">
                        Browse Available Rides
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
