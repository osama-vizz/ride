import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, 
  Users, 
  Car, 
  DollarSign, 
  Plus, 
  Edit, 
  Shield,
  Calendar,
  TrendingUp,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import type { Ride, InsertRide, BookingWithDetails } from "@shared/schema";

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [isAddRideOpen, setIsAddRideOpen] = useState(false);
  const [editingRide, setEditingRide] = useState<Ride | null>(null);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "Admin access required",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics"],
    enabled: isAuthenticated && user?.isAdmin,
    retry: false,
  });

  const { data: rides, isLoading: ridesLoading } = useQuery<Ride[]>({
    queryKey: ["/api/rides"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery<BookingWithDetails[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const [rideForm, setRideForm] = useState<InsertRide>({
    model: "",
    category: "",
    imageUrl: "",
    pricePerDay: "0",
    seats: 4,
    transmission: "Automatic",
    fuelType: "Gasoline",
    location: "",
  });

  const createRideMutation = useMutation({
    mutationFn: async (rideData: InsertRide) => {
      const response = await apiRequest("POST", "/api/rides", rideData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rides"] });
      setIsAddRideOpen(false);
      setRideForm({
        model: "",
        category: "",
        imageUrl: "",
        pricePerDay: "0",
        seats: 4,
        transmission: "Automatic",
        fuelType: "Gasoline",
        location: "",
      });
      toast({
        title: "Success",
        description: "Ride added successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Admin access required",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to add ride",
        variant: "destructive",
      });
    },
  });

  const updateRideMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertRide> }) => {
      const response = await apiRequest("PUT", `/api/rides/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rides"] });
      setEditingRide(null);
      toast({
        title: "Success",
        description: "Ride updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Admin access required",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to update ride",
        variant: "destructive",
      });
    },
  });

  const handleAddRide = (e: React.FormEvent) => {
    e.preventDefault();
    createRideMutation.mutate(rideForm);
  };

  const handleToggleRideStatus = (ride: Ride) => {
    updateRideMutation.mutate({
      id: ride.id,
      data: { available: !ride.available }
    });
  };

  if (isLoading || analyticsLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-8"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-slate-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h1>
            <p className="text-slate-600">Administrator access required to view this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800">Admin Panel</h3>
                    <p className="text-sm text-slate-600">RideShare Pro</p>
                  </div>
                  
                  <nav className="space-y-2">
                    <div className="flex items-center px-4 py-2 text-primary bg-blue-50 rounded-lg font-medium">
                      <BarChart className="w-4 h-4 mr-2" />
                      Analytics
                    </div>
                    <div className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                      <Car className="w-4 h-4 mr-2" />
                      Manage Rides
                    </div>
                    <div className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      Bookings
                    </div>
                    <div className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                      <Users className="w-4 h-4 mr-2" />
                      Users
                    </div>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Analytics Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Total Bookings</p>
                          <p className="text-2xl font-bold text-slate-800" data-testid="text-total-bookings">
                            {analytics?.totalBookings || 0}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        +12% from last month
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Revenue</p>
                          <p className="text-2xl font-bold text-slate-800" data-testid="text-revenue">
                            ${analytics?.totalRevenue || '0'}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        +8% from last month
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Active Rides</p>
                          <p className="text-2xl font-bold text-slate-800" data-testid="text-active-rides">
                            {analytics?.activeRides || 0}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Car className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        85% utilization rate
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Total Users</p>
                          <p className="text-2xl font-bold text-slate-800" data-testid="text-total-users">
                            {analytics?.totalUsers || 0}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        +15% new users
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Ride Management */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Ride Management</CardTitle>
                      <Dialog open={isAddRideOpen} onOpenChange={setIsAddRideOpen}>
                        <DialogTrigger asChild>
                          <Button data-testid="button-add-ride">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Ride
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add New Ride</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAddRide} className="space-y-4">
                            <div>
                              <Label htmlFor="model">Vehicle Model</Label>
                              <Input
                                id="model"
                                required
                                value={rideForm.model}
                                onChange={(e) => setRideForm({ ...rideForm, model: e.target.value })}
                                data-testid="input-ride-model"
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">Category</Label>
                              <Select value={rideForm.category} onValueChange={(value) => setRideForm({ ...rideForm, category: value })}>
                                <SelectTrigger data-testid="select-ride-category">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Economy">Economy</SelectItem>
                                  <SelectItem value="Compact">Compact</SelectItem>
                                  <SelectItem value="SUV">SUV</SelectItem>
                                  <SelectItem value="Luxury">Luxury</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="pricePerDay">Price per Day ($)</Label>
                              <Input
                                id="pricePerDay"
                                type="number"
                                step="0.01"
                                required
                                value={rideForm.pricePerDay}
                                onChange={(e) => setRideForm({ ...rideForm, pricePerDay: e.target.value })}
                                data-testid="input-ride-price"
                              />
                            </div>
                            <div>
                              <Label htmlFor="imageUrl">Image URL</Label>
                              <Input
                                id="imageUrl"
                                type="url"
                                required
                                value={rideForm.imageUrl}
                                onChange={(e) => setRideForm({ ...rideForm, imageUrl: e.target.value })}
                                data-testid="input-ride-image"
                              />
                            </div>
                            <div>
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                required
                                value={rideForm.location}
                                onChange={(e) => setRideForm({ ...rideForm, location: e.target.value })}
                                data-testid="input-ride-location"
                              />
                            </div>
                            <Button type="submit" className="w-full" disabled={createRideMutation.isPending} data-testid="button-submit-ride">
                              {createRideMutation.isPending ? "Adding..." : "Add Ride"}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {ridesLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-16" />
                        ))}
                      </div>
                    ) : rides && rides.length > 0 ? (
                      <div className="space-y-4">
                        {rides.map((ride) => (
                          <div key={ride.id} className="border border-slate-200 rounded-lg p-4" data-testid={`ride-item-${ride.id}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={ride.imageUrl}
                                  alt={`${ride.model} for admin management`}
                                  className="w-16 h-12 object-cover rounded-lg"
                                />
                                <div>
                                  <h4 className="font-semibold text-slate-800" data-testid={`ride-model-${ride.id}`}>
                                    {ride.model}
                                  </h4>
                                  <p className="text-sm text-slate-600" data-testid={`ride-category-${ride.id}`}>
                                    {ride.category}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-6">
                                <div className="text-center">
                                  <p className="text-sm text-slate-600">Daily Rate</p>
                                  <p className="font-semibold text-slate-800" data-testid={`ride-price-${ride.id}`}>
                                    ${ride.pricePerDay}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-slate-600">Status</p>
                                  <Badge 
                                    className={ride.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                                    data-testid={`ride-status-${ride.id}`}
                                  >
                                    {ride.available ? "Available" : "Disabled"}
                                  </Badge>
                                </div>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingRide(ride)}
                                    data-testid={`button-edit-${ride.id}`}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleToggleRideStatus(ride)}
                                    disabled={updateRideMutation.isPending}
                                    data-testid={`button-toggle-${ride.id}`}
                                  >
                                    {ride.available ? (
                                      <ToggleRight className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <ToggleLeft className="w-4 h-4 text-red-600" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Car className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">No rides available. Add your first ride to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
