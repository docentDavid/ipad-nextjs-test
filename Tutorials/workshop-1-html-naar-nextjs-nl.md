# Workshop 1 — Van HTML/CSS naar Next.js met TypeScript en Tailwind CSS

In deze workshop bouw je een bestaande, statische ACME-website om tot een moderne Next.js-applicatie. Je voert de migratie eerst handmatig uit. Daarna laat je een AI-agent dezelfde soort taak uitvoeren en beoordeel je het resultaat kritisch.

> Deze workshop gebruikt de actuele App Router van Next.js 16 en Tailwind CSS 4. Gebruik altijd een recente LTS-versie van Node.js die aan de minimale eis van Next.js voldoet.

## Leerdoelen

Na deze workshop kun je:

- uitleggen wat React, Next.js, JSX, componenten en routes zijn;
- een Next.js-project met TypeScript en Tailwind CSS opzetten;
- statische HTML omzetten naar geldige JSX;
- herhaalde onderdelen onderbrengen in herbruikbare componenten;
- routes maken met de App Router;
- onderscheid maken tussen Server Components en Client Components;
- een Next.js-project controleren met linting en een productiebuild;
- een AI-agent gericht instrueren en de gegenereerde code beoordelen.

## Eindresultaat

Je maakt een website met:

- een homepage;
- een productpagina;
- een contactpagina;
- een gedeelde header en footer;
- herbruikbare productkaarten;
- responsive styling met Tailwind CSS;
- metadata voor zoekmachines en delen via sociale media.

De uiteindelijke structuur ziet er ongeveer zo uit:

```text
acme-nextjs/
├── app/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ProductCard.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── AGENTS.md
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 1. De beginsituatie onderzoeken

De statische website bestaat uit losse HTML-bestanden:

```text
acme-html/
├── index.html
└── pages/
    ├── contact.html
    └── products.html
```

Open alle drie de pagina's in de browser en bekijk daarna de broncode.

### Opdracht

Noteer vóór je begint:

1. Welke delen op iedere pagina terugkomen.
2. Welke links naar andere HTML-bestanden verwijzen.
3. Welke HTML-attributen in JSX anders geschreven moeten worden.
4. Welke inhoud geschikt is voor een herbruikbaar component.
5. Welke JavaScript-code uitsluitend nodig is om de pagina interactief te maken.

Waarschijnlijk vind je onder andere:

- een header en footer die zijn gekopieerd naar iedere pagina;
- links zoals `pages/products.html`;
- `class`-attributen;
- een Tailwind-CDN-script;
- een script dat het jaartal in de footer invult.

## 2. Van statische site naar Next.js

Een statische website stuurt voor iedere pagina een apart HTML-bestand naar de browser. Next.js bouwt de interface met React-componenten en koppelt mappen en bestanden aan routes.

| Statische website | Next.js App Router |
| --- | --- |
| `index.html` | `app/page.tsx` |
| `pages/products.html` | `app/products/page.tsx` |
| `pages/contact.html` | `app/contact/page.tsx` |
| Gekopieerde header/footer | Gedeelde componenten in `app/layout.tsx` |
| `<a href="...">` | `<Link href="...">` voor interne navigatie |
| `class="..."` | `className="..."` |

### Belangrijke begrippen

- **React** bouwt een interface uit componenten.
- **Next.js** voegt onder andere routing, rendering, metadata en optimalisaties toe.
- **JSX** lijkt op HTML, maar staat in JavaScript of TypeScript.
- **TSX** is JSX met TypeScript.
- **App Router** maakt routes op basis van de mappenstructuur in `app`.
- **Server Components** worden standaard op de server uitgevoerd.
- **Client Components** zijn alleen nodig voor browserinteractie, state of browser-API's.

---

## 3. Voorbereiding

Je hebt nodig:

- Node.js 20.9 of hoger;
- npm;
- Visual Studio Code, Cursor of een andere code-editor;
- de map met de oorspronkelijke HTML-bestanden;
- basiskennis van HTML en CSS.

Controleer je installatie:

```bash
node --version
npm --version
```

Zie je een oudere Node.js-versie, installeer dan eerst een recente LTS-versie via [nodejs.org](https://nodejs.org/).

---

# Deel A — Handmatige migratie

## 4. Een Next.js-project maken

Open een terminal in de map waarin je het project wilt plaatsen en voer uit:

```bash
npx create-next-app@latest acme-nextjs --ts --eslint --tailwind --app --turbopack --use-npm --no-src-dir --import-alias "@/*"
```

Ga naar het project:

```bash
cd acme-nextjs
```

Start de ontwikkelserver:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop de server zo nodig met `Ctrl+C`.

### Controlepunt

- De standaardpagina verschijnt zonder foutmelding.
- In de terminal staan geen compileerfouten.
- De map `app` bevat minimaal `layout.tsx`, `page.tsx` en `globals.css`.

## 5. Tailwind CSS controleren

`create-next-app` installeert en configureert Tailwind CSS. Je hoeft daarom geen aparte Tailwind-configuratie te maken.

Open `app/globals.css`. Zorg dat dit bestand begint met:

```css
@import "tailwindcss";
```

Vervang de overige standaardinhoud door:

```css
@import "tailwindcss";

