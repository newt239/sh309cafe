import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CookieJar } from "tough-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

export async function updateCrowdStatus(count: number) {
  const crowdNumber = Math.max(Math.min(Math.floor((count / 20) * 5), 5), 1);
  try {
    const url = `${process.env.CROWD_STATUS_SHEET_URL}?value=${crowdNumber}`;
    const res = await client.get(url, {
      maxRedirects: 10,
      headers: {
        "Content-Type": "x-www-form-urlencoded",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}
