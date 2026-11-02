import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import requestLogger from './middleware/requestLogger.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

// ==========================================
// 1. CORS Configuration
// ==========================================
const allowedOrigins = config.corsOrigins;

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser requests (e.g. curl, postman, server-to-server) where origin is undefined
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed === '*') return true;
      return origin === allowed || origin.startsWith(allowed);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours pre-flight caching
};

app.use(cors(corsOptions));
// Handle preflight across all routes
app.options('*', cors(corsOptions));

// ==========================================
// 2. Request Parsing & Security Middlewares
// ==========================================
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Custom lightweight security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Request Logging Middleware
app.use(requestLogger);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Madeena Dresses Boutique API',
    tagline: 'Where Elegance Meets Tradition',
    status: 'online',
    version: '1.0.0',
    documentation: {
      categories: 'GET /api/catalog/categories',
      inquiries: 'POST /api/inquiries',
      health: 'GET /api/health'
    }
  });
});

// ==========================================
// 3. API Routes
// ==========================================
app.use('/api', apiRouter);
app.use('/', apiRouter);

// ==========================================
// 4. Error Handling Middlewares
// ==========================================
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

