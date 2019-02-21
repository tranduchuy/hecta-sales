export interface User {
    username: string;
    email: string;
    password: string;
    retypePassword: string;
    birth: Date;
    phone: number;
    name: string;
    gender: string;
    city: string;
    district: number;
    ward: number;
    type: number;
    captchaToken?: string;
}
