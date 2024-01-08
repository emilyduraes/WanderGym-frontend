export interface Business {
    id?: number; //optional value
    name: string;
    email: string;
    phoneNumber: number;
    address: string;
    description: string;
    type: string;
    active?: boolean; //optional value
}
