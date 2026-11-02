import nodemailer from 'nodemailer';
import config from '../config/env.js';

let transporter = null;

/**
 * Initializes and returns the Nodemailer transporter instance.
 */
export function getTransporter() {
  if (transporter) return transporter;

  const { host, port, secure, user, pass } = config.smtp;

  // If user and pass are provided, initialize standard SMTP transport
  if (user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: config.isProduction
      }
    });
  } else {
    // Development / Mock Transporter when SMTP credentials are not yet set
    // Prints email to stdout and simulates successful dispatch without network errors
    transporter = nodemailer.createTransport({
      jsonTransport: true
    });
  }

  return transporter;
}

/**
 * Tests connection to the SMTP server.
 */
export async function verifySmtpConnection() {
  const { user, pass } = config.smtp;
  if (!user || !pass) {
    return {
      connected: false,
      mode: 'mock',
      message: 'SMTP credentials not configured. Running in simulated dispatch mode.'
    };
  }

  try {
    const transport = getTransporter();
    await transport.verify();
    return {
      connected: true,
      mode: 'live',
      message: 'SMTP server connection verified successfully.'
    };
  } catch (err) {
    return {
      connected: false,
      mode: 'error',
      message: err.message
    };
  }
}

/**
 * Generates the luxury HTML email template for Madeena Dresses boutique notifications.
 */
