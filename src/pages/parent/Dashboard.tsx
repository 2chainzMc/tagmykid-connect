import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, QrCode, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockChildren, mockOrders } from '@/data/mockData';

export const Dashboard = () => {
  const { user } = useAuth();
  const userChildren = mockChildren.filter(child => child.parentId === user?.id);
  const userOrders = mockOrders.filter(order => order.parentId === user?.id);
  const pendingOrders = userOrders.filter(order => order.status === 'pending');

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="font-poppins text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground font-nunito">
          Keep your children safe and connected at school
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-inter font-bold text-primary">
              {userChildren.length}
            </div>
            <div className="text-sm text-muted-foreground">Children</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-inter font-bold text-secondary">
              {pendingOrders.length}
            </div>
            <div className="text-sm text-muted-foreground">Pending Orders</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-inter font-bold text-success">
              R50
            </div>
            <div className="text-sm text-muted-foreground">Monthly Plan</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
      </div>

      {/* Children Section */}
      <Card className="shadow-card border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-poppins text-xl">My Children</CardTitle>
              <CardDescription>Manage your children's profiles and QR codes</CardDescription>
            </div>
            <Button asChild className="bg-gradient-primary border-0">
              <Link to="/child/add">
                <Plus className="w-4 h-4 mr-2" />
                Add Child
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {userChildren.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {userChildren.map((child) => (
                <Card key={child.id} className="border border-border hover:shadow-soft transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-poppins font-semibold text-lg">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">{child.grade} • {child.class}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {child.qrCode}
                      </Badge>
                    </div>
                    
                    {child.allergies.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1">Allergies:</p>
                        <div className="flex flex-wrap gap-1">
                          {child.allergies.map((allergy) => (
                            <Badge key={allergy} variant="secondary" className="text-xs">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link to={`/child/${child.id}`}>View Profile</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/child/${child.id}/qr`}>
                          <QrCode className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-poppins font-semibold mb-2">No children added yet</h3>
              <p className="text-muted-foreground mb-4">Add your first child to get started with TagMyKid</p>
              <Button asChild className="bg-gradient-primary border-0">
                <Link to="/child/add">Add Your First Child</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="shadow-card border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-poppins text-xl">Recent Orders</CardTitle>
              <CardDescription>Track your school store purchases</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link to="/store">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Now
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {userOrders.length > 0 ? (
            <div className="space-y-3">
              {userOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'completed' ? 'bg-success' : 
                      order.status === 'pending' ? 'bg-secondary' : 'bg-destructive'
                    }`} />
                    <div>
                      <p className="font-medium font-nunito">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold font-inter">R{order.total}</p>
                    <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};