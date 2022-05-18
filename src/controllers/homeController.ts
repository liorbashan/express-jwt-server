import { Controller, Get, Route, Response, Post, Security } from 'tsoa';

@Route('/')
export class HomeController extends Controller {
    @Get()
    @Response(200)
    public keepAlive(): string {
        console.log('keep-alive');
        return 'success';
    }

    @Post('secure')
    @Security('jwt', ['admin'])
    public secure(): any {
        return Response;
    }
}
