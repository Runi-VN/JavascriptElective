import { debug } from "console";

var bcrypt = require('bcryptjs'); //https://www.npmjs.com/package/bcryptjs

export interface IGameUser {
    name: string,
    userName: string,
    password: string,
    role: string
}

const users: Array<IGameUser> = [];
export class UserFacade {
    static async addUser(user: IGameUser): Promise<boolean> {
        /*Info: Import bcrypt and (npm install bcrypt) and hash before you store */
        //bcrypt.genSalt().then((salt: string) => {
        let result = false;
        // await new Promise<string>(async (resolve, reject) => {
        //     await bcrypt.hash(user.password, 'a', (err: Error, hash: string) => { return err ? reject(err) : resolve(hash) })
        //     debug(reject)
        // }).then((success: string) => {
        //     debug('facade.adduser.success', success)
        //     user.password = success;
        //     users.push(user)
        //     result = true;
        //     //return true;
        // }).then((failure => {
        //     debug('facade.adduser.failure', failure)
        //     //return false;
        // }));
        // debug('yeet')
        // return result;
        result = bcrypt.hash(user.password, 10).then((hash: string) => { //https://www.npmjs.com/package/bcryptjs#hashs-salt-callback-progresscallback
            user.password = hash;
            users.push(user);
            result = true
            return Promise.resolve(true)
        }).catch((err: Error) => { return Promise.reject(err) }) //TODO error handling :|
        //})

        return result;
        // bcrypt.genSalt(10, function (err: Error, salt: string) {
        //     if (err) return err
        //     bcrypt.hash(user.password, salt, function (err: Error, hash: string) {
        //         if (err) return err
        //         user.password = hash
        //         users.push(user)
        //         return true;
        //     });
        // });
        // return false;
    }
    static deleteUser(userName: string): boolean {
        const userIndex = users.findIndex(user => user.name === userName)
        if (userIndex != -1) { users.splice(userIndex, 1); return true }
        return false;
    }
    static getAllUsers(): Array<IGameUser> { return users; }
    static getUser(userName: string): IGameUser {
        const user = users.find(user => user.name === userName)
        if (user) return user
        throw new Error('User not found')
    }
    static checkUser(userName: string, password: string): boolean {
        /*Use bcrypts compare method */
        //TODO async
        const user = this.getUser(userName);
        if (user) {
            // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
            bcrypt.compare(password, user.password).then((res: boolean) => {
                return res;
            }).catch((err: Error) => { Promise.reject(err) });
            // bcrypt.compare(password, user.password, function (err: Error, res: boolean) {
            //     if (err) return err;
            //     return res;
            // });
        }
        return false;
    }
}