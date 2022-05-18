import { Nullable } from "./../nullable";
import { User } from "./user";

export interface LoginResponse {
  accessToken?: string;
  userData?: Nullable<User>;
}
