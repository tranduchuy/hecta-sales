export interface Password {
    resetToken: string;
    password: string;
    confirmedPassword: string;
    type: 'APP';
}