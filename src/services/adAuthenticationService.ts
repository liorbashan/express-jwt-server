import { Nullable } from "./../models/nullable";
import { IAuthentication } from "../interfaces/IAuthentication";
import { getOsEnv } from "../lib/env/utils";
import { User } from "../models";
import { injectable } from "tsyringe";
const AD = require("activedirectory2").promiseWrapper;

injectable();
export class AdAuthenticationService implements IAuthentication {
  public async authenticate(username: string, password: string): Promise<Nullable<User>> {
    const ldapHost = getOsEnv("LDAP_SERVER_HOST", "");
    const baseDN = "dc=888holdings,dc=corp";
    const config = { url: ldapHost, baseDN, username, password };
    const ad = new AD(config);
    let result: Nullable<User>;

    return new Promise(async (resolve, reject) => {
      const authenticated = await ad.authenticate(username, password).catch((err: any) => {
        console.log(err);
        reject(err);
      });
      if (authenticated) {
        const user = await ad.findUser(username).catch((err: any) => {
          reject(err);
        });
        result = { displayName: user.displayName, email: user.email };
        console.log(user);
        const groups = await ad.getGroupMembershipForUser(username).catch((err: any) => {
          reject(err);
        });
        result.roles = this.GetRolesFromGroups(groups);

        resolve(result);
      } else {
        reject("Invalid username password");
      }
    });
  }

  private GetRolesFromGroups(groups: string[]): string[] {
    return groups;
  }
}
