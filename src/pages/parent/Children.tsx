import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, QrCode, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockChildren } from '@/data/mockData';
import { AddChildDialog } from '@/components/AddChildDialog';

export const Children = () => {
  const { user } = useAuth();
  const userChildren = mockChildren.filter(child => child.parentId === user?.id);
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-foreground">My Children</h1>
          <p className="text-muted-foreground font-nunito">
            Manage your children's profiles and safety information
          </p>
        </div>
        <Button onClick={() => setIsAddChildOpen(true)} className="bg-gradient-primary border-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Child
        </Button>
      </div>

      {/* Children Grid */}
      {userChildren.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {userChildren.map((child) => (
            <Card key={child.id} className="shadow-card border-0 hover:shadow-soft transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4 mb-2">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-poppins font-bold text-lg shrink-0">
                    {child.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="font-poppins text-xl truncate">{child.name}</CardTitle>
                    <CardDescription>{child.grade} • Class {child.class}</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-inter self-start">
                    {child.qrCode}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Allergies */}
                <div className="mb-4">
                  <p className="text-sm font-medium font-nunito mb-2">Allergies & Medical Info</p>
                  {child.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {child.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="text-xs">
                          ⚠️ {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No allergies reported</p>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to={`/child/${child.id}`}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to={`/child/${child.id}/qr`}>
                      <QrCode className="w-4 h-4 mr-1" />
                      QR Code
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-2">No children added yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start by adding your first child to TagMyKid. You'll be able to generate QR codes, 
              track their school activities, and manage their safety information.
            </p>
            <Button onClick={() => setIsAddChildOpen(true)} className="bg-gradient-primary border-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Child
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card border-0 bg-accent/50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg mb-1">QR Code Safety</h3>
                <p className="text-sm text-muted-foreground">
                  Each child gets a unique QR code for quick identification and emergency contact access.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0 bg-success/10">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <Edit className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg mb-1">Always Up-to-Date</h3>
                <p className="text-sm text-muted-foreground">
                  Update medical information and emergency contacts anytime to keep your child safe.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};