export interface User {
    id?: number; //optional value
    fullName: string;
    email: string;
    dob: Date;
    mobileNumber: number;
    address: string;
    active?: boolean; //optional value
}
