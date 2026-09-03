# Workshop 1 — From HTML/CSS to Next.js with TypeScript and Tailwind CSS

In this workshop, you will convert an existing static ACME website into a modern Next.js application. You will perform the migration manually first. You will then ask an AI coding agent to complete the same kind of task and critically review its result.

> This workshop uses the current Next.js 16 App Router and Tailwind CSS 4. Always use a recent Node.js LTS release that meets the minimum Next.js requirement.

## Learning objectives

After this workshop, you can:

- explain React, Next.js, JSX, components, and routes;
- create a Next.js project with TypeScript and Tailwind CSS;
- convert static HTML to valid JSX;
- extract repeated markup into reusable components;
- create routes with the App Router;
- distinguish Server Components from Client Components;
- validate a Next.js project with linting and a production build;
- instruct an AI agent precisely and evaluate the generated code.

## Final result

You will build a website with:

- a homepage;
- a products page;
- a contact page;
- a shared header and footer;
- reusable product cards;
- responsive styling with Tailwind CSS;
- metadata for search engines and social sharing.

The final structure will look approximately like this:

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

## 1. Inspect the starting point

The static website consists of separate HTML files:

```text
acme-html/
├── index.html
└── pages/
    ├── contact.html
    └── products.html
```

Open all three pages in a browser and then inspect their source code.

### Assignment

Before you start, identify:

1. Which sections appear on every page.
2. Which links point to other HTML files.
3. Which HTML attributes need a different JSX spelling.
4. Which content is suitable for a reusable component.
5. Which JavaScript exists only to make the page interactive.

You will probably find:

- a header and footer copied into every page;
- links such as `pages/products.html`;
- `class` attributes;
- a Tailwind CDN script;
- a script that inserts the year into the footer.

## 2. From a static site to Next.js

A static website sends a separate HTML file for every page. Next.js builds the interface from React components and maps folders and files to routes.

| Static website | Next.js App Router |
| --- | --- |
| `index.html` | `app/page.tsx` |
| `pages/products.html` | `app/products/page.tsx` |
| `pages/contact.html` | `app/contact/page.tsx` |
| Copied header/footer | Shared components in `app/layout.tsx` |
| `<a href="...">` | `<Link href="...">` for internal navigation |
| `class="..."` | `className="..."` |

### Key concepts

- **React** builds an interface from components.
- **Next.js** adds features such as routing, rendering, metadata, and optimizations.
- **JSX** resembles HTML but is written inside JavaScript or TypeScript.
- **TSX** is JSX with TypeScript.
- **App Router** creates routes from the folder structure inside `app`.
- **Server Components** run on the server by default.
- **Client Components** are only required for browser interaction, state, or browser APIs.

---

## 3. Prerequisites

You need:

- Node.js 20.9 or newer;
- npm;
- Visual Studio Code, Cursor, or another code editor;
- the original HTML files;
- basic knowledge of HTML and CSS.

Check your installation:

```bash
node --version
npm --version
```

