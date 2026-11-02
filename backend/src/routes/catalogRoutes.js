import express from 'express';
import catalogController from '../controllers/catalogController.js';

const router = express.Router();

/**
 * @route   GET /api/catalog/categories
 * @desc    Returns list of all Madeena Dresses boutique product categories
 * @access  Public
 */
router.get('/categories', catalogController.getCategories);

export default router;

