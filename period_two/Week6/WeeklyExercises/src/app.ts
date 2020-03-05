require('dotenv').config();
import express from "express";
import { UserFacade as facade, IGameUser } from './facades/userFacade';
const debug = require("debug")("game-case")
const Joi = require('@hapi/joi');
const app = express();

//TODO update index.html
app.use(express.static('public')) // for index.html
app.use(express.json()); //middleware for anything json?

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" })
});

//Get single user
app.get('/api/user/:id', (req, res) => {
  const user = facade.getUser(req.params.id); //TODO string username instead of id
  if (user) res.json(user);
  //TODO error handling
});

//Get all users
app.get('/api/users', (req, res) => {
  res.json(facade.getAllUsers())
});

//Add new user
app.post('/api/user', async (req, res) => {
  const user: IGameUser = {
    name: req.body.name,
    userName: req.body.userName,
    password: req.body.password,
    role: req.body.role
  };
  debug('app.adduser.req.body.user', user)
  const { error } = validateUser(user);
  if (error) return res.status(400).send(error.details[0].message)
  debug('app.adduser.error', error)
  res.send({ operation: 'Adding User', Success: await facade.addUser(user) })
  //TODO error handling
});

//Delete user
app.delete('/api/user/:id', (req, res) => {
  res.send({ operation: 'Deleting User', Success: facade.deleteUser(req.params.id) }) //TODO string username instead of id
  //TODO error handling
});

function validateUser(user: IGameUser) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().min(3).required()
  })
  return schema.validate(user)
}

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