:root {
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}
```

De utility classes blijven rechtstreeks in je TSX-bestanden staan. Een `tailwind.config.js` is voor deze workshop niet nodig.

## 6. De root layout maken

De root layout bevat de elementen die alle pagina's delen. Open `app/layout.tsx` en vervang de inhoud door:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ACME — Slimme oplossingen",
    template: "%s | ACME",
  },
  description:
    "ACME levert heldere, betrouwbare oplossingen voor moderne teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
```

### Wat gebeurt hier?

- `metadata` vervangt de titel en beschrijving die je eerder in `<head>` plaatste.
- `children` is de pagina die binnen de layout wordt weergegeven.
- `lang="nl"` helpt browsers, zoekmachines en schermlezers.
- Er staat geen `'use client'`; de layout is standaard een Server Component.

## 7. Een herbruikbare header maken

Maak de map `app/components` en daarin het bestand `Header.tsx`:

```tsx
import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Producten" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold tracking-tight text-slate-950"
          aria-label="ACME-homepage"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white">
            A
          </span>
          <span>ACME</span>
        </Link>

        <nav aria-label="Hoofdnavigatie">
          <ul className="flex items-center gap-4 text-sm font-medium sm:gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-600 transition hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

### HTML wordt JSX

| HTML | JSX/Next.js |
| --- | --- |
| `class` | `className` |
| `for` | `htmlFor` |
| `tabindex` | `tabIndex` |
| `onclick` | `onClick` |
| `<a href="/products">` | `<Link href="/products">` |
| `<!-- commentaar -->` | `{/* commentaar */}` |

Gebruik gewone `<a>`-elementen nog steeds voor externe links, downloads, e-mailadressen en telefoonnummers.

## 8. Een footer maken

Maak `app/components/Footer.tsx`:

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} ACME. Alle rechten voorbehouden.</p>
        <nav aria-label="Footernavigatie" className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/products">Producten</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
```

Het jaartal wordt tijdens het renderen bepaald. Bij een volledig statische deployment verandert dit pas nadat de site opnieuw is gebouwd.

## 9. Header en footer aan de layout toevoegen

Werk `app/layout.tsx` bij:

```tsx
import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ACME — Slimme oplossingen",
    template: "%s | ACME",
  },
  description:
    "ACME levert heldere, betrouwbare oplossingen voor moderne teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
```

Wijzig later één tekst in de header en controleer of de wijziging op alle routes verschijnt.

## 10. De homepage omzetten

Vervang `app/page.tsx` door:

```tsx
import Link from "next/link";

const benefits = [
  {
    title: "Eenvoudig",
    description: "Duidelijke oplossingen waarmee je direct aan de slag kunt.",
  },
  {
    title: "Schaalbaar",
    description: "Een solide basis die met je organisatie meegroeit.",
  },
  {
    title: "Betrokken",
    description: "Persoonlijke ondersteuning door mensen die met je meedenken.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="overflow-hidden border-b border-slate-200 bg-gradient-to-b from-indigo-50 to-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 font-semibold text-indigo-600">Slimmer samenwerken</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Slimme oplossingen, zonder gedoe
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              ACME helpt teams vooruit met heldere producten, vriendelijke
              service en technologie die gewoon werkt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Bekijk producten
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Neem contact op
              </Link>
            </div>
          </div>

          <div
            className="grid aspect-[4/3] place-items-center rounded-3xl border border-indigo-100 bg-white text-8xl shadow-xl shadow-indigo-100/70"
            aria-hidden="true"
          >
            ⚙️
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-950">
                {benefit.title}
              </h2>
              <p className="mt-2 leading-7 text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```

### Wat leer je uit dit bestand?

- Een componentnaam begint met een hoofdletter.
- JSX-expressies staan tussen accolades: `{benefit.title}`.
- `.map()` zet gegevens om in componenten.
- Ieder element in een lijst krijgt een unieke `key`.
- Een fragment is hier niet nodig, omdat `<main>` het enige root-element is.

