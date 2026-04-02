import { createHash } from "crypto";
import { NextResponse } from "next/server";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER;

function splitName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return { firstName: "", lastName: "" };

  const [firstName, ...rest] = trimmed.split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

export async function POST(request: Request) {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER) {
    return NextResponse.json(
      { error: "Mailchimp is not configured." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const { firstName, lastName } = splitName(name);
    const subscriberHash = createHash("md5").update(email).digest("hex");
    const endpoint = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}`;

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags: ["DW Report"],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || "Failed to subscribe contact." },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while subscribing contact." },
      { status: 500 },
    );
  }
}
