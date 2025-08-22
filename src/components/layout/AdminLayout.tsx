import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  ScanLine, 
  BarChart3,
  LogOut,
  Menu,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'Learners', href: '/admin/learners' },
  { icon: ScanLine, label: 'QR Scanner', href: '/admin/scan' },
  { icon: ShoppingCart, label: 'Store', href: '/admin/store' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
];

const NavLink = ({ item, isActive }: { item: typeof adminNavItems[0], isActive: boolean }) => (
  <Link
    to={item.href}
    className={cn(
      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors font-nunito",
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:text-foreground hover:bg-accent"
    )}
  >
    <item.icon className="w-5 h-5" />
    <span>{item.label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-poppins font-bold text-lg">TagMyKid</h2>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {adminNavItems.map((item) => (
          <NavLink 
            key={item.href} 
            item={item} 
            isActive={location.pathname === item.href}
          />
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role?.replace('_', ' ')}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background font-nunito flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64">
        {/* Mobile Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40 md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              
              <div>
                <h1 className="font-poppins font-bold text-lg text-primary">Admin Portal</h1>
                <p className="text-xs text-muted-foreground">
                  {user?.role?.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};