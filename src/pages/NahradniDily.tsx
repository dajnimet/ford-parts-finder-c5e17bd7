import { Car, Settings, Cog, Battery, CircleDot, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const parts = [
  {
    icon: Settings,
    title: "Motory",
    description: "Kompletní motory i jednotlivé díly motorů Ford. Záruční i použité.",
  },
  {
    icon: Cog,
    title: "Převodovky",
    description: "Manuální i automatické převodovky pro všechny modely Ford.",
  },
  {
    icon: CircleDot,
    title: "Poloosy",
    description: "Přední i zadní poloosy, homokinetické klouby a manžety.",
  },
  {
    icon: Battery,
    title: "Startéry & Alternátory",
    description: "Elektrické komponenty - startéry, alternátory, kabely.",
  },
  {
    icon: Car,
    title: "Karosářské díly",
    description: "Blatníky, kapoty, dveře, nárazníky a další karosářské prvky.",
  },
  {
    icon: Wrench,
    title: "Další díly",
    description: "Brzdy, odpružení, řízení, osvětlení a mnoho dalšího.",
  },
];

const fordModels = [
  "Focus", "Fiesta", "Mondeo", "Transit", "Transit Connect", 
  "C-Max", "S-Max", "Galaxy", "Kuga", "Ranger", "Ka"
];

const NahradniDily = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">
              NÁHRADNÍ DÍLY FORD
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Široký sortiment nových i použitých náhradních dílů na osobní a dodávkové vozy Ford. 
              Kvalitní díly za rozumné ceny.
            </p>
          </div>
        </div>
      </section>

      {/* Parts Grid */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">
            CO NABÍZÍME
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parts.map((part, index) => (
              <div key={index} className="card-industrial group">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <part.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display mb-3 text-foreground">
                  {part.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {part.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ford Models */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-8 text-foreground">
            DÍLY PRO VŠECHNY MODELY FORD
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {fordModels.map((model) => (
              <span
                key={model}
                className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:border-primary/50 transition-colors"
              >
                Ford {model}
              </span>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            Nemáte v seznamu svůj model? Zavolejte nám - najdeme díly i na další modely Ford.
          </p>
        </div>
      </section>

      {/* Info */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="industrial-border">
              <h3 className="text-2xl font-display mb-4 text-foreground">
                Jak to funguje?
              </h3>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="text-primary font-display text-xl">01</span>
                  <span>Zavolejte nám nebo napište s popisem požadovaného dílu</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-display text-xl">02</span>
                  <span>Ověříme dostupnost a sdělíme vám cenu</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-display text-xl">03</span>
                  <span>Můžete si díl vyzvednout osobně nebo domluvíme dopravu</span>
                </li>
              </ol>
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
