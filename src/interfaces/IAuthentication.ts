import { User } from '../models';

export interface IAuthentication {
    authenticate(username: string, password: string): Promise<User>;
}
