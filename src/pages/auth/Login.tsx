import React, { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, type UserRole } from '@/context/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Baby, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('parent');
  const [error, setError] = useState('');
  const { login, user, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Check if admin login is requested
  const isAdminLogin = searchParams.get('admin') === 'true';

  React.useEffect(() => {
    if (isAdminLogin) {
      setRole('admin');
    }
  }, [isAdminLogin]);

  // Redirect if already logged in
  if (user) {
    if (user.role === 'parent') {
      return <Navigate to="/parent/dashboard" replace />;
    } else {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${role}.`,
      });
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleDemoLogin = (demoRole: UserRole, demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setRole(demoRole);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 font-nunito">
      <div className="w-full max-w-md">
        <Card className="shadow-soft border-0">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              {isAdminLogin ? (
                <GraduationCap className="w-6 h-6 text-white" />
              ) : (
                <Baby className="w-6 h-6 text-white" />
              )}
            </div>
            <CardTitle className="font-poppins text-2xl">
              {isAdminLogin ? 'Admin Portal' : 'Welcome to TagMyKid'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isAdminLogin 
                ? 'Sign in to manage your school' 
                : 'Keep your child safe and connected'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isAdminLogin && (
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role || 'admin'} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">School Admin</SelectItem>
                      <SelectItem value="staff">Staff Member</SelectItem>
                      <SelectItem value="shop_manager">Shop Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary border-0" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-3">Demo Accounts:</p>
              <div className="space-y-2">
                {!isAdminLogin && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleDemoLogin('parent', 'parent@demo.com', 'demo123')}
                  >
                    Parent Demo (parent@demo.com / demo123)
                  </Button>
                )}
                {isAdminLogin && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin('admin', 'admin@demo.com', 'admin123')}
                    >
                      Admin Demo (admin@demo.com / admin123)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin('staff', 'staff@demo.com', 'staff123')}
                    >
                      Staff Demo (staff@demo.com / staff123)
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                {isAdminLogin ? (
                  <a href="/login">Parent Login</a>
                ) : (
                  <a href="/login?admin=true">Admin Login</a>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};