## 11. Een productkaart als component maken

Maak `app/components/ProductCard.tsx`:

```tsx
type ProductCardProps = {
  emoji: string;
  title: string;
  description: string;
  price: number;
};

export default function ProductCard({
  emoji,
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid h-40 place-items-center bg-slate-50 text-6xl" aria-hidden="true">
        {emoji}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 flex-1 leading-7 text-slate-600">{description}</p>
        <p className="mt-5 font-semibold text-slate-950">
          € {price} <span className="font-normal text-slate-500">per maand</span>
        </p>
        <button
          type="button"
          className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
        >
          Bekijk product
        </button>
      </div>
    </article>
  );
}
```

De `type` beschrijft welke props verplicht zijn. TypeScript waarschuwt wanneer een prop ontbreekt of het verkeerde datatype heeft.

## 12. De productroute maken

Maak `app/products/page.tsx`:

```tsx
import type { Metadata } from "next";
import ProductCard from "@/app/components/ProductCard";

export const metadata: Metadata = {
  title: "Producten",
  description: "Bekijk de oplossingen van ACME.",
};

const products = [
  {
    id: 1,
    emoji: "🧰",
    title: "ACME Toolkit",
    description: "Een complete gereedschapskist voor teams die sneller willen werken.",
    price: 49,
  },
  {
    id: 2,
    emoji: "📦",
    title: "ACME Box",
    description: "Veilige opslag en eenvoudig delen zonder je werkproces te vertragen.",
    price: 29,
  },
  {
    id: 3,
    emoji: "🤖",
    title: "ACME Assist",
    description: "Slimme automatisering voor terugkerende werkzaamheden.",
    price: 99,
  },
];

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-semibold text-indigo-600">Ons aanbod</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Producten
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Kies de oplossing die aansluit bij de manier waarop jouw team werkt.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}
```

De map `products` vormt het URL-segment. Het bestand `page.tsx` maakt de route `/products` publiek toegankelijk.

## 13. De contactroute maken

Maak `app/contact/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met ACME.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-semibold text-indigo-600">We denken graag mee</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Contact
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Vul het formulier in. We reageren binnen één werkdag.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Naam
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-mailadres
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Bericht
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Versturen
          </button>
        </form>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Bedrijfsgegevens</h2>
          <address className="mt-4 space-y-2 not-italic leading-7 text-slate-600">
            <p>Fictiestraat 123</p>
            <p>1234 AB Utrecht</p>
            <p>
              <a className="hover:text-indigo-600" href="tel:+31101234567">
                +31 10 123 45 67
              </a>
            </p>
            <p>
              <a className="hover:text-indigo-600" href="mailto:hello@acme.test">
                hello@acme.test
              </a>
            </p>
          </address>
        </aside>
      </div>

      <p className="mt-6 text-sm text-amber-700">
        Dit formulier heeft nog geen verzendlogica. De browser controleert alleen
        de verplichte velden.
      </p>
    </main>
  );
}
```

### Waarom is dit nog steeds een Server Component?

HTML-formulierelementen hebben geen Client Component nodig. Pas wanneer je bijvoorbeeld `useState`, `onSubmit` of een browser-API gebruikt, plaats je `'use client'` bovenaan het betreffende bestand. Voeg dit niet standaard toe.

## 14. De applicatie controleren

Start de ontwikkelserver als deze niet meer draait:

```bash
npm run dev
```

Controleer in de browser:

- `/` toont de homepage;
- `/products` toont drie productkaarten;
- `/contact` toont het formulier;
- alle navigatielinks werken;
- de layout blijft bruikbaar op een smal scherm;
- labels en invoervelden zijn gekoppeld;
- de browserconsole bevat geen fouten.

Voer daarna uit:

```bash
npm run lint
npm run build
```

Een werkende ontwikkelserver is niet voldoende: de workshop is pas afgerond als ook linting en de productiebuild slagen.

### Tussenresultaat bewaren met Git

```bash
git status
git add .
git commit -m "Convert static ACME site to Next.js"
```

---

# Deel B — Dezelfde taak uitvoeren met een AI-agent

In dit deel gebruik je een coding agent, bijvoorbeeld Codex, Cursor, Claude Code of GitHub Copilot. Het doel is niet om het denkwerk uit te besteden, maar om te leren specificeren, controleren en verbeteren.

## 15. Een schone werkomgeving maken

Werk niet over je handmatige oplossing heen. Kies één van deze routes:

### Optie 1: een nieuwe Git-branch

```bash
git switch -c ai-migration
```

