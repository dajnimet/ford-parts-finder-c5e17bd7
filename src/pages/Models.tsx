import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ImagePlus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  const [lightbox, setLightbox] = useState<{ photos: ModelPhoto[]; index: number } | null>(null);

  const openLightbox = (modelPhotos: ModelPhoto[], index: number) => {
    setLightbox({ photos: modelPhotos, index });
  };

  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = useCallback((dir: number) => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + dir + lightbox.photos.length) % lightbox.photos.length;
    setLightbox({ ...lightbox, index: newIndex });
  }, [lightbox]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, navigateLightbox]);
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
                          {modelPhotos.map((photo, idx) => (
                            <div
                              key={photo.id}
                              className="aspect-square rounded-lg overflow-hidden bg-card border border-border cursor-pointer hover:border-primary/50 transition-colors"
                              onClick={() => openLightbox(modelPhotos, idx)}
                            >
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

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-background/95 backdrop-blur-sm border-border overflow-hidden [&>button]:hidden">
          {lightbox && (
            <div className="relative flex items-center justify-center w-full h-full">
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {lightbox.photos.length > 1 && (
                <>
                  <button
                    onClick={() => navigateLightbox(-1)}
                    className="absolute left-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => navigateLightbox(1)}
                    className="absolute right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <img
                src={lightbox.photos[lightbox.index].photo_url}
                alt="Fotografie modelu"
                className="max-w-full max-h-[85vh] object-contain"
              />

              {lightbox.photos.length > 1 && (
                <div className="absolute bottom-3 text-sm text-muted-foreground">
                  {lightbox.index + 1} / {lightbox.photos.length}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Models;
