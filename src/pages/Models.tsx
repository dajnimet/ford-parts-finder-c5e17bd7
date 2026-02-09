import { useState, useEffect } from "react";
import { ChevronDown, ImagePlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type FordModel = Tables<"ford_models">;
type ModelPhoto = Tables<"model_photos">;

const Models = () => {
  const [models, setModels] = useState<FordModel[]>([]);
  const [photos, setPhotos] = useState<ModelPhoto[]>([]);
  const [openModels, setOpenModels] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("ford_models").select("*").order("sort_order"),
      supabase.from("model_photos").select("*").order("sort_order"),
    ]).then(([m, p]) => {
      if (m.data) setModels(m.data);
      if (p.data) setPhotos(p.data);
    });
  }, []);

  const toggleModel = (id: string) => {
    setOpenModels(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">MODELY FORD</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Prohlédněte si všechny modely Ford, na které máme náhradní díly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {models.map((model) => {
              const modelPhotos = photos.filter(p => p.model_id === model.id);
              return (
                <Collapsible key={model.id} open={openModels.includes(model.id)} onOpenChange={() => toggleModel(model.id)}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-2xl font-display text-foreground">{model.name}</h3>
                        <p className="text-muted-foreground text-sm">{model.years}</p>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-200 ${openModels.includes(model.id) ? "rotate-180" : ""}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 p-6 bg-secondary/30 border border-border rounded-lg">
                      {modelPhotos.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {modelPhotos.map((photo) => (
                            <div key={photo.id} className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
                              <img src={photo.photo_url} alt={model.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <ImagePlus className="w-16 h-16 text-muted-foreground/50 mb-4" />
                          <p className="text-muted-foreground">Zatím zde nejsou žádné fotografie</p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display mb-4 text-foreground">Hledáte konkrétní díl?</h2>
            <p className="text-muted-foreground mb-6">Zavolejte nám a sdělte nám, jaký díl potřebujete.</p>
            <a href="tel:+420603766719" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
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