If your Node.js version is too old, install a recent LTS release from [nodejs.org](https://nodejs.org/).

---

# Part A — Manual migration

## 4. Create a Next.js project

Open a terminal in the directory where you want to create the project and run:

```bash
npx create-next-app@latest acme-nextjs --ts --eslint --tailwind --app --turbopack --use-npm --no-src-dir --import-alias "@/*"
```

Enter the project:

```bash
cd acme-nextjs
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop the server with `Ctrl+C` when necessary.

### Checkpoint

- The default page appears without an error.
- The terminal contains no compilation errors.
- The `app` directory contains at least `layout.tsx`, `page.tsx`, and `globals.css`.

## 5. Check Tailwind CSS

`create-next-app` installs and configures Tailwind CSS. You do not need a separate Tailwind configuration file for this workshop.

Open `app/globals.css`. Make sure it starts with:

```css
@import "tailwindcss";
```

Replace the remaining default content with:

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

Utility classes remain directly in your TSX files. This workshop does not require `tailwind.config.js`.

## 6. Create the root layout

The root layout contains the elements shared by all pages. Open `app/layout.tsx` and replace its contents with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ACME — Smart solutions",
    template: "%s | ACME",
  },
  description:
    "ACME delivers clear, reliable solutions for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### What happens here?

- `metadata` replaces the title and description previously placed inside `<head>`.
- `children` is the page rendered inside the layout.
- `lang="en"` helps browsers, search engines, and assistive technology.
- There is no `'use client'`; the layout is a Server Component by default.

## 7. Create a reusable header

Create the directory `app/components`, then create `Header.tsx` inside it:

```tsx
import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold tracking-tight text-slate-950"
          aria-label="ACME home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white">
            A
          </span>
          <span>ACME</span>
        </Link>

        <nav aria-label="Main navigation">
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

### HTML becomes JSX

| HTML | JSX/Next.js |
| --- | --- |
| `class` | `className` |
| `for` | `htmlFor` |
| `tabindex` | `tabIndex` |
| `onclick` | `onClick` |
| `<a href="/products">` | `<Link href="/products">` |
| `<!-- comment -->` | `{/* comment */}` |

Continue to use regular `<a>` elements for external links, downloads, email addresses, and telephone numbers.

## 8. Create a footer

Create `app/components/Footer.tsx`:

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} ACME. All rights reserved.</p>
        <nav aria-label="Footer navigation" className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
```

The year is determined when the component renders. On a fully static deployment, it only changes after the website is built again.

## 9. Add the header and footer to the layout

Update `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ACME — Smart solutions",
    template: "%s | ACME",
  },
  description:
    "ACME delivers clear, reliable solutions for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
```

Later, change one label in the header and verify that the change appears on every route.

## 10. Convert the homepage

Replace `app/page.tsx` with:

```tsx
import Link from "next/link";

const benefits = [
  {
    title: "Simple",
    description: "Clear solutions you can start using immediately.",
  },
  {
    title: "Scalable",
    description: "A solid foundation that grows with your organization.",
  },
  {
    title: "Supportive",
    description: "Personal support from people who think along with you.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="overflow-hidden border-b border-slate-200 bg-gradient-to-b from-indigo-50 to-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 font-semibold text-indigo-600">Work smarter</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Smart solutions, zero hassle
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              ACME helps teams move forward with clear products, friendly
              service, and technology that simply works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Browse products
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Contact us
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

### What does this file demonstrate?

- Component names start with a capital letter.
- JSX expressions use braces: `{benefit.title}`.
- `.map()` turns data into components.
- Each item in a list receives a stable `key`.
- A fragment is unnecessary because `<main>` is the single root element.

## 11. Create a product card component

Create `app/components/ProductCard.tsx`:

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
          € {price} <span className="font-normal text-slate-500">per month</span>
        </p>
        <button
          type="button"
          className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
        >
          View product
        </button>
      </div>
    </article>
  );
}
```

The `type` defines the required props. TypeScript reports a problem when a prop is missing or has the wrong data type.

## 12. Create the products route

Create `app/products/page.tsx`:

```tsx
import type { Metadata } from "next";
import ProductCard from "@/app/components/ProductCard";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore ACME solutions.",
};

const products = [
  {
    id: 1,
    emoji: "🧰",
    title: "ACME Toolkit",
    description: "An all-in-one toolbox for teams that want to move faster.",
    price: 49,
  },
  {
    id: 2,
    emoji: "📦",
    title: "ACME Box",
    description: "Secure storage and simple sharing without slowing your workflow.",
    price: 29,
  },
  {
    id: 3,
    emoji: "🤖",
    title: "ACME Assist",
    description: "Smart automation for repetitive work.",
    price: 99,
  },
];

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-semibold text-indigo-600">Our offering</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Products
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Choose the solution that fits the way your team works.
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

The `products` directory creates the URL segment. The `page.tsx` file makes `/products` publicly accessible.

## 13. Create the contact route

