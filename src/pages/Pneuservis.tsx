import { CircleDot, RefreshCw, Wrench, Check, Clock, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const services = [
  {
    icon: RefreshCw,
    title: "Přezutí pneumatik",
    description: "Sezónní přezutí letních a zimních pneumatik pro osobní i dodávkové vozy.",
  },
  {
    icon: CircleDot,
    title: "Opravy defektů",
    description: "Opravy propíchnutých pneumatik, záplaty a vulkanizace.",
  },
  {
    icon: Wrench,
    title: "Výměna ventilků",
    description: "Výměna ventilků a kontrola těsnosti pneumatik.",
  },
  {
    icon: Check,
    title: "Vyvažování kol",
    description: "Profesionální vyvážení kol pro klidnou a bezpečnou jízdu.",
  },
];

const pricing = [
  { service: "Přezutí 4 kol (osobní vůz)", price: "od 400 Kč" },
  { service: "Přezutí 4 kol (SUV/dodávka)", price: "od 500 Kč" },
  { service: "Vyvážení 1 kola", price: "od 80 Kč" },
  { service: "Oprava defektu", price: "od 150 Kč" },
  { service: "Výměna ventilku", price: "od 30 Kč" },
];

const Pneuservis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">
              PNEUSERVIS
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Profesionální péče o vaše pneumatiky. Přezutí, vyvažování, opravy defektů 
              a další služby.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Pricing */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">
            CENÍK PNEUSERVISU
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {pricing.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-4 ${
                    index !== pricing.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-foreground">{item.service}</span>
                  <span className="text-primary font-display text-lg">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm">
              Ceny jsou orientační a mohou se lišit dle typu a rozměru pneumatik.
            </p>
          </div>
        </div>
      </section>

      {/* Season Info */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-display text-foreground">Kdy přezout?</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Zimní pneumatiky: říjen - listopad</li>
                  <li>• Letní pneumatiky: březen - duben</li>
                  <li>• Při teplotě pod 7°C zimní</li>
                  <li>• Při teplotě nad 7°C letní</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-display text-foreground">Tip</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Objednávejte se včas! V sezoně přezouvání bývá velký nápor. 
                  Zavolejte nám a domluvíme termín, který vám vyhovuje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Pneuservis;
