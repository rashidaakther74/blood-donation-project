import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { AuthRoutes } from './app/module/auth/auth.route';
import { UserRoutes } from './app/module/user/user.route';
import { RequestRoutes } from './app/module/request/request.routes';
import { PaymentRoutes } from './app/module/payment/payment.route';

const app: Application = express();


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/requests', RequestRoutes);
app.use('/api/payments', PaymentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({ Message: 'Blood Donation & Emergency Platform Server Running...' });
});

app.use(globalErrorHandler);

export default app;