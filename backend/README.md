# Madeena Dresses - Production-Ready Backend API

Official Node.js & Express backend API for **Madeena Dresses Home Boutique**, Hyderabad ("Where Elegance Meets Tradition").

---

## 🏛️ System Architecture

```
backend/
├── src/
│   ├── config/
│   │   └── env.js                  # Centralized configuration & environment loader
│   ├── constants/
│   │   └── categories.js           # 11 Official boutique product categories & metadata
│   ├── controllers/
│   │   ├── catalogController.js    # Catalog categories endpoint handler
│   │   └── inquiryController.js    # Order inquiries endpoint handler
│   ├── middleware/
│   │   ├── errorHandler.js         # Centralized error handler (400, 404, 500)
│   │   ├── requestLogger.js        # High-precision HTTP request logging
│   │   └── validateRequest.js      # Input sanitization and error response
│   ├── routes/
│   │   ├── catalogRoutes.js        # /api/catalog/*
│   │   ├── inquiryRoutes.js        # /api/inquiries
│   │   └── index.js                # Consolidated API router & health check
│   ├── services/
│   │   ├── emailService.js         # Nodemailer SMTP automated dispatch & HTML template
│   │   └── inquiryService.js       # Order reference generation & inquiry auditing
│   ├── validators/
│   │   └── inquiryValidator.js     # Data validation & field normalization rules
│   ├── app.js                      # Express app setup, CORS, and middleware stack
│   └── server.js                   # Server entrypoint with graceful shutdown
├── tests/
│   └── api.test.js                 # 10-point end-to-end automated API test suite
├── .env                            # Active environment configuration
├── .env.example                    # Environment configuration template
└── package.json                    # Project metadata and dependencies
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your details:
```bash
cp .env.example .env
```

Key environment variables:
```ini
PORT=5000
NODE_ENV=development
STORE_EMAIL=shabbirmohammad413@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
EMAIL_FROM="Madeena Dresses Boutique" <orders@madeenadresses.com>
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Start Server
```bash
# Production mode
npm start

# Development mode with hot-reloading
npm run dev
```

Server will start on `http://localhost:5000`.

---

## 📡 API Endpoints

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Description:** Verifies service health, uptime, and boutique status.
- **Response:** `200 OK`
```json
{
  "status": "healthy",
  "boutique": "Madeena Dresses",
  "environment": "development",
  "uptimeSeconds": 12,
  "timestamp": "2026-11-02T04:00:00.000Z"
}
```

---

### 2. Catalog Categories
- **Endpoint:** `GET /api/catalog/categories`
- **Description:** Returns JSON list of all 11 boutique product categories.
- **Response:** `200 OK`
```json
{
  "success": true,
  "count": 11,
  "categories": [
    "Lehengas",
    "Scarfs",
    "Cotton Dresses",
    "Long Frogs",
    "Sarees",
    "Burqas",
    "Party Wear",
    "Home Essentials",
    "Tops & Leggings",
    "Punjabi Dresses",
    "Pakistani Suits"
  ],
  "details": [ ... ]
}
```

---

### 3. Submit Customer Order / Product Inquiry
- **Endpoint:** `POST /api/inquiries`
- **Description:** Accepts customer inquiry payload, validates all fields, securely logs the request, and triggers automated email notification to the boutique owner's inbox (`STORE_EMAIL`).
- **Headers:** `Content-Type: application/json`

#### Validation Rules & Schema:
| Field | Type | Required | Description |
|---|---|---|---|
| `customerName` | String | **Yes** | Customer's full name (2–100 chars). Also accepts alias `fullName`. |
| `email` | String | **Yes** | Valid RFC 5322 email string. Also accepts alias `emailAddress`. |
| `phone` | String | **Yes** | Valid phone number with 7–15 digits. Also accepts alias `phoneNumber`. |
| `category` | String | **Yes** | One of the 11 boutique categories (e.g., Lehengas, Pakistani Suits, Burqas, Sarees, etc.). |
| `itemSelected` | String | **Yes** | Name of the dress or item chosen. Also accepts alias `selectedItemName`. |
| `customRequirements`| String | Optional | Custom stitching, measurements, lining preferences, or special requests. |
| `selectedSize` | String | Optional | Preferred size (e.g., S, M, L, XL, XXL, Custom Bridal Stitching). |
| `deliveryAddress` | String | Optional | Complete shipping and delivery address. |
| `urgentDeliveryDate`| String | Optional | Preferred target date for delivery. |

