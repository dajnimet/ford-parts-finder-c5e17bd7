import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type ServiceSection = Tables<"service_sections">;
type ServicePricing = Tables<"service_pricing">;

const Servis = () => {
  const [services, setServices] = useState<ServiceSection[]>([]);
  const [pricing, setPricing] = useState<ServicePricing[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("service_sections").select("*").order("sort_order"),
      supabase.from("service_pricing").select("*").order("sort_order"),
    ]).then(([s, p]) => {
      if (s.data) setServices(s.data);
      if (p.data) setPricing(p.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-gradient mb-6">SERVIS</h1>
            <p className="text-xl text-muted-foreground">Autoservis a pneuservis na jednom místě.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="card-industrial">
                {service.photo_url && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-secondary mb-4">
                    <img src={service.photo_url} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <h3 className="text-xl font-display mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          {services.length === 0 && (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
              <ImageIcon className="w-12 h-12 mb-2" />
              <p>Zatím nejsou přidány žádné služby.</p>
            </div>
          )}
        </div>
      </section>

      {pricing.length > 0 && (
        <section className="py-16 bg-secondary/50">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">CENÍK</h2>
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg overflow-hidden">
              {pricing.map((item, index) => (
                <div key={item.id} className={`flex justify-between items-center p-4 ${index !== pricing.length - 1 ? "border-b border-border" : ""}`}>
                  <span className="text-foreground">{item.service}</span>
                  <span className="text-primary font-display">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm">Ceny jsou orientační.</p>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-foreground">PROČ K NÁM?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {["Specializace na Ford", "Zkušení mechanici", "Férové ceny", "Rychlé opravy", "Originální i alternativní díly", "Osobní přístup"].map((adv, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-foreground">{adv}</span>
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
