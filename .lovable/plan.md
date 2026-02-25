

Ano! Admin panel (`/admin`) funguje úplně stejně i při vlastním hostingu, protože se připojuje na stejný backend (Lovable Cloud).

### Jak to funguje:
- Admin panel je součástí vaší aplikace — běží na stejné doméně jako zbytek webu.
- Když přidáte/upravíte produkt, model nebo službu v admin panelu, data se uloží do databáze na Lovable Cloud.
- Veřejná stránka čte data ze stejné databáze → změny se projeví okamžitě.

### Důležité:
- Na **Live** verzi (po publikování) admin panel funguje s **Live databází**.
- Na **Test** verzi (v Lovable editoru) pracujete s **testovací databází** — data jsou oddělená.
- Po publikování budete muset přidat data i do Live databáze přes admin panel na Live verzi.

