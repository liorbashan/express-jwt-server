import { IAuthentication } from './../interfaces/IAuthentication';
import { LoginRequest } from './../models/login/loginRequest';
import { User } from '../models';

export class LoginService {
    constructor(private _authenticationService: IAuthentication) {}

    public async login(loginRequest: LoginRequest): Promise<string> {
        const user: User | void = await this._authenticationService.authenticate(loginRequest.email, loginRequest.password).catch((err) => {});
        return '';
    }
}
