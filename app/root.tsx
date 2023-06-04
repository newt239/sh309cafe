import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect } from "react";

import { cn } from "./lib/utils";

import SideBar from "@/components/feature/sidebar/SideBar";
import stylesheet from "@/tailwind.css";

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
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className={cn("bg-slate-50")}>
        <div
          className={cn(
            "flex",
            "flex-col-reverse",
            "lg:flex-row",
            "lg:h-screen"
          )}
        >
          <SideBar />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
