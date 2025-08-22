import React from 'react';
import { Outlet } from 'react-router-dom';
import { MobileNav } from '@/components/ui/mobile-nav';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const ParentLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background font-nunito">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="py-4">
                  <h3 className="font-poppins font-semibold text-lg mb-4">Menu</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <div>
              <h1 className="font-poppins font-bold text-lg text-primary">TagMyKid</h1>
              <p className="text-xs text-muted-foreground">Hi, {user?.name?.split(' ')[0]}!</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              className="text-muted-foreground"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-4">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};