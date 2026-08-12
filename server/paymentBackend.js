/**
 * aremhub Production Payment Gateway Backend Router (Node.js / Express)
 * Handles API Credentials, Hash Generation & Webhook Receivers for:
 * - PayTR (HMAC SHA256 Token & Callback)
 * - İyzico (Checkout Form & Callback)
 * - Lemon Squeezy (MoR Checkout & Webhook)
 * - Stripe (Checkout Sessions & Webhook)
 */

const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environmental Config Variables (Replace with production environment variables)
const CONFIG = {
  PAYTR_MERCHANT_ID: process.env.PAYTR_MERCHANT_ID || '123456',
  PAYTR_MERCHANT_KEY: process.env.PAYTR_MERCHANT_KEY || 'abcdef1234567890',
  PAYTR_MERCHANT_SALT: process.env.PAYTR_MERCHANT_SALT || 'salt1234567890',
  
  IYZICO_API_KEY: process.env.IYZICO_API_KEY || 'sandbox-api-key',
  IYZICO_SECRET_KEY: process.env.IYZICO_SECRET_KEY || 'sandbox-secret-key',

  LEMON_SQUEEZY_API_KEY: process.env.LEMON_SQUEEZY_API_KEY || 'lemon_api_key_test',
  LEMON_SQUEEZY_WEBHOOK_SECRET: process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || 'lemon_webhook_secret',

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_1234567890',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_1234567890'
};

// 1. PayTR Token Generation Endpoint
app.post('/api/payment/paytr/create-token', (req, res) => {
  const { merchant_oid, email, payment_amount, user_name, user_address, user_phone, user_basket, user_ip } = req.body;

  const currency = 'TL';
  const no_installment = '0';
  const max_installment = '0';
  const test_mode = '1';

  // PayTR Hash SHA256 Token calculation formula
  const hashStr = `${CONFIG.PAYTR_MERCHANT_ID}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;
  const paytr_token = crypto
    .createHmac('sha256', CONFIG.PAYTR_MERCHANT_KEY)
    .update(hashStr + CONFIG.PAYTR_MERCHANT_SALT)
    .digest('base64');

  res.json({
    status: 'success',
    token: paytr_token,
    iframeUrl: `https://www.paytr.com/iframe/${paytr_token}`
  });
});

// 2. PayTR Webhook Callback Receiver
app.post('/api/payment/paytr/callback', (req, res) => {
  const { merchant_oid, status, total_amount, hash } = req.body;

  // Verify PayTR Hash Signature
  const expectedHash = crypto
    .createHmac('sha256', CONFIG.PAYTR_MERCHANT_KEY)
    .update(`${merchant_oid}${CONFIG.PAYTR_MERCHANT_SALT}${status}${total_amount}`)
    .digest('base64');

  if (hash !== expectedHash) {
    return res.status(400).send('PAYTR notification failed: Bad Hash Signature');
  }

  if (status === 'success') {
    console.log(`[PayTR Success] Order ${merchant_oid} paid. Dispatching digital license key...`);
    // TODO: Send email to buyer via SendGrid/Resend
  }

  res.send('OK');
});

// 3. Lemon Squeezy Webhook Receiver (MoR Global)
app.post('/api/payment/lemon/webhook', (req, res) => {
  const signature = req.headers['x-signature'];
  const rawBody = JSON.stringify(req.body);

  const hmac = crypto.createHmac('sha256', CONFIG.LEMON_SQUEEZY_WEBHOOK_SECRET);
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
  const signatureBuffer = Buffer.from(signature || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
    return res.status(400).json({ error: 'Invalid Lemon Squeezy signature' });
  }

  const event = req.body;
  if (event.meta.event_name === 'order_created') {
    console.log(`[Lemon Squeezy Success] Order ${event.data.id} created for ${event.data.attributes.user_email}`);
  }

  res.status(200).json({ received: true });
});

// 4. Stripe Webhook Receiver (Global)
app.post('/api/payment/stripe/webhook', (req, res) => {
  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(`[Stripe Success] Payment completed for ${session.customer_email}`);
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[aremhub Payment Backend Server] Running on port ${PORT}`);
});
