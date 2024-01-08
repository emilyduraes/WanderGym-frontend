import { Business } from "./business";
import { User } from "./user";

export class Auth {
    username: string;
    password: string;
    role: string;
    user: User;
    business: Business;
    login: Login;
}

export class Login{
    responseCode: string;
    responseMessage: string;
    responseObject: UserAuthResponse;
}

export class UserAuthResponse{
    id: string;
    username: string;
    password: string;
    role: string;
    business: Business;
    user: User;
    basicAuthorization: string;
    authorities: Array<Authorities>;
}

export class Authorities{
    authority: string;
}