Create `app/contact/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ACME.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-semibold text-indigo-600">We are happy to help</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Contact
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Complete the form. We will respond within one business day.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
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
              Email address
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
              Message
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
            Send message
          </button>
        </form>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Company details</h2>
          <address className="mt-4 space-y-2 not-italic leading-7 text-slate-600">
            <p>123 Fiction Street</p>
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
        This form has no submission logic yet. The browser only validates the
        required fields.
      </p>
    </main>
  );
}
```

### Why is this still a Server Component?

HTML form elements do not require a Client Component. Only add `'use client'` when you use features such as `useState`, `onSubmit`, or a browser API. Do not add it by default.

## 14. Verify the application

Start the development server if it is not running:

```bash
npm run dev
```

Check in the browser that:

- `/` displays the homepage;
- `/products` displays three product cards;
- `/contact` displays the form;
- all navigation links work;
- the layout remains usable on a narrow screen;
- labels are associated with their inputs;
- the browser console contains no errors.

Then run:

```bash
npm run lint
npm run build
```

A working development server is not enough: the workshop is complete only when linting and the production build also pass.

### Save the intermediate result with Git

```bash
git status
git add .
git commit -m "Convert static ACME site to Next.js"
```

---

# Part B — Complete the same task with an AI agent

In this part, you will use a coding agent such as Codex, Cursor, Claude Code, or GitHub Copilot. The purpose is not to outsource your thinking but to practise specification, review, and iteration.

## 15. Create a clean workspace

Do not overwrite your manual solution. Choose one of these approaches:

### Option 1: create a Git branch

```bash
git switch -c ai-migration
```

Then restore only the files the agent should recreate, or use a separate starter project provided by your instructor.

### Option 2: create a second project directory

```bash
npx create-next-app@latest acme-nextjs-ai --ts --eslint --tailwind --app --turbopack --use-npm --no-src-dir --import-alias "@/*"
cd acme-nextjs-ai
```

Copy the original HTML files into a `legacy-html` directory in the new project. Preserve these source files; the agent must not overwrite them.

## 16. Give the agent project-specific context

Recent Next.js projects use an `AGENTS.md` file to direct coding agents to documentation that matches the installed Next.js version. Check that `AGENTS.md` exists in the project root.

If necessary, start the project first:

```bash
npm run dev
```

Outside any automatically managed block, add your own project rules to `AGENTS.md`:

```md
## Project rules

- Use the App Router and TypeScript.
- Server Components are the default.
- Add `use client` only when browser interaction requires it.
- Use Tailwind CSS for styling.
- Preserve the content and information architecture in `legacy-html`.
- Create reusable components for shared and repeated UI.
- Check accessibility, linting, and the production build.
- Before editing, read the relevant documentation in `node_modules/next/dist/docs/`.
```

Do not remove or edit an automatically managed Next.js block in this file.

## 17. Ask for analysis before changes

Give the agent this prompt:

```text
Analyze the HTML and CSS files in legacy-html and inspect the current Next.js project structure.
First read the relevant version-matched Next.js documentation in node_modules/next/dist/docs/.

Do not change any files yet. First provide:
1. an overview of the existing pages and shared sections;
2. the proposed Next.js routes and components;
3. the main HTML-to-JSX conversions;
4. potential risks involving styling, accessibility, and behavior;
5. a concise implementation and verification plan.
```

### Review questions

- Did the agent find every existing page?
- Did it identify shared sections such as the header and footer?
- Does it treat Server Components as the default?
- Does it avoid unnecessary packages and architecture?
- Does its plan include concrete verification?

Ask the agent to revise the plan if important items are missing.

## 18. Ask the agent to perform the migration

Use a prompt such as:

```text
Implement the approved migration plan.

Requirements:
- Migrate the static website in legacy-html into the existing Next.js application.
- Use the App Router, TypeScript, and Tailwind CSS.
- Create routes for /, /products, and /contact.
- Extract shared navigation and footer markup into reusable components used by app/layout.tsx.
- Convert repeated product cards into typed data and a reusable ProductCard component.
- Use next/link for internal navigation.
- Add appropriate metadata for each page.
- Preserve semantic HTML, visible focus styles, and associated form labels.
- Do not add a submission backend to the contact form.
- Only add a Client Component where it is technically necessary.
- Do not overwrite the source files in legacy-html.

Work in small steps. After each meaningful change, inspect development-server errors. At the end, run npm run lint and npm run build. Report which files changed, which checks ran, and which limitations remain.
```

