export class LoginService {
  public async login(): Promise<string> {
    console.log("login");
    return "token";
  }
}
