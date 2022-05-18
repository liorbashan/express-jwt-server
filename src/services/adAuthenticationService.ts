import { IAuthentication } from '../interfaces/IAuthentication';
import { getOsEnv } from '../lib/env/utils';
import { User } from '../models';
const AD = require('activedirectory2').promiseWrapper;

export class AdAuthenticationService implements IAuthentication {
    public async authenticate(username: string, password: string): Promise<User> {
        const ldapHost = getOsEnv('LDAP_SERVER_HOST', '');
        const baseDN = 'dc=888holdings,dc=corp';
        const config = { url: ldapHost, baseDN, username, password };
        const ad = new AD(config);

        return new Promise(async (resolve, reject) => {
            const authenticated = await ad.authenticate(username, password).catch((err: any) => {
                console.log(err);
                reject(err);
            });
            if (authenticated) {
                const user = await ad.findUser(username).catch((err: any) => {
                    reject(err);
                });
                console.log(user);
                const groups = await ad.getGroupMembershipForUser(username).catch((err: any) => {
                    reject(err);
                });
                let result: User = { displayName: user.displayName, email: user.mail, roles: [] };
                resolve(result);
            } else {
                reject('Invalid username password');
            }
        });
    }
}
