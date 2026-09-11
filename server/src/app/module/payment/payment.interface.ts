export interface ICreateCheckoutSession {
    userId: string;
    requestId?: string;
    amount: number; // In USD or BDT
}