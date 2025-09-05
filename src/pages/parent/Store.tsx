import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Store = () => {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  const categories = [
    {
      id: 'tagmykid-store',
      name: 'TagMyKid Store',
      description: 'Purchase consumables for your tagmykid solution.',
      products: [
        {
          id: '1',
          name: 'Mini Thermal Printer',
          description: 'Portable Bluetooth printer for tags.',
          price: 49.99
        },
        {
          id: '2', 
          name: 'Thermal Paper Rolls (5-pack)',
          description: 'High-quality replacement rolls.',
          price: 12.99
        },
        {
          id: '3',
          name: 'QR Sticker Sheets (100-pack)', 
          description: 'Durable, waterproof sticker sheets.',
          price: 9.99
        }
      ]
    },
    {
      id: 'school-shop',
      name: 'School Shop',
      description: 'Official merchandise and supplies from Oakwood Elementary.',
      products: []
    },
    {
      id: '2nd-hand-shop',
      name: '2nd Hand Shop',
      description: 'Buy and sell used items within the Oakwood Elementary community.',
      products: []
    }
  ];

  const handleAddToCart = (product: any) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Input 
          placeholder="Search for products..." 
          className="max-w-2xl bg-foreground text-background rounded-xl h-14 text-lg px-6 font-medium border-none placeholder:text-background/60"
        />
      </div>

      {categories.map(category => (
        <div key={category.id} className="space-y-6">
          <div className="bg-white rounded-xl shadow-card p-8 border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-3">{category.name}</h2>
            <div className="h-1 w-24 bg-primary rounded-full mb-4"></div>
            <p className="text-muted-foreground text-lg">{category.description}</p>
          </div>

          {category.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.products.map(product => (
                <Card key={product.id} className="shadow-card hover:shadow-lg transition-all duration-200 border-border group">
                  <CardContent className="p-6">
                    <div className="bg-muted/20 rounded-xl h-56 flex items-center justify-center mb-6 group-hover:bg-muted/30 transition-colors">
                      <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-destructive">R{product.price.toFixed(2)}</span>
                      <Button 
                        className="bg-primary hover:bg-primary-light text-primary-foreground font-medium px-6 py-2 rounded-lg"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-card p-12 text-center border border-border">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                {category.id === 'school-shop' 
                  ? 'The Oakwood Elementary school shop is not yet available online. Please check back soon.'
                  : 'The 2nd hand shop for Oakwood Elementary is coming soon!'
                }
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};