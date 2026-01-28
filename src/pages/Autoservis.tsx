import { Wrench, Car, Settings, ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const services = [
  {
    icon: Settings,
    title: "Opravy motorů",
    description: "Diagnostika a opravy motorů Ford. Výměna rozvodů, těsnění hlavy, opravy turbodmychadel.",
  },
  {
    icon: Wrench,
    title: "Opravy podvozku",
    description: "Výměna tlumičů, ramen, čepů, silentbloků a dalších komponent podvozku.",
  },
  {
    icon: Car,
    title: "Brzdový systém",
    description: "Výměna brzdových destiček, kotoučů, brzdových hadic a kapalin.",
  },
  {
    icon: ShieldCheck,
    title: "Servisní prohlídky",
    description: "Pravidelné servisní prohlídky, výměna olejů a filtrů.",
  },
  {
    icon: Clock,
    title: "Diagnostika",
    description: "Počítačová diagnostika závad s moderním vybavením pro vozy Ford.",
  },
  {
    icon: ThumbsUp,
    title: "Drobné opravy",
    description: "Výměna žárovek, stěračů, pojistek a další drobné opravy.",
  },
];

const advantages = [
  "Specializace na vozy Ford",
  "Zkušení mechanici",
  "Originální i alternativní díly",
  "Rychlé opravy",
  "Férové ceny",
  "Osobní přístup",
];

const Autoservis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">
              AUTOSERVIS
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Kompletní servisní služby pro váš automobil. Specializujeme se na vozy Ford, 
              ale opravíme i jiné značky.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">
            NAŠE SLUŽBY
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card-industrial group">
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

      {/* Advantages */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">
            PROČ K NÁM?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-foreground">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-6 text-foreground">
              CENÍK
            </h2>
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-4xl font-display text-primary mb-2">
                od 450 Kč/hod
              </p>
              <p className="text-muted-foreground mb-6">
                Hodinová sazba práce
              </p>
              <p className="text-muted-foreground text-sm">
                Přesnou cenu opravy vám sdělíme po diagnostice vozidla. 
                Vždy vás informujeme o rozsahu a ceně opravy předem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Autoservis;
