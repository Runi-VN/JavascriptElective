import * as mongo from "mongodb"
const MongoClient = mongo.MongoClient;
import setup from "../src/config/setupDB"
//import UserFacade from '../src/facades/userFacadeWithDB';
import GameFacade from '../src/facades/gameFacade';
import { expect } from "chai";
import { bryptAsync } from "../src/utils/bcrypt-async-helper"
import { positionCreator, getLatitudeOutside, getLatitudeInside } from "../src/utils/geoUtils"
import { USER_COLLECTION_NAME, POSITION_COLLECTION_NAME, POST_COLLECTION_NAME } from "../src/config/collectionNames"
import { ApiError } from '../src/errors/apiError';
import IPost from "../src/interfaces/Post";
import IPosition from "../src/interfaces/Position";
const debug = require('debug')('game-project')

let userCollection: mongo.Collection | null;
let positionCollection: mongo.Collection | null;
let postCollection: mongo.Collection | null;

let client: mongo.MongoClient;
const DISTANCE_TO_SEARCH = 100

describe("Verify the GameFacade", () => {

  before(async () => {
    client = await setup();
    process.env["DB_NAME"] = "semester_case_test"
    const db = await GameFacade.setDatabase(client)

    if (!db) {
      throw new Error("Database not intialized")
    }
    userCollection = db.collection(USER_COLLECTION_NAME);
    positionCollection = db.collection(POSITION_COLLECTION_NAME)
    postCollection = db.collection(POST_COLLECTION_NAME);

    if (userCollection === null || positionCollection === null) {
      throw new Error("user and/or location- collection not initialized")
    }

  })
  after(async () => {
    await client.close();
  })
  beforeEach(async () => {
    if (userCollection === null || positionCollection === null || postCollection === null) {
      throw new Error("One of requred collections is null")
    }
    await userCollection.deleteMany({})
    const secretHashed = await bryptAsync("secret");
    const team1 = { name: "Team1", userName: "t1", password: secretHashed, role: "team" }
    const team2 = { name: "Team2", userName: "t2", password: secretHashed, role: "team" }
    const team3 = { name: "Team3", userName: "t3", password: secretHashed, role: "team" }
    await userCollection.insertMany([team1, team2, team3])

    await positionCollection.deleteMany({})

    const positions = [
      positionCreator(12.48, 55.77, team1.userName, team1.name, true),
      // --> Change latitude below, to a value INSIDE the radius given by DISTANCE_TO_SEARC, and the position of team1
      positionCreator(12.48, getLatitudeInside(55.77, DISTANCE_TO_SEARCH), team2.userName, team2.name, true),
      // --> Change latitude below, to a value OUTSIDE the radius given by DISTANCE_TO_SEARC, and the position of team1
      positionCreator(12.48, getLatitudeOutside(55.77, DISTANCE_TO_SEARCH), team3.userName, team3.name, true),
    ]
    await positionCollection.insertMany(positions)

    //Only include this if you plan to do this part 
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

  describe("Verify nearbyPlayers", () => {
    it("Should find (Only) Team2", async () => {
      const playersFound = await GameFacade.nearbyPlayers("t1", "secret", 12.48, 55.77, DISTANCE_TO_SEARCH)
      expect(playersFound.length).to.be.equal(1);
      expect(playersFound[0].userName).to.be.equal("t2")
    })
  })

  describe("Verify nearbyPlayers", () => {
    it("Should not find Team2 (wrong credentials)", async () => {
      try {
        const playersFound = await GameFacade.nearbyPlayers("t1", "xxxxx", 12.48, 55.77, DISTANCE_TO_SEARCH)
        throw new Error("Should NEVER get here")
      } catch (err) {
        expect(err instanceof ApiError).to.be.equal(true)
        expect(err.errorCode).to.be.equal(403)
        expect(err.message).to.be.equal('wrong username or password')
      }
    })
  })

  describe("Verify nearbyPlayers", () => {
    it("Should find Team2 and Team3?", async () => {
      const expected: any | null = await userCollection!.find!({ name: ['Team2', 'Team3'] }).toArray() //real nice.................
      //[{ userName: "t2", password: 'secret', role: "team" }, { name: "Team3", userName: "t3", password: 'secret', role: "team" }]

      const playersFound = await GameFacade.nearbyPlayers("t1", "secret", 12.48, 55.77, DISTANCE_TO_SEARCH * 2) //big enough to find both teams
      expect(playersFound.length).to.be.equal(2);
      expect(playersFound).to.include.members(expected)
    })
  })

  describe("Verify nearbyPlayers", () => {
    it("Should find no players within range", async () => {
      const playersFound = await GameFacade.nearbyPlayers("t1", "secret", 1, 1, DISTANCE_TO_SEARCH) //no players within range of this coordinate.
      expect(playersFound.length).to.be.equal(0)
      expect(playersFound[0]).to.be.equal(undefined)
    })
  })

  describe("Verify getPostIfReached", () => {
    it("Should find the post since it was reached", async () => {
      const expected = { postId: 'Post1', task: '1+1', isUrl: false }
      const post: IPost = await GameFacade.getPostIfReached('Post1', 12.49, 55.77) //Right ontop of the post
      expect(post).to.be.not.null
      expect(post).to.be.deep.equal(expected)
    })

    it("Should NOT find the post since it was NOT reached", async () => {
      try {
        const result = await GameFacade.getPostIfReached('Post1', 1, 1) //Coordinates too far away
        throw new Error("Should NEVER get here")
      } catch (err) {
        expect(err instanceof ApiError).to.be.equal(true)
        expect(err.errorCode).to.be.equal(400)
        expect(err.message).to.be.equal('Post not reached')
      }
    })
  })

  describe("Verify addPost", () => {
    it("Should add a post", async () => {
      //const position = positionCreator(2, 2, 't1', 'Team1', true)
      const expected: Array<IPost> = [{ _id: 'Post7', location: { type: 'Point', coordinates: [5, 5] }, task: { text: 'What is the meaning of life?', isUrl: false }, taskSolution: '42' }]
      const pre_action_db_size: number | undefined = await postCollection?.countDocuments({})
      const result = await GameFacade.addPost('Post7', 'What is the meaning of life?', false, '42', 5, 5)
      const post_action_db_size: number | undefined = await postCollection?.countDocuments({})

      //debug(result)
      //debug('here', result.location.coordinates)
      //debug(expected)
      //debug(pre_action_db_size)
      //debug(post_action_db_size)
      expect(result).to.be.deep.equal(expected)
      expect(pre_action_db_size! + 1).to.be.equal(post_action_db_size) //was 1 (see beforeEach), now 2
    })
  })

  describe("Verify updatePositionSimple", () => {
    it("Should update position", async () => {
      //t1 usually has [12.48,55.77]. Lets update it
      const expected = { name: 'Team1', userName: 't1', location: { type: 'Point', coordinates: [10, 15] } } //cannot check on lastUpdated, but will be written to stdouput
      const result: IPosition = await GameFacade.updatePositionSimple('t1', 10, 15)
      expect(result).to.be.not.null
      debug('UpdatePosition document lastUpdated (is it today?):', result.lastUpdated)
      const today = new Date()
      expect(result.lastUpdated.getFullYear()).to.be.equal(today.getFullYear())
      expect(result.lastUpdated.getMonth()).to.be.equal(today.getMonth())
      expect(result.lastUpdated.getDay()).to.be.equal(today.getDay()) //we wont check on hh:mm:ss
      expect(result.name).to.be.equal(expected.name)
      expect(result.userName).to.be.equal(expected.userName)
      expect(result.location).to.be.deep.equal(expected.location)
    })
  })


})