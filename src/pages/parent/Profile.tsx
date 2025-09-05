import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: 'google_user_6590',
    fullName: user?.name || 'Google User',
    phone: '123-555-6591',
    school: 'oakwood'
  });

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your information has been saved successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-card border-border">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-bold text-foreground">User Administration</CardTitle>
          <div className="h-1 w-24 bg-primary rounded-full"></div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <Button variant="secondary" className="w-full max-w-sm rounded-xl py-3 text-base font-medium">
              Change Picture
            </Button>
          </div>

          <div className="grid gap-6 max-w-2xl">
            <div className="space-y-3">
              <Label htmlFor="username" className="text-base font-medium text-foreground">Username</Label>
              <Input 
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="bg-muted/30 border-border rounded-xl h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-base font-medium text-foreground">Full Name</Label>
              <Input 
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="bg-foreground text-background rounded-xl h-12 text-base font-medium"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-base font-medium text-foreground">Phone Number</Label>
              <Input 
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-foreground text-background rounded-xl h-12 text-base font-medium"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="school" className="text-base font-medium text-foreground">School</Label>
              <Select value={formData.school} onValueChange={(value) => setFormData(prev => ({ ...prev, school: value }))}>
                <SelectTrigger className="bg-foreground text-background rounded-xl h-12 text-base font-medium border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  <SelectItem value="oakwood">Oakwood Elementary</SelectItem>
                  <SelectItem value="pine-valley">Pine Valley Primary</SelectItem>
                  <SelectItem value="maple-ridge">Maple Ridge School</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 pt-6 max-w-2xl">
            <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary-light text-primary-foreground rounded-xl h-12 text-base font-medium">
              Save Changes
            </Button>
            <Button variant="outline" className="flex-1 border-border rounded-xl h-12 text-base font-medium">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-foreground">Subscription Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg text-foreground">Family Plan</p>
                  <p className="text-muted-foreground">R50/month • Renews 06/09/2026</p>
                </div>
                <Badge className="bg-success text-success-foreground px-4 py-2 text-sm font-medium">Active</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl h-12 text-base font-medium border-border">
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-foreground">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground text-lg">You have no past orders.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};