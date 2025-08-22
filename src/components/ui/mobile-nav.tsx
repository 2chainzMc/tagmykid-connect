import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ShoppingCart, Baby, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
}

const parentNavItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/parent/dashboard' },
  { icon: Baby, label: 'Children', href: '/parent/children' },
  { icon: ShoppingCart, label: 'Store', href: '/parent/store' },
  { icon: Package, label: 'Orders', href: '/parent/orders' },
  { icon: User, label: 'Profile', href: '/parent/profile' }
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {parentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href === '/parent/children' && location.pathname.startsWith('/parent/child'));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive 
                  ? "text-primary bg-accent" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-nunito font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};