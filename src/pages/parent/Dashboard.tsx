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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-card p-8 border border-border">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Welcome, {user?.name || 'Google User'}!
        </h1>
        <div className="h-1 w-24 bg-primary rounded-full mb-4"></div>
        <p className="text-muted-foreground text-lg">
          This is your main dashboard area. Select a child from the sidebar to view their QR code, or add a new child.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8">
        {/* Subscription Card */}
        <Card className="shadow-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold text-foreground">Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Your</span>
                    <span className="font-semibold text-foreground">Family Plan</span>
                    <span className="text-muted-foreground">is</span>
                    <Badge className="bg-success text-success-foreground font-medium px-3 py-1">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Renews on: 06/09/2026</p>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary-light text-primary-foreground font-medium px-6">
                    Renew Now
                  </Button>
                  <Button variant="ghost" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders Card */}
        <Card className="shadow-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold text-foreground">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground text-lg">You have no past orders.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};