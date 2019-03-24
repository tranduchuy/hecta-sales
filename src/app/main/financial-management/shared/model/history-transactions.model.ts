export interface Transactions {
    aCredit?: number;
    aMain1?: number;
    aMain2?: number;
    aPromo?: number;
    amount?: number;
    bCredit?: number;
    bMain1?: number;
    bMain2?: number;
    bPromo?: number;
    content?: string;
    createdAt?: Date;
    fromUserId?: number;
    id?: number;
    info?: {
        id: string;
        title: string;
    };
    note?: string;
    type?: number;
    updatedAt?: Date;
    userId?: number;
}