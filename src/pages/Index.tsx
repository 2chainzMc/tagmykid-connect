import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Baby, 
  GraduationCap, 
  Shield, 
  QrCode, 
  ShoppingCart,
  Users,
  Heart,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary text-white font-nunito">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-poppins font-bold text-2xl">TagMyKid</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white/80 hover:text-white transition-colors">
                Parent Login
              </Link>
              <Link to="/login?admin=true">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  School Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins text-5xl md:text-6xl font-bold mb-6">
              Keep Your Child
              <span className="block text-secondary">Safe & Connected</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              TagMyKid connects parents and schools through smart QR technology, 
              making child safety and school communication effortless.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg">
                  <Baby className="w-5 h-5 mr-2" />
                  Get Started - Parents
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login?admin=true">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  School Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white text-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="font-poppins text-4xl font-bold mb-4">Everything Your Family Needs</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From safety tracking to school shopping, TagMyKid brings modern technology to child care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card border-0 text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-poppins font-bold text-xl mb-3">Smart QR Codes</h4>
                <p className="text-muted-foreground">
                  Each child gets a unique QR code for instant identification, 
                  emergency contacts, and medical information access.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-poppins font-bold text-xl mb-3">School Store</h4>
                <p className="text-muted-foreground">
                  Shop for uniforms, supplies, and lunch directly through the app. 
                  Everything delivered to your child's classroom.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-poppins font-bold text-xl mb-3">Safety First</h4>
                <p className="text-muted-foreground">
                  Real-time notifications, allergy alerts, and emergency information 
                  keep your child safe throughout the school day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-poppins text-4xl font-bold text-primary mb-2">1,247</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="font-poppins text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground">Partner Schools</div>
            </div>
            <div>
              <div className="font-poppins text-4xl font-bold text-success mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="font-poppins text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-warm text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h3 className="font-poppins text-4xl font-bold mb-4">
              Ready to Keep Your Child Safe?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of families already using TagMyKid to stay connected with their children's school experience.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-white/70 mt-4">R50/month • Cancel anytime • No setup fees</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Baby className="w-5 h-5 text-white" />
              </div>
              <span className="font-poppins font-bold text-xl">TagMyKid</span>
            </div>
            <div className="text-sm text-white/70">
              © 2024 TagMyKid. Making schools safer, one child at a time.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
