import { Controller, Get, Route, Response, Request, Post, Security } from 'tsoa';
import * as express from 'express';

@Route('/')
export class HomeController extends Controller {
    @Get()
    @Response(200)
    public keepAlive(): string {
        console.log('keep-alive');
        return 'success';
    }

    @Post('secure')
    @Security('jwt', ['BannerAdminRoot'])
    public secure(@Request() request: express.Request): any {
        console.log(request);
        return Response;
    }
}
