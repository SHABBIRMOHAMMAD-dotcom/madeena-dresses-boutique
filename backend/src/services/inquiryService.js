import emailService from './emailService.js';

// In-memory inquiry store for logging and auditing
const inquiryStore = [];

/**
 * Generates a unique, branded boutique order reference ID.
 * Format: MD-YYYY-XXXXX (e.g. MD-2026-78412)
 */
export function generateOrderReference() {
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `MD-${currentYear}-${randomSuffix}`;
}

/**
 * Processes a validated customer inquiry, securely logs the payload,
 * and triggers automated email dispatch to the boutique owner's inbox.
 */
export async function processCustomerInquiry(validatedData) {
  const orderReference = validatedData.orderReference || generateOrderReference();
  const submittedAt = new Date().toISOString();

  const inquiryRecord = {
    orderReference,
    customerName: validatedData.customerName,
    email: validatedData.email,
    phone: validatedData.phone,
    category: validatedData.category,
    itemSelected: validatedData.itemSelected,
    customRequirements: validatedData.customRequirements || 'Standard boutique finishing requested',
    selectedSize: validatedData.selectedSize || 'Custom Fit',
    deliveryAddress: validatedData.deliveryAddress || 'Not specified',
    urgentDeliveryDate: validatedData.urgentDeliveryDate || 'Standard delivery',
    submittedAt,
    status: 'received'
  };

  // Securely log incoming inquiry payload
  console.log(`[INQUIRY RECEIVED] [${submittedAt}] Reference: #${orderReference}`);
  console.log(`- Customer: ${inquiryRecord.customerName} (${inquiryRecord.email}, ${inquiryRecord.phone})`);
  console.log(`- Category: ${inquiryRecord.category} | Item: ${inquiryRecord.itemSelected}`);
  if (inquiryRecord.customRequirements) {
    console.log(`- Custom Notes: ${inquiryRecord.customRequirements}`);
  }

  // Trigger automated email dispatch to mother's inbox
  let emailDispatchResult;
  try {
    emailDispatchResult = await emailService.sendInquiryNotification(inquiryRecord);
    inquiryRecord.emailDispatched = true;
    inquiryRecord.emailMessageId = emailDispatchResult.messageId;
    inquiryRecord.emailRecipient = emailDispatchResult.recipient;
    console.log(`[EMAIL DISPATCH] Successfully triggered notification to: ${emailDispatchResult.recipient} (Mode: ${emailDispatchResult.simulated ? 'Simulated/Dev' : 'Live SMTP'})`);
  } catch (emailErr) {
    console.error(`[EMAIL DISPATCH ERROR] Failed to send email for inquiry #${orderReference}:`, emailErr.message);
    inquiryRecord.emailDispatched = false;
    inquiryRecord.emailError = emailErr.message;
    // Don't throw fatal error if email transport fails; keep record intact
  }

  // Save to in-memory audit store
  inquiryStore.unshift(inquiryRecord);
  if (inquiryStore.length > 500) {
    inquiryStore.pop(); // keep recent 500
  }

  return {
    inquiry: inquiryRecord,
    emailResult: emailDispatchResult
  };
}

/**
 * Returns list of recent inquiries (for admin/audit).
 */
export function getRecentInquiries(limit = 20) {
  return inquiryStore.slice(0, limit);
}

export default {
  generateOrderReference,
  processCustomerInquiry,
  getRecentInquiries
};

