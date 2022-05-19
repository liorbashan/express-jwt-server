import { JwtTokenPayload } from './../models/auth/jwtToken';
import { AdAuthenticationService } from './adAuthenticationService';
import { Nullable } from './../models/nullable';
import { LoginResponse } from './../models/login/loginResponse';
import { IAuthentication } from './../interfaces/IAuthentication';
import { LoginRequest } from './../models/login/loginRequest';
import { User } from '../models';
import * as jwt from 'jsonwebtoken';
import { getOsEnv } from '../lib/env/utils';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class LoginService {
    private _authenticationService: IAuthentication;
    constructor(authService: AdAuthenticationService) {
        this._authenticationService = authService;
    }

    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        let result: LoginResponse = { userData: null, accessToken: '' };

        const user: Nullable<User> = await this._authenticationService.authenticate(loginRequest.email, loginRequest.password).catch((err) => {
            console.log(err);
            throw new Error(err.message);
        });

        if (user) {
            result.userData = user;
            const accessToken = this.signToken(user);
            result.accessToken = accessToken;
        }

        return result;
    }

    private signToken(user: User): string {
        const secret: string = getOsEnv('JWT_SECRET');
        const tokenPayload: JwtTokenPayload = {
            iss: 'Configuration Manager',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 30,
            name: user.displayName,
            email: user.email,
            groups: user.roles,
        };

        const token = jwt.sign(tokenPayload, secret);
        return token;
    }
}
