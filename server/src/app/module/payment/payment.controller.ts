import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { PaymentService } from './payment.service';

export const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.createCheckoutSession(req.body);

    return res.status(200).json({
        success: true,
        message: 'Payment session created successfully',
        data: result, // { url: "https://checkout.stripe.com/c/pay/..." }
    });
});

export const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;
    const result = await PaymentService.handleWebhook(signature, req.body);

    return res.status(200).json(result);
});