import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Filter, Star, Package } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart.",
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-foreground">School Store</h1>
          <p className="text-muted-foreground font-nunito">
            Shop for school supplies, uniforms, and more
          </p>
        </div>
        <Button className="bg-gradient-primary border-0 relative">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 py-0 text-xs bg-secondary text-secondary-foreground rounded-full flex items-center justify-center">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Search & Filter */}
      <Card className="shadow-card border-0">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-card border-0 hover:shadow-soft transition-shadow">
              <div className="aspect-square bg-muted rounded-t-lg relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Package className="w-16 h-16 text-muted-foreground" />
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="font-poppins text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">{product.category}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-secondary fill-current" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold font-inter text-primary">
                      R{product.price}
                    </p>
                  </div>
                  <Button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    size="sm"
                    className="bg-gradient-primary border-0"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-card border-0">
          <CardContent className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-poppins font-semibold text-xl mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info Banner */}
      <Card className="shadow-card border-0 bg-gradient-warm text-white">
        <CardContent className="p-6 text-center">
          <h3 className="font-poppins font-bold text-xl mb-2">Free Delivery on Orders Over R200!</h3>
          <p className="text-white/90">
            Shop now and get your school supplies delivered directly to your child's classroom.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};