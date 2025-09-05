import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, StopCircle } from 'lucide-react';

export const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualId, setManualId] = useState('');

  const handleStartScan = () => {
    setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleFindItem = () => {
    // Handle manual ID search
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-card p-8 border border-border">
        <h1 className="text-4xl font-bold text-foreground mb-3">Find a Lost Item</h1>
        <div className="h-1 w-24 bg-primary rounded-full"></div>
      </div>

      <Card className="shadow-card border-border">
        <CardContent className="p-8">
          {!isScanning ? (
            <div className="space-y-8">
              <Button 
                onClick={handleStartScan}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground rounded-xl h-16 text-lg font-medium"
              >
                <Camera className="w-6 h-6 mr-3" />
                Scan with Camera
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground text-lg mb-6">OR</p>
                <p className="text-foreground text-base mb-4">Enter the unique ID manually</p>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <Input
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="e.g. tmk-abc123d..."
                    className="bg-muted/30 border-border rounded-xl h-12 text-base text-center"
                  />
                  <Button 
                    onClick={handleFindItem}
                    variant="secondary"
                    className="w-full rounded-xl h-12 text-base font-medium"
                  >
                    Find Item
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary/80"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-center">
              <div className="bg-foreground rounded-xl h-80 flex items-center justify-center">
                <div className="text-background text-lg">Camera view will appear here</div>
              </div>
              
              <Button 
                onClick={handleStopScan}
                variant="destructive"
                className="w-full rounded-xl h-16 text-lg font-medium"
              >
                <StopCircle className="w-6 h-6 mr-3" />
                Stop Scanning
              </Button>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary/80"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};