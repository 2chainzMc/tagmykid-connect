import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  QrCode, 
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  AlertTriangle
} from 'lucide-react';
import { mockChildren, mockScanLogs } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Learners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const grades = ['all', ...Array.from(new Set(mockChildren.map(c => c.grade)))];
  
  const filteredChildren = mockChildren.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || child.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const getLastScan = (childId: string) => {
    const scans = mockScanLogs.filter(log => log.childId === childId);
    return scans.length > 0 ? scans[scans.length - 1] : null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-foreground">Learner Management</h1>
          <p className="text-muted-foreground font-nunito">
            Manage student profiles, QR codes, and safety information
          </p>
        </div>
        <Button className="bg-gradient-primary border-0">
          <Plus className="w-4 h-4 mr-2" />
          Add New Learner
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-inter text-primary">{mockChildren.length}</div>
            <div className="text-sm text-muted-foreground">Total Learners</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-inter text-success">
              {mockChildren.filter(c => c.allergies.length === 0).length}
            </div>
            <div className="text-sm text-muted-foreground">No Allergies</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-inter text-destructive">
              {mockChildren.filter(c => c.allergies.length > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">With Allergies</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-inter text-secondary">{grades.length - 1}</div>
            <div className="text-sm text-muted-foreground">Grade Levels</div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="shadow-card border-0">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or QR code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade === 'all' ? 'All Grades' : grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Learners List */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="font-poppins text-xl">Registered Learners</CardTitle>
          <CardDescription>
            {filteredChildren.length} learner{filteredChildren.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredChildren.map((child) => {
              const lastScan = getLastScan(child.id);
              return (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-poppins font-bold">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-poppins font-semibold text-lg">{child.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{child.grade} • Class {child.class}</span>
                        <Badge variant="outline" className="font-inter">
                          {child.qrCode}
                        </Badge>
                        {lastScan && (
                          <span className="text-xs">
                            Last seen: {new Date(lastScan.timestamp).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Allergies Warning */}
                    {child.allergies.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-xs text-destructive font-medium">
                          {child.allergies.length} allerg{child.allergies.length === 1 ? 'y' : 'ies'}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <QrCode className="w-4 h-4 mr-1" />
                        QR
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="w-4 h-4 mr-2" />
                            Generate QR
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};