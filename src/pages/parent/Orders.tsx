import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, ShoppingCart, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockOrders, mockProducts } from '@/data/mockData';

export const Orders = () => {
  const { user } = useAuth();
  const userOrders = mockOrders.filter(order => order.parentId === user?.id);

  const getProductName = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-secondary text-secondary-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-foreground">Order History</h1>
          <p className="text-muted-foreground font-nunito">
            Track your school store purchases and deliveries
          </p>
        </div>
        <Button className="bg-gradient-primary border-0">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
      </div>

      {/* Orders List */}
      {userOrders.length > 0 ? (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <Card key={order.id} className="shadow-card border-0">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div>
                    <CardTitle className="font-poppins text-lg">Order #{order.id}</CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <p className="text-2xl font-bold font-inter text-primary">R{order.total}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  <p className="font-medium font-nunito text-sm">Items:</p>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{getProductName(item.productId)}</p>
                          <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold font-inter">R{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    {order.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        Reorder Items
                      </Button>
                    )}
                  </div>
                  
                  {/* Delivery Status */}
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {order.status === 'completed' && 'Delivered'}
                      {order.status === 'pending' && 'Processing'}
                      {order.status === 'cancelled' && 'Cancelled'}
                    </p>
                    {order.status === 'pending' && (
                      <p className="text-xs text-muted-foreground">Est. delivery: 2-3 days</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Empty State
        <Card className="shadow-card border-0">
          <CardContent className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start shopping in our school store to see your orders appear here.
            </p>
            <Button className="bg-gradient-primary border-0">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Order Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-inter text-primary">{userOrders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-inter text-success">
              {userOrders.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-inter text-secondary">
              {userOrders.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-inter text-primary">
              R{userOrders.reduce((sum, order) => sum + order.total, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};