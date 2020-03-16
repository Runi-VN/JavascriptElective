import { expect } from "chai";
import { Server } from "http";
import fetch, { Body } from "node-fetch";
import { type } from "os";
import IGameUser from '../src/interfaces/GameUser';
import facade from '../src/facades/user'

let server: Server;
const TEST_PORT = "7777"

describe("REST TEST", () => {

  let URL: string;
  let users: Array<any>;

  before((done) => {
    // When we include a database, make sure that we use the test database

    //Switch to the test port for the API-server
    process.env["PORT"] = TEST_PORT;
    server = require("../src/app").server;
    URL = `http://localhost:${process.env.PORT}`;

    //Set up users
    users = [{ name: "Peter Pan", userName: "pp@b.dk" },
    { name: "Donald Duck", userName: "dd@b.dk" },
    { name: "admin", userName: "admin@a.dk" }]

    done()
  })

  after((done) => {
    server.close(done);
  })

  afterEach(() => {
    //Restore users 
    facade.users = [
      { name: "Peter Pan", userName: "pp@b.dk", password: "secret", role: "user" },
      { name: "Donald Duck", userName: "dd@b.dk", password: "secret", role: "user" },
      { name: "admin", userName: "admin@a.dk", password: "secret", role: "admin" }
    ]
  })

  it("GET /api/dummy: should -> Hello", async () => {
    const result = await fetch(`${URL}/api/dummy`).then(r => r.json());
    expect(result.msg).to.be.equal("Hello")
  })

  //router.post('/', async function (req, res, next) {
  it("POST /api/users: should -> JSON.status", async () => {
    const expected = { status: 'User was added' }
    const new_user = { name: 'Test', userName: 'test@testerson.uk', password: 'testpass', role: 'TESTER' }
    const result = await fetch(`${URL}/api/users`, {
      method: 'POST',
      body: JSON.stringify(new_user),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json());
    expect(result).to.deep.equal(expected)
  })

  /////////////////////////////////
  ///////*BELOW REQUIRES AUTH*/////
  /////////////////////////////////

  //router.get('/:userName', async function (req: any, res, next) {
  it("GET /api/users/:userName: should -> iGameUser(DTO)", async () => {
    const expected = { name: "Donald Duck", userName: "dd@b.dk" } //DTO
    const result = await fetch(`${URL}/api/users/dd@b.dk`, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + Buffer.from('admin@a.dk' + ":" + 'secret').toString('base64') }
    }).then(r => r.json());
    expect(result).to.deep.equal(expected)
  })
  //Same as above, but error trigger:
  it("[ERROR-NotFound]GET /api/users/:userName: should -> UserNotFound", async () => {
    const expected = { code: 404, message: 'User Not Found' }
    const result = await fetch(`${URL}/api/users/wrong`, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + Buffer.from('admin@a.dk' + ":" + 'secret').toString('base64') }
    }).then(r => r.json());
    expect(result).to.deep.equal(expected)
  })
  //Same as above but not an admin attempting
  it("[ERROR-Unauthorized]GET /api/users/:userName: should -> ApiError(Not admin)", async () => {
    const expected = { code: 401, message: 'Not Authorized' }
    const result = await fetch(`${URL}/api/users/dd@b.dk`, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + Buffer.from('pp@b.dk' + ":" + 'secret').toString('base64') }
    }).then(r => r.json());
    expect(result).to.deep.equal(expected)
  })

  //router.get('/user/me', async function (req: any, res, next) {
  it("GET /api/users/me: should -> iGameUser(DTO)", async () => {
    const expected = { name: "Donald Duck", userName: "dd@b.dk" } //DTO
    const result = await fetch(`${URL}/api/users/user/me`, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + Buffer.from('dd@b.dk' + ":" + 'secret').toString('base64') }
    }).then(r => r.json());
    expect(result).to.deep.equal(expected)
  })

  //router.get('/', async function (req, res, next) {
  it("GET /api/users: should -> AllUsers<iGameUser>", async () => {
    const result = await fetch(`${URL}/api/users`, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + Buffer.from('pp@b.dk' + ":" + 'secret').toString('base64') }
    }).then(r => r.json());
    expect(result).to.deep.equal(users)
  })
  //router.delete('/:userName', async function (req, res, next) {
  it("DELETE /api/users/:userName: should -> string(User was Deleted)", async () => {
    //Everyone can delete? :^)
    const expected = { status: 'User was deleted' }
    const expected_length = users.length - 1
    const result = await fetch(`${URL}/api/users/dd@b.dk`, {
      method: 'DELETE',
      headers: { Authorization: 'Basic ' + Buffer.from('pp@b.dk' + ":" + 'secret').toString('base64') }
    }).then(r => r.json());
    expect(result).to.deep.equal(expected)
    expect(facade.users.length).to.be.equal(expected_length)
  })

})
