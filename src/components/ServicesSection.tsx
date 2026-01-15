import { Wrench, Car, Truck, Settings } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Náhradní díly Ford",
    description: "Nové i použité díly na osobní a dodávkové vozy Ford. Motory, převodovky, poloosy, startéry, alternátory.",
  },
  {
    icon: Truck,
    title: "Ekologická likvidace",
    description: "Kompletní vyřízení ekologické likvidace vozidel všech značek - osobní, nákladní i stroje.",
  },
  {
    icon: Settings,
    title: "Výkup autovraků",
    description: "Odtah a výkup autovraků všech značek. Rychlé a férové jednání.",
  },
  {
    icon: Wrench,
    title: "Autoservis & Pneuservis",
    description: "Kompletní servisní služby pro váš automobil včetně přezutí pneumatik.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-gradient mb-4">
            NAŠE SLUŽBY
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Komplexní služby v oblasti autodílů a likvidace vozidel
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-industrial group"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
