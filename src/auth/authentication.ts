import { JwtTokenPayload } from './../models/auth/jwtToken';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getOsEnv } from '../lib/env/utils';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    if (securityName !== 'jwt') {
        securityName = 'jwt';
    }
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error('No token provided'));
        }
        jwt.verify(token, getOsEnv('JWT_SECRET'), (err: any, decoded: any) => {
            if (err) {
                reject(err);
            } else {
                // Check if JWT contains all required scopes
                for (let scope of scopes!) {
                    if ((decoded as JwtTokenPayload).groups.includes(scope)) {
                        resolve(decoded as JwtTokenPayload);
                    } else {
                        reject(new Error('403'));
                    }
                }
            }
        });
    });
}
