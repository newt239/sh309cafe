import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import clsx from "clsx";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
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
      <body>
        <div className={clsx("flex", "h-screen")}>
          <nav className={clsx("w-1/4", "h-full", "menu", "bg-gray-2", "p-2")}>
            <Link to="/">
              <h1 className={clsx("font-bold", "text-4xl")}>sh309cafe</h1>
            </Link>
            <section className="menu-section">
              <ul className="menu-items">
                <Link to="/">
                  <li className="menu-item">ホーム</li>
                </Link>
                <Link to="/console/">
                  <li className="menu-item">入退室処理</li>
                </Link>
                <Link to="/stats/">
                  <li className="menu-item">統計</li>
                </Link>
              </ul>
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
