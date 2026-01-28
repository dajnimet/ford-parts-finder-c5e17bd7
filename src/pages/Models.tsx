import { useState } from "react";
import { ChevronDown, ImagePlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ModelData {
  name: string;
  years: string;
  photos: string[];
}

const fordModels: ModelData[] = [
  {
    name: "Ford Focus",
    years: "1998 - 2018",
    photos: [],
  },
  {
    name: "Ford Fiesta",
    years: "1976 - 2023",
    photos: [],
  },
  {
    name: "Ford Mondeo",
    years: "1993 - 2022",
    photos: [],
  },
  {
    name: "Ford Transit",
    years: "1965 - současnost",
    photos: [],
  },
  {
    name: "Ford Transit Connect",
    years: "2002 - současnost",
    photos: [],
  },
  {
    name: "Ford C-Max",
    years: "2003 - 2019",
    photos: [],
  },
  {
    name: "Ford S-Max",
    years: "2006 - 2023",
    photos: [],
  },
  {
    name: "Ford Galaxy",
    years: "1995 - 2023",
    photos: [],
  },
  {
    name: "Ford Kuga",
    years: "2008 - současnost",
    photos: [],
  },
  {
    name: "Ford Ranger",
    years: "1983 - současnost",
    photos: [],
  },
  {
    name: "Ford Ka",
    years: "1996 - 2016",
    photos: [],
  },
  {
    name: "Ford Escort",
    years: "1968 - 2003",
    photos: [],
  },
];

const Models = () => {
  const [openModels, setOpenModels] = useState<string[]>([]);

  const toggleModel = (modelName: string) => {
    setOpenModels((prev) =>
      prev.includes(modelName)
        ? prev.filter((name) => name !== modelName)
        : [...prev, modelName]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">
              MODELY FORD
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Prohlédněte si všechny modely Ford, na které máme náhradní díly.
              Klikněte na model pro zobrazení fotografií.
            </p>
          </div>
        </div>
      </section>

      {/* Models List */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {fordModels.map((model) => (
              <Collapsible
                key={model.name}
                open={openModels.includes(model.name)}
                onOpenChange={() => toggleModel(model.name)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="text-left">
                      <h3 className="text-2xl font-display text-foreground">
                        {model.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {model.years}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-primary transition-transform duration-200 ${
                        openModels.includes(model.name) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 p-6 bg-secondary/30 border border-border rounded-lg">
                    {model.photos.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {model.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden bg-card border border-border"
                          >
                            <img
                              src={photo}
                              alt={`${model.name} - foto ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <ImagePlus className="w-16 h-16 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground mb-2">
                          Zatím zde nejsou žádné fotografie
                        </p>
                        <p className="text-muted-foreground/70 text-sm">
                          Pro přidání fotek upravte pole "photos" v kódu stránky
                        </p>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display mb-4 text-foreground">
              Hledáte konkrétní díl?
            </h2>
            <p className="text-muted-foreground mb-6">
              Zavolejte nám a sdělte nám, jaký díl potřebujete. Ověříme
              dostupnost a připravíme vám nabídku.
            </p>
            <a
              href="tel:+420603766719"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              +420 603 766 719
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Models;
