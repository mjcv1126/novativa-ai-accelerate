import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TicketEmailRequest {
  ticketNumber: string;
  ticketData: {
    company_name: string;
    applicant_name: string;
    applicant_email: string;
    applicant_phone: string;
    applicant_role: string;
    request_type: string;
    request_type_other?: string;
    content_objective: string;
    dimensions?: string;
    delivery_format?: string;
    final_use?: string;
    delivery_date?: string;
    concept_description: string;
    reference_url?: string;
    reference_feedback: string;
    priority_level: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticketNumber, ticketData }: TicketEmailRequest = await req.json();

    console.log("Sending ticket email for:", ticketNumber);

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0F172A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #0F172A; }
            .field-value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #0F172A; text-align: center; color: #666; }
            .ticket-number { font-size: 24px; font-weight: bold; color: #3B82F6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Solicitud de Diseño</h1>
              <p class="ticket-number">Ticket #${ticketNumber}</p>
            </div>
            <div class="content">
              <h2>Detalles de la Solicitud</h2>
              
              <div class="field">
                <div class="field-label">Empresa:</div>
                <div class="field-value">${ticketData.company_name}</div>
              </div>

              <div class="field">
                <div class="field-label">Solicitante:</div>
                <div class="field-value">${ticketData.applicant_name} - ${ticketData.applicant_role}</div>
              </div>

              <div class="field">
                <div class="field-label">Correo Electrónico:</div>
                <div class="field-value">${ticketData.applicant_email}</div>
              </div>

              <div class="field">
                <div class="field-label">Teléfono:</div>
                <div class="field-value">${ticketData.applicant_phone}</div>
              </div>

              <div class="field">
                <div class="field-label">Tipo de Solicitud:</div>
                <div class="field-value">${ticketData.request_type}${ticketData.request_type_other ? ` - ${ticketData.request_type_other}` : ''}</div>
              </div>

              <div class="field">
                <div class="field-label">Nivel de Prioridad:</div>
                <div class="field-value">${ticketData.priority_level.toUpperCase()}</div>
              </div>

              <div class="field">
                <div class="field-label">Objetivo del Contenido:</div>
                <div class="field-value">${ticketData.content_objective}</div>
              </div>

              ${ticketData.dimensions ? `
              <div class="field">
                <div class="field-label">Dimensiones:</div>
                <div class="field-value">${ticketData.dimensions}</div>
              </div>
              ` : ''}

              ${ticketData.delivery_format ? `
              <div class="field">
                <div class="field-label">Formato de Entrega:</div>
                <div class="field-value">${ticketData.delivery_format}</div>
              </div>
              ` : ''}

              ${ticketData.final_use ? `
              <div class="field">
                <div class="field-label">Uso Final:</div>
                <div class="field-value">${ticketData.final_use}</div>
              </div>
              ` : ''}

              ${ticketData.delivery_date ? `
              <div class="field">
                <div class="field-label">Fecha de Entrega Deseada:</div>
                <div class="field-value">${new Date(ticketData.delivery_date).toLocaleDateString('es-ES')}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="field-label">Descripción del Concepto:</div>
                <div class="field-value">${ticketData.concept_description}</div>
              </div>

              ${ticketData.reference_url ? `
              <div class="field">
                <div class="field-label">URL de Referencia:</div>
                <div class="field-value"><a href="${ticketData.reference_url}" target="_blank">${ticketData.reference_url}</a></div>
              </div>
              ` : ''}

              <div class="field">
                <div class="field-label">Feedback de Referencias:</div>
                <div class="field-value">${ticketData.reference_feedback}</div>
              </div>

              <div class="footer">
                <p><strong>¡Gracias por tu solicitud!</strong></p>
                <p>Ya estamos revisando tu solicitud y estaremos trabajando pronto en ella.</p>
                <p>Nos pondremos en contacto contigo pronto.</p>
                <p style="margin-top: 20px; font-size: 0.9em;">
                  Este es un correo automático generado por el sistema de tickets de Novativa.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to support with CC to client
    const emailResponse = await resend.emails.send({
      from: "Novativa Tickets <onboarding@resend.dev>",
      to: ["soporte@novativa.org"],
      cc: [ticketData.applicant_email],
      subject: `Nueva Solicitud de Diseño - Ticket #${ticketNumber}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-ticket-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
