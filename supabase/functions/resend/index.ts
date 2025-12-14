import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { email, type, message, subject } = await req.json();

        let htmlContent = "";
        let emailSubject = subject || "Notification from Saswat AI Studio";

        if (type === "newsletter") {
            emailSubject = "Welcome to Saswat AI Insider";
            htmlContent = `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Welcome to the Future! 🚀</h1>
          <p>Thanks for subscribing to Saswat AI Studio updates.</p>
          <p>We'll keep you posted on the latest features.</p>
        </div>
      `;
        } else if (type === "support") {
            emailSubject = `Support Ticket: ${subject}`;
            htmlContent = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>New Support Request</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #0070f3;">
            ${message}
          </blockquote>
        </div>
      `;
        }

        const data = await resend.emails.send({
            from: "Saswat AI <onboarding@resend.dev>", // User needs to verify domain or use this test one
            to: [email], // In test mode, this must be the verified email
            subject: emailSubject,
            html: htmlContent,
        });

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
