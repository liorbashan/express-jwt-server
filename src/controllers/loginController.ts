import { LoginRequest } from './../models/login/loginRequest';
import { LoginService } from './../services/loginService';
import { Controller, Post, Route, SuccessResponse, Body } from 'tsoa';

@Route('login')
export class LoginController extends Controller {
    private loginService: LoginService;
    constructor() {
        super();
        this.loginService = new LoginService();
    }

    @Post()
    @SuccessResponse(200)
    public async login(@Body() requestBody: LoginRequest): Promise<string> {
        const accessToken = this.loginService.login(requestBody);

        return accessToken;
    }
}
