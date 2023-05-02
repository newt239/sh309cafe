import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { useEffect } from "react";

import clsx from "clsx";

import Items from "~/components/sidebar/Items";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  useEffect(() => {
    localStorage.theme = "light";
  }, []);

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <link
          href="https://cdn.jsdelivr.net/npm/rippleui@1.12.1/dist/css/styles.css"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className={clsx("bg-slate-50")}>
        <div className={clsx("flex", "h-screen")}>
          <nav
            className={clsx(
              "w-1/4",
              "h-full",
              "bg-slate-500",
              "text-white",
              "p-2"
            )}
          >
            <Link to="/">
              <h1 className={clsx("font-bold", "text-4xl")}>sh309cafe</h1>
            </Link>
            <section className="menu-section">
              <Items />
            </section>
          </nav>
          <div className={clsx("p-2")}>
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
