import express from "express";
import gameFacade from "../facades/gameFacade";
const router = express.Router();
import { ApiError } from "../errors/apiError"

//import * as mongo from "mongodb"
import setup from "../config/setupDB"
import UserFacade from '../facades/userFacadeWithDB';
import IPoint from "../interfaces/Point";

(async function setupDB() {
  const client = await setup()
  gameFacade.setDatabase(client)
})()

router.post('/nearbyplayers', async function (req, res, next) {
  try {
    const userName = req.body.userName
    const password = req.body.password
    const lat = req.body.lat
    const lon = req.body.lon
    const distance = req.body.distance

    //const point: IPoint = { type: 'Point', coordinates: [lat, lon] }
    const result = await gameFacade.nearbyPlayers(userName, password, lon, lat, distance)
    res.json(result)
  } catch (err) {
    next(err)
  }

})
router.post('/getPostIfReached', async function (req, res, next) {
  throw new Error("Not yet implemented")
})

module.exports = router;