Zet daarna alleen de bestanden terug waarmee de agent opnieuw moet beginnen, of gebruik een apart startproject dat je docent beschikbaar stelt.

### Optie 2: een tweede projectmap

```bash
npx create-next-app@latest acme-nextjs-ai --ts --eslint --tailwind --app --turbopack --use-npm --no-src-dir --import-alias "@/*"
cd acme-nextjs-ai
```

Kopieer de map met de oorspronkelijke HTML-bestanden naar een map `legacy-html` in het nieuwe project. Bewaar de HTML-bestanden als bron; laat de agent ze niet overschrijven.

## 16. De agent projectspecifieke context geven

Recente Next.js-projecten gebruiken een `AGENTS.md`-bestand om coding agents naar documentatie te verwijzen die bij de geïnstalleerde Next.js-versie hoort. Controleer of `AGENTS.md` in de projectroot staat.

Start zo nodig eerst:

```bash
npm run dev
```

Voeg buiten een eventueel automatisch beheerd blok in `AGENTS.md` je eigen projectafspraken toe:

```md
## Projectafspraken

- Gebruik de App Router en TypeScript.
- Server Components zijn de standaard.
- Voeg alleen `use client` toe wanneer browserinteractie dit vereist.
- Gebruik Tailwind CSS voor styling.
- Behoud de inhoud en informatierestructuur uit `legacy-html`.
- Maak herbruikbare componenten voor gedeelde en herhaalde interface-elementen.
- Controleer toegankelijkheid, linting en de productiebuild.
- Lees vóór wijzigingen de relevante documentatie in `node_modules/next/dist/docs/`.
```

Verwijder of wijzig geen automatisch beheerd Next.js-blok in dit bestand.

## 17. Eerst laten analyseren, nog niet laten aanpassen

Geef de agent deze opdracht:

```text
Analyseer de HTML- en CSS-bestanden in legacy-html en de huidige Next.js-projectstructuur.
Lees eerst de relevante, versiegebonden Next.js-documentatie in node_modules/next/dist/docs/.

Maak nog geen wijzigingen. Geef eerst:
1. een overzicht van de bestaande pagina's en gedeelde onderdelen;
2. de voorgestelde Next.js-routes en componenten;
3. de belangrijkste HTML-naar-JSX-conversies;
4. mogelijke risico's voor styling, toegankelijkheid en gedrag;
5. een kort uitvoerings- en verificatieplan.
```

### Beoordelingsvragen

- Heeft de agent alle bestaande pagina's gevonden?
- Herkent de agent gedeelde onderdelen zoals header en footer?
- Worden Server Components als uitgangspunt genomen?
- Stelt de agent geen onnodige pakketten of complexe architectuur voor?
- Bevat het plan concrete controles?

Laat de agent het plan aanpassen als belangrijke onderdelen ontbreken.

## 18. De migratie laten uitvoeren

Gebruik daarna bijvoorbeeld deze prompt:

```text
Voer het goedgekeurde migratieplan uit.

Eisen:
- Migreer de statische site in legacy-html naar de bestaande Next.js-app.
- Gebruik App Router, TypeScript en Tailwind CSS.
- Maak routes voor /, /products en /contact.
- Plaats gedeelde navigatie en footer in herbruikbare componenten en gebruik ze via app/layout.tsx.
- Zet herhaalde productkaarten om naar getypeerde data en een herbruikbaar ProductCard-component.
- Gebruik next/link voor interne navigatie.
- Voeg per pagina passende metadata toe.
- Behoud semantische HTML, zichtbare focusstijlen en gekoppelde formulierlabels.
- Voeg geen verzendbackend toe aan het contactformulier.
- Voeg alleen een Client Component toe wanneer dat technisch noodzakelijk is.
- Overschrijf de bronbestanden in legacy-html niet.

Werk in kleine stappen. Controleer na iedere betekenisvolle wijziging de fouten van de ontwikkelserver. Voer aan het einde npm run lint en npm run build uit. Rapporteer welke bestanden zijn gewijzigd, welke controles zijn uitgevoerd en welke beperkingen overblijven.
```

## 19. Het resultaat zelf controleren

Accepteer een melding als “klaar” nooit zonder controle.

### Codecontrole

Controleer minimaal:

- [ ] `app/page.tsx`, `app/products/page.tsx` en `app/contact/page.tsx` bestaan.
- [ ] Interne links gebruiken `next/link`.
- [ ] JSX gebruikt `className` en `htmlFor`.
- [ ] Header en footer zijn niet op iedere pagina gekopieerd.
- [ ] Productgegevens staan niet in meerdere bijna gelijke kaarten hardcoded.
- [ ] Componentprops zijn getypeerd.
- [ ] `'use client'` wordt alleen gebruikt waar dat nodig is.
- [ ] De oorspronkelijke bestanden in `legacy-html` zijn behouden.

