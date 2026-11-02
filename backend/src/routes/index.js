import express from 'express';
import catalogRoutes from './catalogRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';
import config from '../config/env.js';

const router = express.Router();

/**
 * Health Check Endpoint
 * @route GET /api/health
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    boutique: 'Madeena Dresses',
    environment: config.nodeEnv,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mount catalog routes (/api/catalog/categories)
router.use('/catalog', catalogRoutes);

// Mount customer inquiry routes (/api/inquiries)
router.use('/inquiries', inquiryRoutes);

export default router;

