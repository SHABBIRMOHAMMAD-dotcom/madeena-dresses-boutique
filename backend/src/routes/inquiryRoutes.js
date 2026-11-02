import express from 'express';
import inquiryController from '../controllers/inquiryController.js';
import { inquiryValidationMiddleware } from '../validators/inquiryValidator.js';

const router = express.Router();

/**
 * @route   POST /api/inquiries
 * @desc    Accepts customer order/inquiry data, validates schema, logs securely, and triggers email notification
 * @access  Public
 */
router.post('/', inquiryValidationMiddleware, inquiryController.createInquiry);

/**
 * @route   GET /api/inquiries
 * @desc    List recent customer inquiries (for boutique management/verification)
 * @access  Public/Internal
 */
router.get('/', inquiryController.listInquiries);

export default router;

