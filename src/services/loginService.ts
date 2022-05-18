import { Nullable } from "./../models/nullable";
import { LoginResponse } from "./../models/login/loginResponse";
import { IAuthentication } from "./../interfaces/IAuthentication";
import { LoginRequest } from "./../models/login/loginRequest";
import { User } from "../models";
import * as jwt from "jsonwebtoken";
import { getOsEnv } from "../lib/env/utils";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class LoginService {
  constructor(private _authenticationService: IAuthentication) {}

  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    let result: LoginResponse = { userData: null, accessToken: "" };

    const user: Nullable<User> = await this._authenticationService
      .authenticate(loginRequest.email, loginRequest.password)
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });

    if (user) {
      result.userData = user;
      const accessToken = jwt.sign(user!, getOsEnv("JWT_SECRET"));
      result.accessToken = accessToken;
    }

    return result;
  }
}
