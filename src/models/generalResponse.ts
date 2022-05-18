export class GeneralResponse {
  public errorCode: number;
  public errorDescription: string;
  public data: any | null;

  constructor(errCode: number, desc: string, data?: any) {
    this.errorCode = errCode;
    this.errorDescription = desc;
    this.data = data;
  }
}
