import Stripe from 'stripe';
import { prisma } from '../../lib/prisma';
import { ICreateCheckoutSession } from './payment.interface';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,);

const createCheckoutSession = async (payload: ICreateCheckoutSession) => {
    const { userId, requestId, amount } = payload;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Emergency Donation Support',
                    },
                    unit_amount: amount * 100, // Cents
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/cancel`,
        metadata: {
            userId,
            requestId: requestId || '',
        },
    });

    if (requestId) {
        const request = await prisma.bloodRequest.findUnique({
            where: { id: requestId },
        });

        console.log('Payment requestId:', requestId);
        console.log('Found BloodRequest:', request);

        if (!request) {
            throw new Error('Blood request not found');
        }
    }

    await prisma.payment.create({
        data: {
            stripePaymentIntentId: session.id,
            amount,
            currency: 'usd',
            status: 'PENDING',
            userId,
            requestId: requestId || null,
        },
    });

    return { url: session.url };
};

const handleWebhook = async (signature: string, rawBody: Buffer) => {
    const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        await prisma.payment.update({
            where: { stripePaymentIntentId: session.id },
            data: { status: 'SUCCEEDED' },
        });
    }

    return { received: true };
};

export const PaymentService = {
    createCheckoutSession,
    handleWebhook,
};