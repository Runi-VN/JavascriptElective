
import path from "path";
require('dotenv').config({ path: path.join(process.cwd(), '.env') })
import { expect } from "chai";
import { Server } from "http";
import fetch from "node-fetch";
import mongo, { MongoClient } from "mongodb";
import { bryptAsync } from "../src/utils/bcrypt-async-helper"
import setup from "../src/config/setupDB"
import { positionCreator, getLatitudeInside, getLatitudeOutside } from "../src/utils/geoUtils"
import { USER_COLLECTION_NAME, POSITION_COLLECTION_NAME, POST_COLLECTION_NAME } from "../src/config/collectionNames"
import IPosition from "../src/interfaces/Position";

let server: Server;
const TEST_PORT = "7777"
let client: MongoClient;
const DISTANCE_TO_SEARCH = 100
const MOCHA_TIMEOUT = 5000;

describe("Verify /gameapi/getPostIfReached", () => {
  let URL: string;


  //IMPORTANT --> this does now work with Mocha for ARROW-functions
  before(async function () {

    //@ts-ignore
    this.timeout(MOCHA_TIMEOUT)

    process.env["PORT"] = TEST_PORT;
    process.env["DB_NAME"] = "semester_case_test"

    server = await require("../src/app").server;
    URL = `http://localhost:${process.env.PORT}`;
    client = await setup();
    //This is not required. The server connects to the DB via the use of the facade
    //await client.connect();
  })

  beforeEach(async () => {
    //Observe, no use of facade, but operates directly on connection
    // client = await setup();
    // await client.connect();
    const db = client.db(process.env.DB_NAME)
    const usersCollection = db.collection(USER_COLLECTION_NAME)
    await usersCollection.deleteMany({})
    const secretHashed = await bryptAsync("secret");
    const team1 = { name: "Team1", userName: "t1", password: secretHashed, role: "team" }
    const team2 = { name: "Team2", userName: "t2", password: secretHashed, role: "team" }
    const team3 = { name: "Team3", userName: "t3", password: secretHashed, role: "team" }

    const status = await usersCollection.insertMany([team1, team2, team3])

    const positionsCollection = db.collection(POSITION_COLLECTION_NAME)
    await positionsCollection.deleteMany({})
    await positionsCollection.createIndex({ "lastUpdated": 1 }, { expireAfterSeconds: 30 })
    await positionsCollection.createIndex({ location: "2dsphere" })
    const positions = [
      positionCreator(12.48, 55.77, team1.userName, team1.name, true),
      //Change latitude below, to a value INSIDE the radius given by DISTANCE_TO_SEARC, and the position of team1
      positionCreator(12.48, getLatitudeInside(55.77, DISTANCE_TO_SEARCH), team2.userName, team2.name, true),
      //Change latitude below, to a value OUTSIDE the radius given by DISTANCE_TO_SEARC, and the position of team1
      positionCreator(12.48, getLatitudeOutside(55.77, DISTANCE_TO_SEARCH), team3.userName, team3.name, true)
    ]
    const locations = await positionsCollection.insertMany(positions)

    const postCollection = db.collection(POST_COLLECTION_NAME)
    await postCollection.deleteMany({})
    await postCollection.insertOne({
      _id: "Post1",
      task: { text: "1+1", isUrl: false },
      taskSolution: "2",
      location: {
        type: "Point",
        coordinates: [12.49, 55.77]
      }
    });
  })

  after(async () => {
    server.close();
    await client.close();
  })

  it("Should find team2, since inside range", async function () {
    //  //@ts-ignore
    //  this.timeout(MOCHA_TIMEOUT)
    const newPosition = { "userName": "t1", "password": "secret", "lat": 55.77, "lon": 12.48, "distance": DISTANCE_TO_SEARCH }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPosition)
    }
    const result = await fetch(`${URL}/gameapi/nearbyplayers`, config).then(r => r.json());

    expect(result.length).to.be.equal(1)
    expect(result[0].userName).to.be.equal("t2")
  })

  it("Should find team2 +team3, since both are inside range", async function () {
    const newPosition = { "userName": "t1", "password": "secret", "lat": 55.77, "lon": 12.48, "distance": DISTANCE_TO_SEARCH * 2 }
    //large distance to search set
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPosition)
    }
    const result = await fetch(`${URL}/gameapi/nearbyplayers`, config).then(r => r.json());
    expect(result.length).to.be.equal(2)
  })

  it("Should NOT find team2, since not in range", async function () {
    const newPosition = { "userName": "t1", "password": "secret", "lat": 54.77, "lon": 12.48, "distance": DISTANCE_TO_SEARCH - 95 }
    //lat is too far away
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPosition)
    }
    const result = await fetch(`${URL}/gameapi/nearbyplayers`, config).then(r => r.json());
    expect(result.length).to.be.equal(0)
    expect(result[0]).to.be.equal(undefined)
  })

  it("Should not find anything, since credential are wrong", async function () {
    const newPosition = { "userName": "nonexistant", "password": "nonexistant", "lat": 54.77, "lon": 12.48, "distance": DISTANCE_TO_SEARCH }
    //user/pass does not exist
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPosition)
    }
    const result = await fetch(`${URL}/gameapi/nearbyplayers`, config).then(r => r.json());
    expect(result.code).to.be.equal(403)
    expect(result.message).to.be.equal('wrong username or password')
  })

  it("Should find nearby post (In range)", async () => {
    const expected = { postId: 'Post1', task: '1+1', isUrl: false }
    const post_request_position = { "postId": "Post1", "lat": 12.49, "lon": 55.77 } //would have come from a player
    //post coordinates are [12.49, 55.77] -- we are ontop of it
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_request_position)
    }
    const result = await fetch(`${URL}/gameapi/getPostIfReached`, config).then(r => r.json());
    expect(result).to.be.not.null
    expect(result).to.be.deep.equal(expected)
  })

  it("Should not find nearby post (Out of range)", async () => {
    const expected = { code: 400, message: "Post not reached" }
    const post_request_position = { "postId": "Post1", "lat": 1, "lon": 1 } //would have come from a player
    //post coordinates are [12.49, 55.77] -- we are FAR away from it
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_request_position)
    }
    const result = await fetch(`${URL}/gameapi/getPostIfReached`, config).then(r => r.json());
    expect(result).to.be.not.null
    expect(result).to.be.deep.equal(expected)
  })

  it("Should add a new post", async () => {
    const expected = [
      {
        _id: 'Post8',
        task: { text: 'Who am I', isUrl: false },
        taskSolution: 'The developer',
        location: { type: 'Point', coordinates: [15, 15] }
      }
    ]
    // const name = req.body.name
    // const task = req.body.task
    // const isUrl = req.body.isUrl
    // const taskSolution = req.body.taskSolution
    // const lon = req.body.lon
    // const lat = req.body.lat
    const post_to_add = { name: 'Post8', task: 'Who am I', isUrl: false, taskSolution: 'The developer', lon: 15, lat: 15 }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_to_add)
    }
    const result = await fetch(`${URL}/gameapi/addPost`, config).then(r => r.json());
    //console.log(result);
    expect(result).to.be.not.null
    expect(result).to.be.deep.equal(expected)
  })

  it("Should update position", async () => {
    const expected =
    {
      _id: 'Post8',
      userName: 't2',
      name: 'Team2',
      location: { type: 'Point', coordinates: [45.27, 32.57] }
    }

    const position_to_update = { userName: 't2', lon: 45.27, lat: 32.57 }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(position_to_update)
    }
    const result: IPosition = await fetch(`${URL}/gameapi/updatePos`, config).then(r => r.json());
    //console.log(result);
    expect(result).to.be.not.null
    //debug('UpdatePosition document lastUpdated (is it today?):', result.lastUpdated)
    const today = new Date()
    result.lastUpdated = new Date(result.lastUpdated) //parse to Date obj
    expect(result.lastUpdated.getFullYear()).to.be.equal(today.getFullYear())
    expect(result.lastUpdated.getMonth()).to.be.equal(today.getMonth())
    expect(result.lastUpdated.getDay()).to.be.equal(today.getDay()) //we wont check on hh:mm:ss
    expect(result.name).to.be.equal(expected.name)
    expect(result.userName).to.be.equal(expected.userName)
    expect(result.location).to.be.deep.equal(expected.location)
  })

})
