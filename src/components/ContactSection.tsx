import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const openingHours = [
    { day: "Pondělí", hours: "8:00–12:00, 12:30–16:00" },
    { day: "Úterý", hours: "8:00–12:00, 12:30–16:00" },
    { day: "Středa", hours: "8:00–12:00, 12:30–16:00" },
    { day: "Čtvrtek", hours: "8:00–12:00, 12:30–16:00" },
    { day: "Pátek", hours: "8:00–12:00, 12:30–15:00" },
    { day: "Sobota", hours: "Zavřeno" },
    { day: "Neděle", hours: "Zavřeno" },
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-gradient mb-4">
            KONTAKT
          </h2>
          <p className="text-muted-foreground text-lg">
            Jsme tu pro vás
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-industrial">
              <h3 className="text-2xl font-display mb-6 text-foreground">
                Kontaktní údaje
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adresa</p>
                    <p className="text-muted-foreground">Antošovická, 711 00 Ostrava</p>
                    <p className="text-muted-foreground text-sm">V areálu bývalého dolu Koblov</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Telefon</p>
                    <a href="tel:+420603766719" className="text-primary hover:underline block">+420 603 766 719</a>
                    <a href="tel:+420777186020" className="text-primary hover:underline block">+420 777 186 020</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">E-mail</p>
                    <a href="mailto:macha.david@seznam.cz" className="text-primary hover:underline">
                      macha.david@seznam.cz
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">IČO: 66947049</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="card-industrial">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-display text-foreground">
                Otevírací doba
              </h3>
            </div>
            
            <div className="space-y-3">
              {openingHours.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between py-3 border-b border-border last:border-0 ${
                    item.hours === "Zavřeno" ? "text-muted-foreground" : ""
                  }`}
                >
                  <span className="font-medium">{item.day}</span>
                  <span className={item.hours === "Zavřeno" ? "text-muted-foreground" : "text-primary"}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 rounded-lg overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.5!2d18.3069!3d49.8719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711d6b1c0c0c0c0%3A0x0!2sAnto%C5%A1ovick%C3%A1%2C%20711%2000%20Ostrava!5e0!3m2!1scs!2scz!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa - VRAK FORD"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
