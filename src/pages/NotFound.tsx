import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Baby, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-nunito">
      <Card className="max-w-md w-full shadow-card border-0 text-center">
        <CardContent className="p-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="font-poppins text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-poppins text-2xl font-semibold text-foreground mb-2">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="flex flex-col space-y-3">
            <Link to="/">
              <Button className="w-full bg-gradient-primary border-0">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                <Baby className="w-4 h-4 mr-2" />
                Parent Login
              </Button>
            </Link>
          </div>
          
          <p className="text-xs text-muted-foreground mt-6">
            Route: {location.pathname}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
