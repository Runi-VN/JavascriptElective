//run with npm test
var expect = require('chai').expect;
import IGameUser from '../../src/interfaces/GameUser';
import facade from '../../src/facades/user'
import { ApiError } from '../../src/errors/apiError';

describe('Test UserFacade - user.ts', async () => {
    let users: Array<IGameUser> | any;
    let testUser: IGameUser;

    before(async function () {
        users = facade.users;
        testUser = { name: 'test', userName: 'test@test.dk', password: 'test', role: 'TESTER' }
    })
    afterEach(function () {
        //Restore users 
        facade.users = [
            { name: "Peter Pan", userName: "pp@b.dk", password: "secret", role: "user" },
            { name: "Donald Duck", userName: "dd@b.dk", password: "secret", role: "user" },
            { name: "admin", userName: "admin@a.dk", password: "secret", role: "admin" }
        ]
    })

    // static async addUser(user: IGameUser): Promise<string> 
    it('addUser:string', async function () {
        //Arrange
        const expected_length = (users.length) + 1;
        const expected = 'User was added';

        //Act
        const result = await facade.addUser(testUser)

        //Assert
        expect(result, 'Adding user').to.be.equal(expected);
        expect(users.length, 'Increasing user size').equal(expected_length);
    });

    //static async deleteUser(userName: string): Promise<string> 
    it('deleteUser:string', async function () {
        //Arrange
        const expected_length = (facade.users.length) - 1;
        const expected = "User was deleted";
        //Act
        const result = await facade.deleteUser('pp@b.dk')
        const result_users = await facade.getAllUsers();

        //Assert
        expect(result, 'Deleting user').to.be.equal(expected);
        expect(result_users.length, 'Decreasing user size').to.be.equal(expected_length);
    });

    //static async getAllUsers(): Promise<Array<IGameUser>>
    it('getAllUsers:Array<iGameUser>', async function () {
        //Arrange
        const expected = facade.users;
        const expected_length = expected.length;
        //Act
        const result = await facade.getAllUsers()

        //Assert
        expect(result, 'Get all users').to.be.equal(expected);
        expect(result.length, 'All user length').to.be.equal(expected_length);
    });



    //static async getUser(userName: string): Promise<IGameUser> 
    it('getUser:iGameUser', async function () {
        //Arrange
        const expected = { name: "Peter Pan", userName: "pp@b.dk", password: "secret", role: "user" };
        //Act
        const result = await facade.getUser('pp@b.dk')

        //Assert
        expect(result, 'Get single user').to.deep.equal(expected);
    });

    //static async checkUser(userName: string, password: string): Promise<boolean>
    it('checkUser:boolean', async function () {
        //Arrange
        const expected = true;
        await facade.addUser(testUser) //to get a hashed password

        //Act
        const result = await facade.checkUser('test@test.dk', 'test')

        //Assert
        expect(result, 'Get single user').to.deep.equal(expected);
    });

    /////////////////////////////////////////////////////////////////////////
    //////////////////////* ERRORS CHECKS BELOW *///////////////////////////
    ///////////////////////////////////////////////////////////////////////

    it('ERROR-checkUser:boolean', async function () {
        //Arrange
        const expected = false;
        await facade.addUser(testUser) //to get a hashed password

        //Act
        try {
            const result = await facade.checkUser('test@test.dk', 'wrong')
        } catch (err) {
            expect(err).to.be.equal(expected);
        }
    });

    it('ERROR-getUser:ApiError', async function () {
        //expect(async () => await facade.getUser('wrong')).to.throw(new ApiError('User Not Found', 404))
        //^Would be smart, but does not work :|

        //Act
        try {
            await facade.getUser('wrong')
        } catch (err) {
            expect(err.errorCode).to.be.equal(404)
            expect(err.name).to.be.equal('ApiError')
            expect(err.msg).to.be.equal('User Not Found')
        }
    });

    //Others have no errors.

})