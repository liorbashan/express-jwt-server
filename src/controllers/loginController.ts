import { LoginService } from "./../services/loginService";
import { Controller, Post, Route, SuccessResponse } from "tsoa";

@Route("login")
export class LoginController extends Controller {
  private loginService: LoginService;
  constructor() {
    super();
    this.loginService = new LoginService();
  }

  @Post()
  @SuccessResponse(200)
  public async login(): Promise<string> {
    const token = this.loginService.login();

    return token;
  }
}
