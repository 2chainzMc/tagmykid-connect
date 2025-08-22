import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ScanLine, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Bell,
  Settings
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockStats, mockScanLogs, mockOrders } from '@/data/mockData';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user } = useAuth();
  
  const recentScans = mockScanLogs.slice(0, 5);
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground font-nunito">
            Welcome back, {user?.name} • {user?.role?.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Learners</p>
                <p className="text-xl sm:text-3xl font-bold font-inter text-primary">{mockStats.totalLearners}</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-60" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-sm text-success font-medium">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Scans</p>
                <p className="text-xl sm:text-3xl font-bold font-inter text-secondary">{mockStats.todayScans}</p>
              </div>
              <ScanLine className="w-8 h-8 text-secondary opacity-60" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-muted-foreground">Peak: 8-9 AM</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-xl sm:text-3xl font-bold font-inter text-destructive">{mockStats.pendingOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-destructive opacity-60" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-muted-foreground">Avg processing: 2 days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-xl sm:text-3xl font-bold font-inter text-success">R{mockStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-success opacity-60" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-sm text-success font-medium">+8% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent QR Scans */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-poppins text-lg">Recent QR Scans</CardTitle>
                <CardDescription>Latest learner activity</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/scan/logs">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <ScanLine className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium font-nunito text-sm">Child #{scan.childId}</p>
                      <p className="text-xs text-muted-foreground">{scan.location} • {scan.scannedBy}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {scan.reason}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(scan.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-poppins text-lg">Recent Orders</CardTitle>
                <CardDescription>Latest store activity</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/orders">Manage Orders</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium font-nunito text-sm">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold font-inter text-sm">R{order.total}</p>
                    <Badge 
                      variant={order.status === 'completed' ? 'default' : 'secondary'} 
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="font-poppins text-lg">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link to="/admin/scan">
                <ScanLine className="w-6 h-6 mb-2" />
                <span className="text-sm">QR Scanner</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link to="/admin/learners">
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm">Manage Learners</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link to="/admin/store">
                <ShoppingCart className="w-6 h-6 mb-2" />
                <span className="text-sm">Store Management</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 flex-col">
              <Link to="/admin/reports">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm">View Reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};