#### Request Example:
```json
{
  "customerName": "Zainab Fatima",
  "email": "zainab.fatima@example.com",
  "phone": "+91 93989 74922",
  "category": "Pakistani Suits",
  "itemSelected": "Sultana Chiffon 3-Piece Luxury Suit",
  "customRequirements": "Bust 48 inches (XXL), with extra lining for sleeves",
  "selectedSize": "XXL",
  "deliveryAddress": "House 4-1-82, Charminar Area, Hyderabad"
}
```

#### Success Response: `201 Created`
```json
{
  "success": true,
  "message": "Order inquiry received and dispatched successfully to Madeena Dresses boutique inbox.",
  "data": {
    "orderReference": "MD-2026-65190",
    "customerName": "Zainab Fatima",
    "email": "zainab.fatima@example.com",
    "phone": "+91 93989 74922",
    "category": "Pakistani Suits",
    "itemSelected": "Sultana Chiffon 3-Piece Luxury Suit",
    "customRequirements": "Bust 48 inches (XXL), with extra lining for sleeves",
    "selectedSize": "XXL",
    "deliveryAddress": "House 4-1-82, Charminar Area, Hyderabad",
    "submittedAt": "2026-11-02T04:00:09.239Z",
    "emailDispatched": true
  }
}
```

#### Validation Error Response: `400 Bad Request`
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Please correct the errors in your submission.",
  "errors": [
    "email must be a valid email address (e.g. customer@example.com).",
    "Invalid category \"Space Suits\". Must be one of: Lehengas, Scarfs, Cotton Dresses, Long Frogs, Sarees, Burqas, Party Wear, Home Essentials, Tops & Leggings, Punjabi Dresses, Pakistani Suits."
  ]
}
```

---

### 4. Inquiry Audit Log
- **Endpoint:** `GET /api/inquiries`
- **Description:** Lists recent logged customer inquiries with timestamp, references, and email dispatch status.
- **Response:** `200 OK`

---

## ✉️ Automated Email Dispatch Service (Nodemailer)

When a customer submits an inquiry, an automated email notification is dispatched to `STORE_EMAIL` (`shabbirmohammad413@gmail.com`).

### Features:
1. **Boutique Royal Aesthetic:** Designed with Madeena Dresses' signature royal burgundy (`#4A0E17`), rose gold (`#B76E79`), and warm gold styling.
2. **Instant Concierge Actions:** Includes 1-click **WhatsApp Direct Chat** and **Email Reply** action buttons.
3. **Graceful Fallback:** If SMTP credentials are not yet configured or in development mode, the service runs in simulated mode, logging full email details to the console without throwing errors or dropping inquiries.
4. **Gmail Setup Instructions:**
   - Go to Google Account -> Security -> 2-Step Verification -> App Passwords.
   - Generate an App Password named "Madeena Dresses Backend".
   - Set `SMTP_USER=your-email@gmail.com` and `SMTP_PASS=your-16-char-password` in `.env`.

---

## 🛡️ Security & Middleware Standards
- **CORS Whitelist:** Preconfigured for `localhost:5173`, `localhost:3000`, `127.0.0.1:5173`, and `127.0.0.1:3000`. Configurable via `CORS_ORIGIN`.
- **Security Headers:** Enforces `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`.
- **Payload Limits:** 1MB body parser limit protects against memory exhaustion attacks.
- **Centralized Error Handling:** Formatted JSON error responses (400, 403, 404, 500) hiding internal stack traces in production.

