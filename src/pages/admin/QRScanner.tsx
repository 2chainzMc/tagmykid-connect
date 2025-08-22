import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ScanLine, 
  Camera,
  Search, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  User,
  MapPin
} from 'lucide-react';
import { mockChildren, mockScanLogs } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const QRScanner = () => {
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const { toast } = useToast();

  const handleScan = () => {
    setScanning(true);
    
    // Simulate scan delay
    setTimeout(() => {
      const child = mockChildren.find(c => 
        c.qrCode.toLowerCase() === scanInput.toLowerCase() ||
        c.id === scanInput
      );
      
      if (child) {
        setScanResult({
          success: true,
          child,
          timestamp: new Date().toISOString(),
        });
        toast({
          title: "Learner found!",
          description: `${child.name} has been scanned successfully.`,
        });
      } else {
        setScanResult({
          success: false,
          error: 'QR code not found in database'
        });
        toast({
          title: "Scan failed",
          description: "QR code not recognized.",
          variant: "destructive",
        });
      }
      setScanning(false);
    }, 1500);
  };

  const handleQuickScan = (qrCode: string) => {
    setScanInput(qrCode);
    setTimeout(handleScan, 100);
  };

  const recentScans = mockScanLogs.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-poppins text-3xl font-bold text-foreground">QR Code Scanner</h1>
        <p className="text-muted-foreground font-nunito">
          Scan learner QR codes for attendance, lost & found, or safety checks
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Scanner */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="font-poppins text-xl flex items-center">
              <ScanLine className="w-5 h-5 mr-2" />
              Scan QR Code
            </CardTitle>
            <CardDescription>
              Use camera or enter QR code manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Camera Scanner Placeholder */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera scanner would appear here</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Camera className="w-4 h-4 mr-1" />
                  Enable Camera
                </Button>
              </div>
            </div>

            {/* Manual Input */}
            <div className="space-y-2">
              <Label htmlFor="qr-input">Or enter QR code manually</Label>
              <div className="flex space-x-2">
                <Input
                  id="qr-input"
                  placeholder="TMK001, TMK002, etc."
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                />
                <Button 
                  onClick={handleScan}
                  disabled={!scanInput || scanning}
                  className="bg-gradient-primary border-0"
                >
                  {scanning ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Quick Scan Buttons */}
            <div className="space-y-2">
              <Label>Quick Test Scans</Label>
              <div className="grid grid-cols-2 gap-2">
                {mockChildren.slice(0, 4).map((child) => (
                  <Button
                    key={child.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickScan(child.qrCode)}
                    className="text-xs"
                  >
                    {child.qrCode}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan Result & Recent Scans */}
        <div className="space-y-6">
          {/* Scan Result */}
          {scanResult && (
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="font-poppins text-xl flex items-center">
                  {scanResult.success ? (
                    <CheckCircle className="w-5 h-5 mr-2 text-success" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                  )}
                  Scan Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scanResult.success ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-poppins font-bold text-xl">
                        {scanResult.child.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-poppins font-bold text-xl">{scanResult.child.name}</h3>
                        <p className="text-muted-foreground">{scanResult.child.grade} • Class {scanResult.child.class}</p>
                        <Badge variant="outline" className="mt-1">
                          {scanResult.child.qrCode}
                        </Badge>
                      </div>
                    </div>

                    {scanResult.child.allergies.length > 0 && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Allergies:</strong> {scanResult.child.allergies.join(', ')}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-gradient-primary border-0">
                        Mark Present
                      </Button>
                      <Button variant="outline" size="sm">
                        Lost & Found
                      </Button>
                      <Button variant="outline" size="sm">
                        Emergency
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {scanResult.error}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recent Scans */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="font-poppins text-xl flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentScans.map((scan) => {
                  const child = mockChildren.find(c => c.id === scan.childId);
                  return (
                    <div key={scan.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium font-nunito text-sm">
                            {child?.name || `Child #${scan.childId}`}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{scan.location}</span>
                            <span>•</span>
                            <span>{scan.scannedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {scan.reason}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(scan.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};