import inquiryService from '../services/inquiryService.js';

/**
 * Controller to handle customer order/inquiry submission.
 * POST /api/inquiries
 */
export async function createInquiry(req, res, next) {
  try {
    const validatedData = req.validatedInquiry;

    const result = await inquiryService.processCustomerInquiry(validatedData);

    return res.status(201).json({
      success: true,
      message: 'Order inquiry received and dispatched successfully to Madeena Dresses boutique inbox.',
      data: {
        orderReference: result.inquiry.orderReference,
        customerName: result.inquiry.customerName,
        email: result.inquiry.email,
        phone: result.inquiry.phone,
        category: result.inquiry.category,
        itemSelected: result.inquiry.itemSelected,
        customRequirements: result.inquiry.customRequirements,
        selectedSize: result.inquiry.selectedSize,
        deliveryAddress: result.inquiry.deliveryAddress,
        submittedAt: result.inquiry.submittedAt,
        emailDispatched: result.inquiry.emailDispatched
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to list recent inquiries (admin/debugging).
 * GET /api/inquiries
 */
export function listInquiries(req, res, next) {
  try {
    const inquiries = inquiryService.getRecentInquiries();
    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
}

export default {
  createInquiry,
  listInquiries
};

