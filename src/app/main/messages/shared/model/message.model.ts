export interface Message {
    content?: string;
    createdTime?: Date;
    fromUser?: number;
    params?: {
        cost: number;
    }
    status?: number;
    title?: string;
    toUser?: number;
    type?: number;
    updatedTime?: Date;
    _id?: string;
}