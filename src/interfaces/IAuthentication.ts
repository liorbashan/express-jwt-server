import { Nullable } from "./../models/nullable";
import { User } from "../models";

export interface IAuthentication {
  authenticate(username: string, password: string): Promise<Nullable<User>>;
}
