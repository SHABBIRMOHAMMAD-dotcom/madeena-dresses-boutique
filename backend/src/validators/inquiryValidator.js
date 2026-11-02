import { BOUTIQUE_CATEGORIES } from '../constants/categories.js';

/**
 * Standard Email Regex (RFC 5322 compliant subset)
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Phone Number Regex:
 * Allows optional '+' prefix, digits, spaces, hyphens, parentheses.
 * Must contain between 7 and 15 digits (standard E.164 phone range).
 */
const PHONE_CHARS_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

/**
 * Normalizes input payload:
 * Supports standard API keys as well as frontend aliases (e.g., fullName -> customerName).
 */
export function normalizeInquiryPayload(body = {}) {
  const customerName = (body.customerName || body.fullName || '').toString().trim();
  const email = (body.email || body.emailAddress || '').toString().trim().toLowerCase();
  const phone = (body.phone || body.phoneNumber || '').toString().trim();
  const categoryRaw = (body.category || body.categoryName || '').toString().trim();
  const itemSelected = (body.itemSelected || body.selectedItemName || '').toString().trim();
  const customRequirements = (body.customRequirements || body.requirements || body.notes || '').toString().trim();
  const selectedSize = (body.selectedSize || body.size || 'Custom Fit').toString().trim();
  const deliveryAddress = (body.deliveryAddress || body.address || '').toString().trim();
  const urgentDeliveryDate = (body.urgentDeliveryDate || body.targetDate || '').toString().trim();
  const orderReference = (body.orderReference || '').toString().trim();

  // Match category case-insensitively against canonical boutique categories
  const matchedCategory = BOUTIQUE_CATEGORIES.find(
    (c) => c.toLowerCase() === categoryRaw.toLowerCase()
  ) || categoryRaw;

  return {
    customerName,
    email,
    phone,
    category: matchedCategory,
    itemSelected,
    customRequirements,
    selectedSize,
    deliveryAddress,
    urgentDeliveryDate,
    orderReference
  };
}

/**
 * Validates an incoming inquiry payload against schema rules.
 * Returns an object: { isValid: boolean, errors: string[], data: object }
 */
export function validateInquiryPayload(payload) {
  const errors = [];
  const normalized = normalizeInquiryPayload(payload);

  // 1. customerName validation
  if (!normalized.customerName) {
    errors.push('customerName is required and cannot be empty.');
  } else if (normalized.customerName.length < 2) {
    errors.push('customerName must be at least 2 characters long.');
  } else if (normalized.customerName.length > 100) {
    errors.push('customerName cannot exceed 100 characters.');
  }

  // 2. email validation
  if (!normalized.email) {
    errors.push('email is required.');
  } else if (!EMAIL_REGEX.test(normalized.email)) {
    errors.push('email must be a valid email address (e.g. customer@example.com).');
  }

  // 3. phone validation
  if (!normalized.phone) {
    errors.push('phone is required.');
  } else {
    const digitCount = (normalized.phone.match(/\d/g) || []).length;
    if (!PHONE_CHARS_REGEX.test(normalized.phone) || digitCount < 7 || digitCount > 15) {
      errors.push('phone must be a valid phone number containing 7 to 15 digits (e.g. +91 95057 85254).');
    }
  }

  // 4. category validation
  if (!normalized.category) {
    errors.push(
      `category is required. Valid categories: ${BOUTIQUE_CATEGORIES.join(', ')}.`
    );
  } else {
    const categoryExists = BOUTIQUE_CATEGORIES.some(
      (c) => c.toLowerCase() === normalized.category.toLowerCase()
    );
    if (!categoryExists) {
      errors.push(
        `Invalid category "${normalized.category}". Must be one of: ${BOUTIQUE_CATEGORIES.join(', ')}.`
      );
    }
  }

  // 5. itemSelected validation
  if (!normalized.itemSelected) {
    errors.push('itemSelected is required and cannot be empty.');
  } else if (normalized.itemSelected.length < 2) {
    errors.push('itemSelected must be at least 2 characters long.');
  } else if (normalized.itemSelected.length > 200) {
    errors.push('itemSelected cannot exceed 200 characters.');
  }

  // 6. customRequirements validation (optional)
  if (normalized.customRequirements && normalized.customRequirements.length > 1000) {
    errors.push('customRequirements cannot exceed 1000 characters.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: normalized
  };
}

/**
 * Express middleware to validate inquiry requests
 */
export function inquiryValidationMiddleware(req, res, next) {
  const validation = validateInquiryPayload(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      message: 'Please correct the errors in your submission.',
      errors: validation.errors
    });
  }

  // Attach sanitized and normalized data to request object
  req.validatedInquiry = validation.data;
  next();
}

export default {
  normalizeInquiryPayload,
  validateInquiryPayload,
  inquiryValidationMiddleware
};

