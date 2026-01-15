const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl text-gradient">VRAK FORD</p>
            <p className="text-muted-foreground text-sm">
              Náhradní díly Ford • Ekologická likvidace • Ostrava
            </p>
          </div>
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} VRAK FORD. Všechna práva vyhrazena.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
