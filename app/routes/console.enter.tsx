import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import clsx from "clsx";

import Tab from "~/components/feature/asidebar/Tab";
import prisma from "~/libs/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "入室処理" }];
};

export async function loader() {
  const menus = await prisma.menus.findMany();

  return json({ menus });
}

export default function Enter() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Tab type="enter" />
      <Form method="post">
        <fieldset>
          <legend className={clsx("text-2xl")}>メニュー</legend>
          {data.menus.map((menu, i) => (
            <label
              className="flex cursor-pointer gap-2 items-center"
              key={menu.id}
            >
              <input
                className="radio"
                defaultChecked={i === 0}
                id={`menu-${menu.id}`}
                name="drone"
                type="radio"
                value={menu.id}
              />
              <span>{menu.name}</span>
            </label>
          ))}
        </fieldset>
      </Form>
    </>
  );
}
