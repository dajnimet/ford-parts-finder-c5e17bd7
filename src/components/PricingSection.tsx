import { Check, Car, Truck, Recycle } from "lucide-react";

const pricingItems = [
  {
    icon: Recycle,
    title: "Ekologická likvidace",
    price: "ZDARMA",
    priceNote: "při odevzdání vozidla",
    features: [
      "Kompletní vyřízení papírů",
      "Potvrzení o ekologické likvidaci",
      "Osobní i nákladní vozidla",
      "Vyřazení z registru vozidel",
    ],
    highlighted: true,
  },
  {
    icon: Truck,
    title: "Odtahová služba",
    price: "od 1 500 Kč",
    priceNote: "dle vzdálenosti",
    features: [
      "Odtah nepojízdných vozidel",
      "Ostrava a okolí",
      "Rychlý výjezd",
      "Všechny typy vozidel",
    ],
    highlighted: false,
  },
  {
    icon: Car,
    title: "Výkup autovraků",
    price: "až 15 000 Kč",
    priceNote: "dle stavu vozidla",
    features: [
      "Výkup všech značek",
      "Hotovostní platba na místě",
      "Férové ocenění",
      "Odvoz zdarma",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-gradient mb-4">
            CENÍK SLUŽEB
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Transparentní ceny bez skrytých poplatků
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingItems.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-lg p-8 transition-all duration-300 ${
                item.highlighted
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {item.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Nejoblíbenější
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  item.highlighted ? "bg-primary/20" : "bg-primary/10"
                }`}>
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display text-foreground mb-2">
                  {item.title}
                </h3>
                <div className="text-3xl font-display text-primary">
                  {item.price}
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  {item.priceNote}
                </p>
              </div>

              <ul className="space-y-3">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Přesnou cenu stanovíme po prohlídce vozidla. 
            <a href="tel:+420603766719" className="text-primary hover:underline ml-1">
              Zavolejte nám
            </a>
            {" "}pro nezávaznou nabídku.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
