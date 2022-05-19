export interface JwtTokenPayload {
    iss: string;
    iat: number;
    exp: number;
    name: string;
    email: string;
    groups: any;
}