export function generateInquiryEmailHtml(inquiry) {
  const {
    orderReference,
    customerName,
    email,
    phone,
    category,
    itemSelected,
    customRequirements,
    selectedSize,
    deliveryAddress,
    urgentDeliveryDate,
    submittedAt
  } = inquiry;

  // Clean phone number for WhatsApp link (remove spaces, +, hyphens)
  const numericPhone = phone.replace(/\D/g, '');
  const waPhone = numericPhone.length === 10 ? `91${numericPhone}` : numericPhone;
  const waText = encodeURIComponent(
    `Hello ${customerName}, Madeena Dresses here regarding your inquiry for ${itemSelected} (Ref #${orderReference}).`
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Order Inquiry - Madeena Dresses</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #4A0E17;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" style="max-width: 640px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(183, 110, 121, 0.3); box-shadow: 0 10px 30px rgba(74, 14, 23, 0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #4A0E17 0%, #721625 60%, #9E2A3B 100%); padding: 35px 30px; text-align: center; color: #ffffff;">
              <span style="display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #D4AF37; font-weight: 700; margin-bottom: 6px;">
                Home Boutique Notification
              </span>
              <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px; color: #ffffff;">
                Madeena Dresses
              </h1>
              <p style="margin: 0; font-size: 13px; color: #E6C2C7; font-style: italic;">
                Where Elegance Meets Tradition • New Customer Order Inquiry
              </p>
            </td>
          </tr>

          <!-- Reference Banner -->
          <tr>
            <td style="background-color: #FFF0F3; padding: 14px 30px; border-bottom: 1px solid rgba(183, 110, 121, 0.2);">
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-size: 12px; color: #721625; font-weight: 600;">
                    REFERENCE: <strong style="font-size: 14px; color: #4A0E17; font-family: monospace;">#${orderReference}</strong>
                  </td>
                  <td align="right" style="font-size: 11px; color: #721625;">
                    ${submittedAt || new Date().toLocaleString()}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Customer Profile Card -->
              <table role="presentation" width="100%" style="background-color: #FAF8F5; border-radius: 14px; padding: 18px; margin-bottom: 24px; border: 1px solid rgba(183, 110, 121, 0.2);">
                <tr>
                  <td colspan="2" style="padding-bottom: 10px; border-bottom: 1px solid rgba(183, 110, 121, 0.15); font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: #B76E79;">
                    Customer Details
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px; font-size: 13px; color: #721625; width: 35%; font-weight: 600;">Name:</td>
                  <td style="padding-top: 12px; font-size: 14px; color: #4A0E17; font-weight: 700;">${customerName}</td>
                </tr>
                <tr>
                  <td style="padding-top: 8px; font-size: 13px; color: #721625; font-weight: 600;">Phone:</td>
                  <td style="padding-top: 8px; font-size: 14px; color: #4A0E17; font-weight: 600;">
                    <a href="tel:${phone}" style="color: #4A0E17; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px; font-size: 13px; color: #721625; font-weight: 600;">Email:</td>
                  <td style="padding-top: 8px; font-size: 14px; color: #4A0E17;">
                    <a href="mailto:${email}" style="color: #B76E79; text-decoration: underline;">${email}</a>
                  </td>
                </tr>
                ${deliveryAddress ? `
                <tr>
                  <td style="padding-top: 8px; font-size: 13px; color: #721625; font-weight: 600;">Delivery Address:</td>
                  <td style="padding-top: 8px; font-size: 13px; color: #4A0E17;">${deliveryAddress}</td>
                </tr>` : ''}
              </table>

              <!-- Order / Selection Card -->
              <table role="presentation" width="100%" style="background-color: #FAF8F5; border-radius: 14px; padding: 18px; margin-bottom: 24px; border: 1px solid rgba(183, 110, 121, 0.2);">
                <tr>
                  <td colspan="2" style="padding-bottom: 10px; border-bottom: 1px solid rgba(183, 110, 121, 0.15); font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: #B76E79;">
                    Boutique Selection
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px; font-size: 13px; color: #721625; width: 35%; font-weight: 600;">Category:</td>
                  <td style="padding-top: 12px; font-size: 14px; color: #4A0E17; font-weight: 700;">
                    <span style="background-color: #FFF0F3; color: #721625; padding: 3px 10px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(183, 110, 121, 0.3);">
                      ${category}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px; font-size: 13px; color: #721625; font-weight: 600;">Item Selected:</td>
                  <td style="padding-top: 10px; font-size: 15px; color: #4A0E17; font-weight: 700;">${itemSelected}</td>
                </tr>
                ${selectedSize ? `
                <tr>
                  <td style="padding-top: 8px; font-size: 13px; color: #721625; font-weight: 600;">Size / Tailoring:</td>
                  <td style="padding-top: 8px; font-size: 13px; color: #4A0E17;">${selectedSize}</td>
                </tr>` : ''}
                ${urgentDeliveryDate ? `
                <tr>
                  <td style="padding-top: 8px; font-size: 13px; color: #721625; font-weight: 600;">Target Date:</td>
                  <td style="padding-top: 8px; font-size: 13px; color: #4A0E17;">${urgentDeliveryDate}</td>
                </tr>` : ''}
              </table>

              <!-- Custom Requirements Section -->
              ${customRequirements ? `
              <div style="background-color: #fff9fa; border-left: 4px solid #B76E79; border-radius: 4px; padding: 14px 18px; margin-bottom: 26px;">
                <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #B76E79; font-weight: 700;">
                  Custom Sizing & Tailoring Notes:
                </p>
                <p style="margin: 0; font-size: 13px; color: #4A0E17; line-height: 1.5; font-style: italic;">
                  "${customRequirements}"
                </p>
              </div>` : ''}

              <!-- Action Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="https://wa.me/${waPhone}?text=${waText}" target="_blank" style="display: block; width: 100%; max-width: 280px; background-color: #25D366; color: #ffffff; text-align: center; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-sizing: border-box;">
                      💬 Chat Customer on WhatsApp
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Regarding%20Your%20Madeena%20Dresses%20Inquiry%20%23${orderReference}" style="display: block; width: 100%; max-width: 280px; background-color: #4A0E17; color: #ffffff; text-align: center; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-sizing: border-box;">
                      ✉️ Reply Directly via Email
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF8F5; padding: 20px; text-align: center; border-top: 1px solid rgba(183, 110, 121, 0.2); font-size: 11px; color: #721625;">
              Madeena Dresses Home Boutique • Charminar Area, Hyderabad<br />
              Automated Boutique Inquiry Notification System
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates the plain text email fallback.
 */
export function generateInquiryEmailText(inquiry) {
  const {
    orderReference,
    customerName,
    email,
    phone,
    category,
    itemSelected,
    customRequirements,
    selectedSize,
    deliveryAddress,
    urgentDeliveryDate,
    submittedAt
  } = inquiry;

  return `
==================================================
MADEENA DRESSES - NEW ORDER INQUIRY
==================================================
Reference: #${orderReference}
Date: ${submittedAt || new Date().toLocaleString()}

CUSTOMER DETAILS:
- Name: ${customerName}
- Phone: ${phone}
- Email: ${email}
${deliveryAddress ? `- Delivery Address: ${deliveryAddress}` : ''}

BOUTIQUE SELECTION:
- Category: ${category}
- Item Selected: ${itemSelected}
${selectedSize ? `- Size / Tailoring: ${selectedSize}` : ''}
${urgentDeliveryDate ? `- Target Date: ${urgentDeliveryDate}` : ''}

CUSTOM REQUIREMENTS:
${customRequirements || 'None specified.'}

==================================================
Recipient: ${config.storeEmail}
Madeena Dresses Home Boutique, Hyderabad
==================================================
  `.trim();
}

/**
 * Sends automated email dispatch to the boutique owner's inbox.
 */
export async function sendInquiryNotification(inquiry) {
  const transport = getTransporter();
  const recipient = config.storeEmail;
  const subject = `✨ New Luxury Order Inquiry: #${inquiry.orderReference} - ${inquiry.customerName} (${inquiry.category})`;

  const html = generateInquiryEmailHtml(inquiry);
  const text = generateInquiryEmailText(inquiry);

  const mailOptions = {
    from: config.smtp.from,
    to: recipient,
    replyTo: inquiry.email,
    subject,
    text,
    html
  };

  const info = await transport.sendMail(mailOptions);

  return {
    success: true,
    messageId: info.messageId || `msg-${Date.now()}`,
    recipient,
    subject,
    simulated: !config.smtp.user || !config.smtp.pass
  };
}

export default {
  getTransporter,
  verifySmtpConnection,
  generateInquiryEmailHtml,
  generateInquiryEmailText,
  sendInquiryNotification
};

