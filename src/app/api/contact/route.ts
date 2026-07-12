import { AutoReply } from "@/components/contact/contactEmail/autoReply";
import { ContactEmail } from "@/components/contact/contactEmail/contactEmail";
import { contactSchema } from "@/lib/contact/contactSchema";
import { ratelimit } from "@/lib/contact/rateLimit";
import { resend } from "@/lib/contact/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1️⃣ Rate Limit
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      console.error("Rate limit hit for IP:", ip);
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    // 2️⃣ Validate
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.flatten());
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    const { name, email, message } = parsed.data;
    console.log("Contact form submission:", { name, email, messageLength: message.length });

    // 3️⃣ Check env vars
    console.log("RESEND_API_KEY set:", !!process.env.RESEND_API_KEY);
    console.log("CONTACT_EMAIL set:", !!process.env.CONTACT_EMAIL, process.env.CONTACT_EMAIL);

    // 4️⃣ Send notification email
    console.log("Sending notification email to:", process.env.CONTACT_EMAIL);
    const notificationResult = await resend.emails.send({
      from: "AI Trip Planner <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: "New Contact Form",
      replyTo: email,
      react: ContactEmail({ name, email, message }),
    });

    console.log("Notification result:", JSON.stringify(notificationResult));

    if (notificationResult.error) {
      console.error("Notification email failed:", JSON.stringify(notificationResult.error));
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    // 5️⃣ Send auto-reply (best effort)
    console.log("Sending auto-reply to:", email);
    await resend.emails.send({
      from: "AI Trip Planner <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me",
      react: AutoReply({ name }),
    }).catch((err) => console.error("Auto-reply failed:", err));

    console.log("Contact form completed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
