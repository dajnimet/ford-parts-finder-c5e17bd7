import { useState } from "react";
import { ShoppingCart, Phone, Mail, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// ============================================
// ZDE MŮŽETE PŘIDAT SVÉ PRODUKTY
// Stačí přidat nový objekt do pole "products"
// ============================================
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  forModels: string[];
  photo: string; // URL obrázku
  available: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Motor 1.6 TDCi",
    description: "Použitý motor Ford 1.6 TDCi 85kW. Najeto 150 000 km, plně funkční.",
    price: "25 000 Kč",
    category: "Motory",
    forModels: ["Focus", "C-Max", "Fiesta"],
    photo: "/placeholder.svg",
    available: true,
  },
  {
    id: 2,
    name: "Převodovka 6st manuál",
    description: "6stupňová manuální převodovka pro 2.0 TDCi. Dobrý stav.",
    price: "18 000 Kč",
    category: "Převodovky",
    forModels: ["Mondeo", "S-Max", "Galaxy"],
    photo: "/placeholder.svg",
    available: true,
  },
  {
    id: 3,
    name: "Přední nárazník Focus MK3",
    description: "Přední nárazník Ford Focus 2011-2014, černá barva.",
    price: "2 500 Kč",
    category: "Karoserie",
    forModels: ["Focus"],
    photo: "/placeholder.svg",
    available: true,
  },
  {
    id: 4,
    name: "Startér 1.8 TDCi",
    description: "Startér pro motory 1.8 TDCi. Repasovaný, záruka 6 měsíců.",
    price: "3 200 Kč",
    category: "Elektro",
    forModels: ["Focus", "C-Max", "Mondeo"],
    photo: "/placeholder.svg",
    available: true,
  },
  {
    id: 5,
    name: "Alternátor 150A",
    description: "Alternátor 150A pro 2.0 TDCi. Použitý, testovaný.",
    price: "4 500 Kč",
    category: "Elektro",
    forModels: ["Mondeo", "S-Max", "Kuga"],
    photo: "/placeholder.svg",
    available: false,
  },
  {
    id: 6,
    name: "Sada tlumičů přední",
    description: "Přední tlumiče pro Ford Fiesta MK7. Použité, dobrý stav.",
    price: "1 800 Kč",
    category: "Podvozek",
    forModels: ["Fiesta"],
    photo: "/placeholder.svg",
    available: true,
  },
];

const categories = ["Vše", "Motory", "Převodovky", "Karoserie", "Elektro", "Podvozek"];

const NahradniDily = () => {
  const [selectedCategory, setSelectedCategory] = useState("Vše");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = selectedCategory === "Vše" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Poptávka odeslána",
      description: "Ozveme se vám co nejdříve.",
    });
    setInquiryOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">
              NÁHRADNÍ DÍLY FORD
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Nové i použité náhradní díly na všechny modely Ford. 
              Vyberte si a pošlete nám poptávku.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +420 XXX XXX XXX
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@example.cz
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="aspect-square bg-secondary relative overflow-hidden">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.available && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="secondary">Nedostupné</Badge>
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3">{product.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg mb-1 text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {product.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pro: {product.forModels.join(", ")}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="text-xl font-display text-primary">{product.price}</span>
                  <Dialog open={inquiryOpen && selectedProduct?.id === product.id} onOpenChange={(open) => {
                    setInquiryOpen(open);
                    if (open) setSelectedProduct(product);
                  }}>
                    <DialogTrigger asChild>
                      <Button size="sm" disabled={!product.available}>
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Poptat
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Poptávka: {product.name}</DialogTitle>
                        <DialogDescription>
                          Vyplňte formulář a my se vám ozveme s dostupností a detaily.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleInquiry} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Jméno</Label>
                          <Input id="name" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefon</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" />
                        </div>
                        <div>
                          <Label htmlFor="message">Zpráva</Label>
                          <Textarea id="message" placeholder="Např. dotaz na stav dílu, možnost dovozu..." />
                        </div>
                        <Button type="submit" className="w-full">Odeslat poptávku</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              V této kategorii nejsou žádné produkty.
            </div>
          )}
        </div>
      </section>

      {/* Info Box */}
      <section className="py-12 bg-secondary/50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display mb-4 text-foreground">Nenašli jste co hledáte?</h2>
            <p className="text-muted-foreground mb-6">
              Máme mnohem více dílů na skladě. Zavolejte nám nebo napište - najdeme pro vás i díly, 
              které nejsou v katalogu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Zavolat
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Napsat email
              </Button>
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