## 19. Review the result yourself

Never accept “done” without verification.

### Code review

Check at least:

- [ ] `app/page.tsx`, `app/products/page.tsx`, and `app/contact/page.tsx` exist.
- [ ] Internal links use `next/link`.
- [ ] JSX uses `className` and `htmlFor`.
- [ ] The header and footer are not copied into every page.
- [ ] Product data is not hardcoded in multiple nearly identical cards.
- [ ] Component props are typed.
- [ ] `'use client'` only appears where necessary.
- [ ] The original files in `legacy-html` remain intact.

### Functional review

```bash
npm run dev
npm run lint
npm run build
```

Inspect every route at desktop and mobile widths. Test navigation, keyboard focus, and the contact form's native validation.

### Compare with your manual solution

Answer:

1. Which solution has a clearer component structure?
2. Which one preserves the original content more accurately?
3. Did the agent add anything you did not request?
4. Which mistakes could you identify only because you completed Part A manually?
5. Which agent changes would you keep, modify, or remove?

## 20. Ask for a focused improvement

A useful follow-up prompt includes evidence and a desired result. For example:

```text
On /contact, keyboard focus on the submit button is difficult to see.
Improve only the focus styling of interactive elements, preserve the existing visual design, and then verify the route and run npm run lint.
```

`Make the website better` is less useful because it gives the agent too much freedom to make unnecessary changes.

---

## 21. Common problems

### Tailwind styles do not appear

Check that:

1. `app/globals.css` starts with `@import "tailwindcss";`.
2. `app/layout.tsx` imports `./globals.css`.
3. Class names appear as complete strings in the source and are not assembled dynamically.
4. You restarted the development server after configuration changes.

### `class` produces a warning

Use `className` in JSX:

```tsx
<div className="rounded-xl bg-white">Content</div>
```

### A label is not associated with its input

Use the same value for `htmlFor` and `id`:

```tsx
<label htmlFor="email">Email address</label>
<input id="email" name="email" type="email" />
```

### Multiple root elements produce an error

Use one semantic root element or a fragment:

```tsx
<>
  <section>...</section>
  <section>...</section>
</>
```

### `window`, `useState`, or `onClick` fails in a Server Component

Isolate the interactive section in a separate component and add this at the top of that file:

```tsx
'use client';
```

Do not turn the entire page into a Client Component when only one small section is interactive.

### A dynamic route uses `params` incorrectly

In current Next.js releases, `params` is asynchronous:

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

### The build fails although development works

Read the complete terminal message. Fix the first concrete error, then run:

```bash
npm run build
```

Do not remove files, types, or checks merely to hide the error.

---

## 22. Extension exercises

### Beginner

1. Create an `/about` route and add it to the navigation.
2. Replace the favicon with your own design.
3. Change the color scheme consistently.

### Intermediate

4. Create a reusable `BenefitCard` component.
5. Add an accessible active navigation state with `usePathname` in a small Client Component.
6. Add `not-found.tsx` with a link to the homepage.

### Advanced

7. Create dynamic product routes in `app/products/[id]/page.tsx` and treat `params` as a Promise.
8. Replace the emoji with local images using `next/image` and appropriate alternative text.
9. Process the contact form with a Server Action, validate input on the server, and display a clear success or error state.

---

## 23. Conclusion

You approached the same migration in two ways:

1. **Manually**, to understand JSX, components, layouts, routes, and server/client boundaries.
2. **With an AI agent**, to practise specification, review, and focused iteration.

The agent can accelerate implementation, but you remain responsible for architecture, accessibility, correctness, and final quality.

## Resources

- [Next.js: Installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js: Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js: Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js: AI Coding Agents](https://nextjs.org/docs/app/guides/ai-agents)
- [React: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Tailwind CSS: Install with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

