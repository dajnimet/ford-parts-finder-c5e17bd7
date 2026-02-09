import { useState, useEffect } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

const NahradniDily = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Vše"]);
  const [selectedCategory, setSelectedCategory] = useState("Vše");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("products").select("*").order("sort_order").then(({ data }) => {
      if (data) {
        setProducts(data);
        const cats = ["Vše", ...Array.from(new Set(data.map(p => p.category)))];
        setCategories(cats);
      }
    });
  }, []);

  const filteredProducts = selectedCategory === "Vše"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Poptávka odeslána", description: "Ozveme se vám co nejdříve." });
    setInquiryOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">NÁHRADNÍ DÍLY FORD</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Nové i použité náhradní díly na všechny modely Ford. Vyberte si a pošlete nám poptávku.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" />+420 603 766 719</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" />info@example.cz</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)}>
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="aspect-square bg-secondary relative overflow-hidden">
                  <img src={product.photo_url || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {!product.available && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="secondary">Nedostupné</Badge>
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3">{product.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg mb-1 text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                  <p className="text-xs text-muted-foreground">Pro: {(product.for_models || []).join(", ")}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="text-xl font-display text-primary">{product.price}</span>
                  <Dialog open={inquiryOpen && selectedProduct?.id === product.id} onOpenChange={(open) => { setInquiryOpen(open); if (open) setSelectedProduct(product); }}>
                    <DialogTrigger asChild>
                      <Button size="sm" disabled={!product.available}><MessageCircle className="w-4 h-4 mr-1" />Poptat</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Poptávka: {product.name}</DialogTitle>
                        <DialogDescription>Vyplňte formulář a my se vám ozveme.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleInquiry} className="space-y-4">
                        <div><Label htmlFor="name">Jméno</Label><Input id="name" required /></div>
                        <div><Label htmlFor="phone">Telefon</Label><Input id="phone" type="tel" required /></div>
                        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" /></div>
                        <div><Label htmlFor="message">Zpráva</Label><Textarea id="message" placeholder="Dotaz na stav dílu..." /></div>
                        <Button type="submit" className="w-full">Odeslat poptávku</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">V této kategorii nejsou žádné produkty.</div>
          )}
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display mb-4 text-foreground">Nenašli jste co hledáte?</h2>
            <p className="text-muted-foreground mb-6">Máme mnohem více dílů na skladě. Zavolejte nám nebo napište.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg"><Phone className="w-4 h-4 mr-2" />Zavolat</Button>
              <Button size="lg" variant="outline"><Mail className="w-4 h-4 mr-2" />Napsat email</Button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default NahradniDily;
