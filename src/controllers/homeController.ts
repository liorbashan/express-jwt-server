import { Controller, Get, Route, Response } from "tsoa";

@Route("/")
export class HomeController extends Controller {
  @Get()
  @Response(200)
  public keepAlive(): string {
    console.log("keep-alive");
    return "success";
  }
}
