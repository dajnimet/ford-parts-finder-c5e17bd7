

## Úpravy projektu přes vlastní hosting

Pokud se rozhodnete hostovat projekt jinde (např. Vercel, Netlify, VPS), máte několik možností, jak ho dál upravovat:

### 1. Přes Lovable (doporučeno)
- Projekt zůstává propojený s GitHubem díky obousměrné synchronizaci.
- Změny, které uděláte v Lovable, se automaticky pushnou do GitHub repozitáře.
- Váš hosting (Vercel, Netlify apod.) si změny z GitHubu stáhne a automaticky nasadí.
- **Postup:** Lovable → GitHub → váš hosting (automaticky).

### 2. Přes lokální editor (VS Code apod.)
- Naklonujete si repozitář z GitHubu na svůj počítač.
- Upravíte kód v libovolném editoru.
- Pushnete změny do GitHubu → synchronizuje se zpět do Lovable i na váš hosting.

### 3. Přímo na GitHubu
- Můžete editovat soubory přímo v prohlížeči na GitHubu.
- Změny se opět synchronizují do Lovable i na hosting.

### Důležité omezení
- **Databáze a backend** běží na Lovable Cloud. Pokud hostujete jinde, kód se nasadí, ale backend (databáze, autentizace, ukládání souborů) zůstává na Lovable Cloud — připojení funguje přes proměnné prostředí (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`), které musíte nastavit i na vašem hostingu.
- Admin panel (`/admin`) a správa dat fungují stejně, protože se připojují na stejnou databázi.

### Shrnutí

```text
┌──────────┐     push/pull     ┌──────────┐     auto-deploy     ┌──────────┐
│  Lovable │ ←───────────────→ │  GitHub  │ ──────────────────→ │ Váš host │
│ (editor) │                   │  (repo)  │                     │ (Vercel) │
└──────────┘                   └──────────┘                     └──────────┘
      │                                                               │
      └───────────── oba se připojují na stejný backend ──────────────┘
```

Takže i při vlastním hostingu můžete dál používat Lovable chat pro úpravy — vše se propíše přes GitHub na váš hosting.

