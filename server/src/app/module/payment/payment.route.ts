import express, { Router } from 'express';
import { createCheckoutSession, stripeWebhook } from './payment.controller';

const router: Router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export const PaymentRoutes = router;