import { Plus, ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

// ============================================
// ZDE MŮŽETE UPRAVIT OBSAH SERVISU
// Přidávejte služby, fotky a texty podle potřeby
// ============================================

interface ServiceItem {
  title: string;
  description: string;
  photos: string[]; // URL obrázků
}

interface ServiceSection {
  name: string;
  intro: string;
  services: ServiceItem[];
  priceInfo?: string;
}

const serviceSections: ServiceSection[] = [
  {
    name: "Autoservis",
    intro: "Kompletní servisní služby pro váš automobil. Specializujeme se na vozy Ford, ale opravíme i jiné značky.",
    services: [
      {
        title: "Opravy motorů",
        description: "Diagnostika a opravy motorů Ford. Výměna rozvodů, těsnění hlavy, opravy turbodmychadel.",
        photos: ["/placeholder.svg"],
      },
      {
        title: "Opravy podvozku",
        description: "Výměna tlumičů, ramen, čepů, silentbloků a dalších komponent podvozku.",
        photos: [],
      },
      {
        title: "Brzdový systém",
        description: "Výměna brzdových destiček, kotoučů, brzdových hadic a kapalin.",
        photos: [],
      },
      {
        title: "Diagnostika",
        description: "Počítačová diagnostika závad s moderním vybavením pro vozy Ford.",
        photos: [],
      },
    ],
    priceInfo: "Hodinová sazba od 450 Kč/hod",
  },
  {
    name: "Pneuservis",
    intro: "Profesionální péče o vaše pneumatiky. Přezutí, vyvažování, opravy defektů a další služby.",
    services: [
      {
        title: "Přezutí pneumatik",
        description: "Sezónní přezutí letních a zimních pneumatik pro osobní i dodávkové vozy.",
        photos: [],
      },
      {
        title: "Vyvažování kol",
        description: "Profesionální vyvážení kol pro klidnou a bezpečnou jízdu.",
        photos: [],
      },
      {
        title: "Opravy defektů",
        description: "Opravy propíchnutých pneumatik, záplaty a vulkanizace.",
        photos: [],
      },
      {
        title: "Výměna ventilků",
        description: "Výměna ventilků a kontrola těsnosti pneumatik.",
        photos: [],
      },
    ],
    priceInfo: "Přezutí 4 kol od 400 Kč | Vyvážení kola od 80 Kč",
  },
];

// ============================================
// CENÍK - upravte ceny podle potřeby
// ============================================
const pricing = [
  { category: "Autoservis", items: [
    { service: "Hodinová sazba práce", price: "od 450 Kč" },
    { service: "Diagnostika", price: "od 300 Kč" },
    { service: "Výměna oleje + filtr", price: "od 800 Kč" },
  ]},
  { category: "Pneuservis", items: [
    { service: "Přezutí 4 kol (osobní)", price: "od 400 Kč" },
    { service: "Přezutí 4 kol (SUV/dodávka)", price: "od 500 Kč" },
    { service: "Vyvážení 1 kola", price: "od 80 Kč" },
    { service: "Oprava defektu", price: "od 150 Kč" },
  ]},
];

const Servis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">
              SERVIS
            </h1>
            <p className="text-xl text-muted-foreground">
              Autoservis a pneuservis na jednom místě. Kvalitní služby za férové ceny.
            </p>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {serviceSections.map((section, sectionIndex) => (
        <section 
          key={section.name} 
          className={`py-16 ${sectionIndex % 2 === 1 ? "bg-secondary/50" : ""}`}
        >
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display text-center mb-4 text-foreground">
                {section.name.toUpperCase()}
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                {section.intro}
              </p>
              
              {section.priceInfo && (
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-display">
                    {section.priceInfo}
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {section.services.map((service, index) => (
                  <div key={index} className="card-industrial">
                    <h3 className="text-xl font-display mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {/* Photos Grid */}
                    {service.photos.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {service.photos.map((photo, photoIndex) => (
                          <div 
                            key={photoIndex} 
                            className="aspect-square rounded-lg overflow-hidden bg-secondary"
                          >
                            <img 
                              src={photo} 
                              alt={`${service.title} ${photoIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ImageIcon className="w-4 h-4" />
                        <span>Přidejte fotky do pole "photos" v kódu</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Table */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">
            CENÍK
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {pricing.map((category) => (
              <div key={category.category} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-4">
                  <h3 className="font-display text-lg text-foreground">{category.category}</h3>
                </div>
                <div>
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-4 ${
                        index !== category.items.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <span className="text-foreground">{item.service}</span>
                      <span className="text-primary font-display">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Ceny jsou orientační. Přesnou cenu opravy vám sdělíme po diagnostice vozidla.
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">
            PROČ K NÁM?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              "Specializace na Ford",
              "Zkušení mechanici",
              "Férové ceny",
              "Rychlé opravy",
              "Originální i alternativní díly",
              "Osobní přístup",
            ].map((advantage, index) => (
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

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Servis;
