import jwt from 'jsonwebtoken';

export default class Token {

    private static seed: string = 'this-is-the-seed-of-my-secret-app';
    private static expiration: string = '30d';

    constructor() {}

    // Return token with its payload
    static getJwtToken(payload: any): string {

        return jwt.sign({
            user: payload
        }, this.seed, {expiresIn: this.expiration});

    }

    // Check if the token has our seed (is trusted)
    static checkToken(userToken: string) {

        return new Promise((resolve, reject) => {  
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    // Do not trust
                    reject();
                } else {
                    // Valid token
                    resolve(decoded);
                }
            });
        });

    }
}