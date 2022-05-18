import { LoginRequest } from './../models/login/loginRequest';
import { getOsEnv } from '../lib/env/utils';
const AD = require('activedirectory2').promiseWrapper;

export class LoginService {
    // TODO: use interfaces
    public async login(loginRequest: LoginRequest): Promise<string> {
        console.log(loginRequest.email);
        const username = loginRequest.email;
        const password = loginRequest.password;
        const ldapHost = getOsEnv('LDAP_SERVER_HOST', '');
        const baseDN = 'dc=888holdings,dc=corp';

        const config = { url: ldapHost, baseDN, username, password };
        const ad = new AD(config);

        const authenticated = await ad.authenticate(username, password).catch((err: any) => {
            console.log(err);
        });
        if (authenticated) {
            const user = await ad.findUser(username).catch((err: any) => {
                console.log(err);
            });
            console.log(user);
            const groups = await ad.getGroupMembershipForUser(username).catch((err: any) => {
                console.log(err);
            });
        } else {
            // throw new BadRequestError();
        }

        return '';
    }
}
