import { BOUTIQUE_CATEGORIES, CATEGORY_DETAILS } from '../constants/categories.js';

/**
 * Controller to handle catalog categories requests.
 * GET /api/catalog/categories
 */
export function getCategories(req, res, next) {
  try {
    return res.status(200).json({
      success: true,
      count: BOUTIQUE_CATEGORIES.length,
      categories: BOUTIQUE_CATEGORIES,
      details: CATEGORY_DETAILS
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getCategories
};

