import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary/20 rotate-45" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-primary/10 rotate-12" />
      
      <div className="container relative z-10 text-center px-4">
        <div className="mb-6">
          <span className="text-primary text-lg font-medium tracking-widest uppercase">
            Ostrava - Koblov
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-gradient mb-6">
          VRAK FORD
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Náhradní díly Ford • Ekologická likvidace • Odtah vraků • Autoservis
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="gap-2 text-lg px-8">
            <Phone className="w-5 h-5" />
            +420 603 766 719
          </Button>
          <Button variant="outline" size="lg" className="gap-2 text-lg px-8">
            <MapPin className="w-5 h-5" />
            Jak se k nám dostat
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