### Functionele controle

```bash
npm run dev
npm run lint
npm run build
```

Bekijk iedere route op desktop- en mobiel formaat. Test navigatie, toetsenbordfocus en de standaardvalidatie van het contactformulier.

### Vergelijk met je handmatige oplossing

Beantwoord:

1. Welke oplossing heeft een duidelijkere componentstructuur?
2. Welke oplossing bewaart de oorspronkelijke inhoud het best?
3. Heeft de agent dingen toegevoegd waar je niet om vroeg?
4. Welke fouten kon je alleen herkennen doordat je Deel A handmatig hebt uitgevoerd?
5. Welke agentwijzigingen zou je behouden, aanpassen of verwijderen?

## 20. De agent gericht laten verbeteren

Een goede vervolgpomp benoemt bewijs en een gewenst resultaat. Bijvoorbeeld:

```text
Op /contact is de toetsenbordfocus op de verzendknop nauwelijks zichtbaar.
Verbeter alleen de focusstijl van interactieve elementen, behoud de bestaande vormgeving en controleer daarna de route en npm run lint.
```

Minder bruikbaar is: `Maak de website beter.` Dat geeft de agent te veel ruimte om onnodige wijzigingen te doen.

---

## 21. Veelvoorkomende problemen

### Tailwind-stijlen verschijnen niet

Controleer:

1. `app/globals.css` begint met `@import "tailwindcss";`.
2. `app/layout.tsx` importeert `./globals.css`.
3. De gebruikte classes staan volledig in de broncode en worden niet dynamisch samengesteld.
4. De ontwikkelserver is na configuratiewijzigingen opnieuw gestart.

### `class` veroorzaakt een waarschuwing

Gebruik in JSX `className`:

```tsx
<div className="rounded-xl bg-white">Inhoud</div>
```

### Een label is niet gekoppeld aan het invoerveld

Gebruik dezelfde waarde voor `htmlFor` en `id`:

```tsx
<label htmlFor="email">E-mailadres</label>
<input id="email" name="email" type="email" />
```

### Meerdere root-elementen geven een fout

Gebruik één semantisch root-element of een fragment:

```tsx
<>
  <section>...</section>
  <section>...</section>
</>
```

### `window`, `useState` of `onClick` werkt niet in een Server Component

Isoleer alleen het interactieve deel in een apart component en plaats bovenaan dat bestand:

```tsx
'use client';
```

Maak niet de volledige pagina client-side als slechts één klein onderdeel interactief is.

### Een dynamische route gebruikt `params` verkeerd

In actuele Next.js-versies is `params` asynchroon:

```tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <h1>Product {id}</h1>;
}
```

### De build faalt terwijl de site in development werkt

Lees de volledige terminalmelding. Los eerst de eerste concrete fout op en voer daarna opnieuw uit:

```bash
npm run build
```

Verwijder niet gedachteloos bestanden, types of controles om de fout te verbergen.

---

## 22. Verdiepende opdrachten

### Basis

1. Maak een route `/about` en voeg deze aan de navigatie toe.
2. Vervang het favicon door een eigen ontwerp.
3. Pas het kleurenschema consequent aan.

### Gemiddeld

4. Maak een herbruikbaar `BenefitCard`-component.
5. Voeg een toegankelijke actieve navigatiestatus toe met `usePathname` in een klein Client Component.
6. Voeg een `not-found.tsx` toe met een link naar de homepage.

### Gevorderd

7. Maak dynamische productroutes in `app/products/[id]/page.tsx` en behandel `params` als een Promise.
8. Vervang de emoji door lokale afbeeldingen met `next/image` en correcte alternatieve tekst.
9. Verwerk het contactformulier met een Server Action, valideer de invoer op de server en toon een duidelijke succes- of foutstatus.

---

## 23. Afronding

Je hebt dezelfde migratie op twee manieren benaderd:

1. **Handmatig**, om JSX, componenten, layouts, routes en server/client-grenzen te begrijpen.
2. **Met een AI-agent**, om te oefenen met specificeren, controleren en gericht verbeteren.

De agent kan uitvoering versnellen, maar jij blijft verantwoordelijk voor de architectuur, toegankelijkheid, correctheid en uiteindelijke kwaliteit.

## Bronnen

- [Next.js: Installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js: Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js: Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js: AI Coding Agents](https://nextjs.org/docs/app/guides/ai-agents)
- [React: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Tailwind CSS: Install with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

