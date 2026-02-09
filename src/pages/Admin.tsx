import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Save } from "lucide-react";
import PhotoUpload from "@/components/admin/PhotoUpload";
import MultiPhotoUpload from "@/components/admin/MultiPhotoUpload";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;
type FordModel = Tables<"ford_models">;
type ModelPhoto = Tables<"model_photos">;
type ServiceSection = Tables<"service_sections">;
type ServicePricing = Tables<"service_pricing">;

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [models, setModels] = useState<FordModel[]>([]);
  const [modelPhotos, setModelPhotos] = useState<ModelPhoto[]>([]);
  const [services, setServices] = useState<ServiceSection[]>([]);
  const [pricing, setPricing] = useState<ServicePricing[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/auth");
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/auth");
    });
    loadAll();
    return () => subscription.unsubscribe();
  }, []);

  const loadAll = async () => {
    const [p, m, mp, s, sp] = await Promise.all([
      supabase.from("products").select("*").order("sort_order"),
      supabase.from("ford_models").select("*").order("sort_order"),
      supabase.from("model_photos").select("*").order("sort_order"),
      supabase.from("service_sections").select("*").order("sort_order"),
      supabase.from("service_pricing").select("*").order("sort_order"),
    ]);
    if (p.data) setProducts(p.data);
    if (m.data) setModels(m.data);
    if (mp.data) setModelPhotos(mp.data);
    if (s.data) setServices(s.data);
    if (sp.data) setPricing(sp.data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const saveProduct = async (product: Product) => {
    const { error } = await supabase.from("products").upsert(product);
    if (error) { toast({ title: "Chyba", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Uloženo" });
    loadAll();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    loadAll();
  };

  const addProduct = async () => {
    const { error } = await supabase.from("products").insert({
      name: "Nový díl",
      price: "0 Kč",
      category: "Ostatní",
      sort_order: products.length,
    });
    if (!error) loadAll();
  };

  const addModel = async () => {
    const { error } = await supabase.from("ford_models").insert({
      name: "Nový model",
      years: "20XX - 20XX",
      sort_order: models.length,
    });
    if (!error) loadAll();
  };

  const deleteModel = async (id: string) => {
    await supabase.from("ford_models").delete().eq("id", id);
    loadAll();
  };

  const saveModel = async (model: FordModel) => {
    await supabase.from("ford_models").upsert(model);
    toast({ title: "Uloženo" });
  };

  const addModelPhoto = async (modelId: string, url: string) => {
    await supabase.from("model_photos").insert({ model_id: modelId, photo_url: url });
    loadAll();
  };

  const removeModelPhoto = async (_url: string, id?: string) => {
    if (id) await supabase.from("model_photos").delete().eq("id", id);
    loadAll();
  };

  const addService = async () => {
    const { error } = await supabase.from("service_sections").insert({
      title: "Nová služba",
      sort_order: services.length,
    });
    if (!error) loadAll();
  };

  const saveService = async (s: ServiceSection) => {
    await supabase.from("service_sections").upsert(s);
    toast({ title: "Uloženo" });
    loadAll();
  };

  const deleteService = async (id: string) => {
    await supabase.from("service_sections").delete().eq("id", id);
    loadAll();
  };

  const addPricing = async () => {
    await supabase.from("service_pricing").insert({ service: "Nová položka", price: "0 Kč", sort_order: pricing.length });
    loadAll();
  };

  const savePricing = async (p: ServicePricing) => {
    await supabase.from("service_pricing").upsert(p);
    toast({ title: "Uloženo" });
  };

  const deletePricing = async (id: string) => {
    await supabase.from("service_pricing").delete().eq("id", id);
    loadAll();
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateModel = (id: string, field: keyof FordModel, value: any) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const updateService = (id: string, field: keyof ServiceSection, value: any) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updatePricingItem = (id: string, field: keyof ServicePricing, value: any) => {
    setPricing(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border p-4 flex items-center justify-between">
        <h1 className="text-2xl font-display text-foreground">Administrace</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" /> Odhlásit
        </Button>
      </header>

      <div className="container px-4 py-8 max-w-5xl">
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Náhradní díly</TabsTrigger>
            <TabsTrigger value="models">Modely Ford</TabsTrigger>
            <TabsTrigger value="services">Servis</TabsTrigger>
            <TabsTrigger value="pricing">Ceník</TabsTrigger>
          </TabsList>

          {/* PRODUCTS */}
          <TabsContent value="products" className="space-y-4">
            <Button onClick={addProduct}><Plus className="h-4 w-4 mr-2" /> Přidat díl</Button>
            {products.map(product => (
              <div key={product.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Název</Label>
                    <Input value={product.name} onChange={e => updateProduct(product.id, "name", e.target.value)} />
                  </div>
                  <div>
                    <Label>Cena</Label>
                    <Input value={product.price} onChange={e => updateProduct(product.id, "price", e.target.value)} />
                  </div>
                  <div>
                    <Label>Kategorie</Label>
                    <Input value={product.category} onChange={e => updateProduct(product.id, "category", e.target.value)} />
                  </div>
                  <div>
                    <Label>Pro modely (čárkou)</Label>
                    <Input value={(product.for_models || []).join(", ")} onChange={e => updateProduct(product.id, "for_models", e.target.value.split(",").map(s => s.trim()))} />
                  </div>
                </div>
                <div>
                  <Label>Popis</Label>
                  <Textarea value={product.description || ""} onChange={e => updateProduct(product.id, "description", e.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={product.available ?? true} onCheckedChange={v => updateProduct(product.id, "available", v)} />
                  <Label>Dostupné</Label>
                </div>
                <div>
                  <Label>Fotka</Label>
                  <PhotoUpload
                    currentUrl={product.photo_url}
                    folder="products"
                    onUploaded={url => updateProduct(product.id, "photo_url", url)}
                    onRemoved={() => updateProduct(product.id, "photo_url", null)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveProduct(product)}><Save className="h-4 w-4 mr-1" /> Uložit</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteProduct(product.id)}><Trash2 className="h-4 w-4 mr-1" /> Smazat</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* MODELS */}
          <TabsContent value="models" className="space-y-4">
            <Button onClick={addModel}><Plus className="h-4 w-4 mr-2" /> Přidat model</Button>
            {models.map(model => (
              <div key={model.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Název</Label>
                    <Input value={model.name} onChange={e => updateModel(model.id, "name", e.target.value)} />
                  </div>
                  <div>
                    <Label>Roky</Label>
                    <Input value={model.years} onChange={e => updateModel(model.id, "years", e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Fotky</Label>
                  <MultiPhotoUpload
                    photos={modelPhotos.filter(p => p.model_id === model.id).map(p => ({ id: p.id, url: p.photo_url }))}
                    folder={`models/${model.id}`}
                    onAdded={url => addModelPhoto(model.id, url)}
                    onRemoved={removeModelPhoto}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveModel(model)}><Save className="h-4 w-4 mr-1" /> Uložit</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteModel(model.id)}><Trash2 className="h-4 w-4 mr-1" /> Smazat</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* SERVICES */}
          <TabsContent value="services" className="space-y-4">
            <Button onClick={addService}><Plus className="h-4 w-4 mr-2" /> Přidat službu</Button>
            {services.map(service => (
              <div key={service.id} className="border border-border rounded-lg p-4 space-y-3">
                <div>
                  <Label>Název</Label>
                  <Input value={service.title} onChange={e => updateService(service.id, "title", e.target.value)} />
                </div>
                <div>
                  <Label>Popis</Label>
                  <Textarea value={service.description || ""} onChange={e => updateService(service.id, "description", e.target.value)} />
                </div>
                <div>
                  <Label>Fotka</Label>
                  <PhotoUpload
                    currentUrl={service.photo_url}
                    folder="services"
                    onUploaded={url => updateService(service.id, "photo_url", url)}
                    onRemoved={() => updateService(service.id, "photo_url", null)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveService(service)}><Save className="h-4 w-4 mr-1" /> Uložit</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteService(service.id)}><Trash2 className="h-4 w-4 mr-1" /> Smazat</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* PRICING */}
          <TabsContent value="pricing" className="space-y-4">
            <Button onClick={addPricing}><Plus className="h-4 w-4 mr-2" /> Přidat položku</Button>
            {pricing.map(item => (
              <div key={item.id} className="border border-border rounded-lg p-4 flex gap-3 items-end">
                <div className="flex-1">
                  <Label>Služba</Label>
                  <Input value={item.service} onChange={e => updatePricingItem(item.id, "service", e.target.value)} />
                </div>
                <div className="w-40">
                  <Label>Cena</Label>
                  <Input value={item.price} onChange={e => updatePricingItem(item.id, "price", e.target.value)} />
                </div>
                <Button size="sm" onClick={() => savePricing(item)}><Save className="h-4 w-4" /></Button>
                <Button size="sm" variant="destructive" onClick={() => deletePricing(item.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
