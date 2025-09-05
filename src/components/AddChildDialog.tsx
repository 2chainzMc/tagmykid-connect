import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddChildDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddChildDialog = ({ open, onOpenChange }: AddChildDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    grade: '',
    class: '',
    allergies: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Child Added Successfully",
      description: `${formData.name} has been added to your account.`,
    });
    onOpenChange(false);
    setFormData({ name: '', school: '', grade: '', class: '', allergies: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl border-border shadow-lg">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-primary text-center">Add a Child</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-medium text-foreground">Name & Surname</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="bg-foreground text-background rounded-xl h-12 text-base font-medium border-none"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="school" className="text-base font-medium text-foreground">School</Label>
            <Input
              id="school"
              value={formData.school}
              onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
              placeholder="Oakwood Elementary"
              className="bg-muted/30 border-border rounded-xl h-12 text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="grade" className="text-base font-medium text-foreground">Grade</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger className="bg-foreground text-background rounded-xl h-12 text-base font-medium border-none">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  <SelectItem value="R">Grade R</SelectItem>
                  <SelectItem value="1">Grade 1</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                  <SelectItem value="6">Grade 6</SelectItem>
                  <SelectItem value="7">Grade 7</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="class" className="text-base font-medium text-foreground">Class</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
                placeholder="A, B, C..."
                className="bg-foreground text-background rounded-xl h-12 text-base font-medium border-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="allergies" className="text-base font-medium text-foreground">Allergies (Optional)</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
              placeholder="List any allergies..."
              className="bg-muted/30 border-border rounded-xl text-base min-h-[100px]"
              rows={3}
            />
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
              className="px-8 py-3 rounded-xl font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary-light text-primary-foreground px-8 py-3 rounded-xl font-medium"
            >
              Save & Generate QR
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};