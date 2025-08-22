import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'parent' | 'admin' | 'staff' | 'shop_manager' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers = [
  { id: '1', email: 'parent@demo.com', password: 'demo123', name: 'Sarah Johnson', role: 'parent' as UserRole },
  { id: '2', email: 'admin@demo.com', password: 'admin123', name: 'Mike Chen', role: 'admin' as UserRole },
  { id: '3', email: 'staff@demo.com', password: 'staff123', name: 'Emma Davis', role: 'staff' as UserRole },
  { id: '4', email: 'shop@demo.com', password: 'shop123', name: 'John Smith', role: 'shop_manager' as UserRole },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('tagmykid_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock login with timeout to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => 
      u.email === email && 
      u.password === password && 
      (!role || u.role === role)
    );

    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      };
      setUser(userWithoutPassword);
      localStorage.setItem('tagmykid_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tagmykid_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};