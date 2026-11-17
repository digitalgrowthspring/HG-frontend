import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

// Local saved-quote store (development only). Each saved quote gets a short id;
// the id is the unique link: /q/<id>. Live storage will move to WooCommerce pending orders.
const STORE_DIR = path.join(process.cwd(), ".quotes");

export interface SavedQuote {
  id: string;
  createdAt: string;
  customer: string;
  productName: string;
  date: string;
  token: string; // signed quote token, carries the agreed prices and expiry
  orderId?: number; // WooCommerce pending order, when enabled
  holdUntil?: string; // when the date hold on that order ends
}

const ID_PATTERN = /^[a-z0-9]{8}$/;

export function newQuoteReference() {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(8);
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

export async function saveQuote(
  record: Omit<SavedQuote, "createdAt" | "id"> & { id?: string },
): Promise<SavedQuote> {
  await mkdir(STORE_DIR, { recursive: true });
  const saved: SavedQuote = {
    ...record,
    id: record.id ?? newQuoteReference(),
    createdAt: new Date().toISOString(),
  };
  await writeFile(path.join(STORE_DIR, `${saved.id}.json`), JSON.stringify(saved, null, 2), "utf-8");
  return saved;
}

export async function getQuote(id: string): Promise<SavedQuote | null> {
  if (!ID_PATTERN.test(id)) return null;

  try {
    const raw = await readFile(path.join(STORE_DIR, `${id}.json`), "utf-8");
    return JSON.parse(raw) as SavedQuote;
  } catch {
    return null;
  }
}
