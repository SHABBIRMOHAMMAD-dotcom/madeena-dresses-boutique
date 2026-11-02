import { EventEmitter } from 'events';
import { Readable } from 'stream';
import app from '../src/app.js';
import { BOUTIQUE_CATEGORIES } from '../src/constants/categories.js';

/**
 * Creates a robust mock request stream and mock response object
 * that exercises the entire Express application stack seamlessly.
 */
function invokeApp(method, url, body = null, headers = {}) {
  return new Promise((resolve) => {
    const bodyStr = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;

    const socket = new EventEmitter();
    socket.remoteAddress = '127.0.0.1';
    socket.remotePort = 12345;
    socket.encrypted = false;
    socket.destroy = () => socket;
    socket.cork = () => {};
    socket.uncork = () => {};
    socket.write = () => true;

    const req = new Readable({
      read() {
        if (bodyStr) {
          this.push(bodyStr);
        }
        this.push(null);
      }
    });

    req.method = method.toUpperCase();
    req.url = url;
    req.originalUrl = url;
    req.headers = {
      'content-type': 'application/json',
      ...headers
    };
    if (bodyStr) {
      req.headers['content-length'] = Buffer.byteLength(bodyStr).toString();
    }
    req.connection = socket;
    req.socket = socket;
    req.complete = true;
    req._destroy = (err, cb) => {
      if (cb) cb(null);
    };

    // Build mock response
    const res = new EventEmitter();
    res.statusCode = 200;
    res.headersSent = false;
    res._headers = {};

    res.setHeader = (key, value) => {
      res._headers[key.toLowerCase()] = value;
      return res;
    };
    res.getHeader = (key) => res._headers[key.toLowerCase()];
    res.get = res.getHeader;
    res.header = res.setHeader;
    res.removeHeader = (key) => {
      delete res._headers[key.toLowerCase()];
      return res;
    };
    res.getHeaders = () => ({ ...res._headers });

    res.status = (code) => {
      res.statusCode = code;
      return res;
    };

    res.sendStatus = (code) => {
      res.statusCode = code;
      return res.send('');
    };

    res.json = (data) => {
      res.setHeader('content-type', 'application/json');
      return res.send(JSON.stringify(data));
    };

    res.send = (content) => {
      res.headersSent = true;
      let parsed = content;
      try {
        if (typeof content === 'string') {
          parsed = JSON.parse(content);
        }
      } catch {}

      res.emit('finish');

      resolve({
        status: res.statusCode,
        headers: res._headers,
        data: parsed
      });

      return res;
    };

    res.end = (chunk) => {
      if (chunk) {
        return res.send(chunk.toString());
      }
      return res.send('');
    };

    // Dispatch request through Express
    app(req, res);
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function runTests() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║        🧪 MADEENA DRESSES BACKEND API TEST SUITE              ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  
  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Reason: ${err.message}`);
      failed++;
    }
  };

  // Test 1: Health check endpoint
  await test('GET /api/health returns 200 and healthy status', async () => {
    const res = await invokeApp('GET', '/api/health');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.status === 'healthy', 'Expected status: healthy');
    assert(res.data.boutique === 'Madeena Dresses', 'Expected boutique name');
  });

  // Test 2: Categories endpoint
  await test('GET /api/catalog/categories returns all 11 required categories', async () => {
    const res = await invokeApp('GET', '/api/catalog/categories');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, 'Expected success: true');
    assert(Array.isArray(res.data.categories), 'Expected categories array');
    assert(res.data.count === 11, `Expected 11 categories, got ${res.data.count}`);

    const expectedCategories = [
      'Lehengas',
      'Scarfs',
      'Cotton Dresses',
      'Long Frogs',
      'Sarees',
      'Burqas',
      'Party Wear',
      'Home Essentials',
      'Tops & Leggings',
      'Punjabi Dresses',
      'Pakistani Suits'
    ];

    for (const cat of expectedCategories) {
      assert(
        res.data.categories.includes(cat),
        `Missing expected category: ${cat}`
      );
    }
  });

  // Test 3: Validation failure on empty payload
  await test('POST /api/inquiries returns 400 when body is empty', async () => {
    const res = await invokeApp('POST', '/api/inquiries', {});
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, 'Expected success: false');
    assert(Array.isArray(res.data.errors), 'Expected errors array');
    assert(res.data.errors.length >= 5, 'Expected validation errors for required fields');
  });

  // Test 4: Validation failure on invalid email
  await test('POST /api/inquiries returns 400 for invalid email format', async () => {
    const res = await invokeApp('POST', '/api/inquiries', {
      customerName: 'Farheen Sultana',
      email: 'not-an-email',
      phone: '+91 95057 85254',
      category: 'Lehengas',
      itemSelected: 'Maharani Zardozi Bridal Lehenga'
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(
      res.data.errors.some((e) => e.includes('valid email')),
      'Expected invalid email error'
    );
  });

  // Test 5: Validation failure on invalid category
  await test('POST /api/inquiries returns 400 for unrecognized category', async () => {
    const res = await invokeApp('POST', '/api/inquiries', {
      customerName: 'Farheen Sultana',
      email: 'farheen@example.com',
      phone: '+91 95057 85254',
      category: 'Space Suits',
      itemSelected: 'Apollo 11 Suit'
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(
      res.data.errors.some((e) => e.includes('Invalid category')),
      'Expected invalid category error'
    );
  });

  // Test 6: Successful inquiry creation with full payload
  await test('POST /api/inquiries creates inquiry and triggers email dispatch', async () => {
    const inquiryPayload = {
      customerName: 'Zainab Fatima',
      email: 'zainab.fatima@example.com',
      phone: '+91 93989 74922',
      category: 'Pakistani Suits',
      itemSelected: 'Sultana Chiffon 3-Piece Luxury Suit',
      customRequirements: 'Bust 48 inches (XXL), with lining for sleeves',
      selectedSize: 'XXL',
      deliveryAddress: 'House 4-1-82, Charminar, Hyderabad'
    };

    const res = await invokeApp('POST', '/api/inquiries', inquiryPayload);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.success === true, 'Expected success: true');
    assert(res.data.data.customerName === 'Zainab Fatima', 'Customer name match');
    assert(res.data.data.category === 'Pakistani Suits', 'Category match');
    assert(res.data.data.orderReference.startsWith('MD-'), 'Order reference format MD-YYYY-XXXXX');
    assert(res.data.data.emailDispatched === true, 'Email dispatched flag');
  });

  // Test 7: Frontend aliased field names
  await test('POST /api/inquiries normalizes frontend field aliases (fullName, phoneNumber, etc.)', async () => {
    const aliasedPayload = {
      fullName: 'Ayesha Siddiqua',
      emailAddress: 'ayesha@example.com',
      phoneNumber: '+91 98490 11223',
      category: 'Burqas',
      selectedItemName: 'Dubai Modest Rose Gold Abaya',
      customRequirements: 'Length 56 inches'
    };

    const res = await invokeApp('POST', '/api/inquiries', aliasedPayload);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.data.customerName === 'Ayesha Siddiqua', 'Normalized customerName');
    assert(res.data.data.email === 'ayesha@example.com', 'Normalized email');
    assert(res.data.data.itemSelected === 'Dubai Modest Rose Gold Abaya', 'Normalized itemSelected');
  });

  // Test 8: List inquiries endpoint
  await test('GET /api/inquiries returns logged inquiries audit trail', async () => {
    const res = await invokeApp('GET', '/api/inquiries');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, 'Expected success: true');
    assert(Array.isArray(res.data.data), 'Expected inquiries array');
    assert(res.data.count >= 2, 'Expected at least 2 inquiries from previous tests');
  });

  // Test 9: CORS Headers
  await test('OPTIONS pre-flight returns appropriate CORS headers for localhost:5173', async () => {
    const res = await invokeApp('OPTIONS', '/api/inquiries', null, {
      origin: 'http://localhost:5173',
      'access-control-request-method': 'POST'
    });
    assert(res.status === 204 || res.status === 200, `Expected 204/200, got ${res.status}`);
    assert(
      res.headers['access-control-allow-origin'] === 'http://localhost:5173',
      `CORS header allow-origin mismatch: ${res.headers['access-control-allow-origin']}`
    );
  });

  // Test 10: 404 Handler for undefined routes
  await test('GET /api/unknown returns 404 Not Found JSON', async () => {
    const res = await invokeApp('GET', '/api/unknown');
    assert(res.status === 404, `Expected 404, got ${res.status}`);
    assert(res.data.error === 'Not Found', 'Expected 404 Not Found error');
  });

  console.log(`\n═══════════════════════════════════════════════════════════════`);
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`═══════════════════════════════════════════════════════════════`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL MADEENA DRESSES BACKEND TESTS COMPLETED SUCCESSFULLY!\n');
    process.exit(0);
  }
}

runTests();
