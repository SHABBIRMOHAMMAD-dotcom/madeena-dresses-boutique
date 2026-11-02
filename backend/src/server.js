import app from './app.js';
import config from './config/env.js';
import { verifySmtpConnection } from './services/emailService.js';

const PORT = config.port;

const server = app.listen(PORT, async () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║               👑 MADEENA DRESSES BOUTIQUE API 👑              ║
║                Where Elegance Meets Tradition                 ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  🚀 Server running on: http://localhost:${PORT}
  🌍 Environment:       ${config.nodeEnv}
  📬 Store Inbox:       ${config.storeEmail}
  🛡️  CORS Allowed:     ${config.corsOrigins.join(', ')}

  AVAILABLE ENDPOINTS:
  • GET  /api/health
  • GET  /api/catalog/categories
  • POST /api/inquiries
  • GET  /api/inquiries (Audit log)
  `);

  // Verify SMTP in the background
  try {
    const smtpStatus = await verifySmtpConnection();
    if (smtpStatus.connected) {
      console.log(`✅ [SMTP] Live connection established to: ${config.smtp.host}:${config.smtp.port}`);
    } else {
      console.log(`ℹ️  [SMTP] Running in ${smtpStatus.mode} mode: ${smtpStatus.message}`);
    }
  } catch (err) {
    console.warn(`⚠️ [SMTP] Verification note: ${err.message}`);
  }
});

// Handle graceful shutdown
const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Gracefully closing Madeena Dresses server...`);
  server.close(() => {
    console.log('✅ Server closed cleanly. Process exiting.');
    process.exit(0);
  });

  // Force close after 5 seconds if lingering connections exist
  setTimeout(() => {
    console.error('⚠️ Forcefully terminating remaining active connections.');
    process.exit(1);
  }, 5000);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default server;

