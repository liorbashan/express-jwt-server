import { LoginResponse } from "./../models/login/loginResponse";
import { GeneralResponse } from "./../models/generalResponse";
import { LoginRequest } from "./../models/login/loginRequest";
import { LoginService } from "./../services/loginService";
import { Controller, Post, Route, SuccessResponse, Body } from "tsoa";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Route("login")
export class LoginController extends Controller {
  constructor(private loginService: LoginService) {
    super();
  }

  @Post()
  @SuccessResponse(200)
  public async login(@Body() requestBody: LoginRequest): Promise<GeneralResponse> {
    const loginData: LoginResponse = await this.loginService.login(requestBody).catch((err) => {
      throw new Error(err);
    });
    let response: GeneralResponse = new GeneralResponse(0, "", loginData);
    return response;
  }
}
