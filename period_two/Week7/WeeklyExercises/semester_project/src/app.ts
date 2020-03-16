require('dotenv').config();
import express from "express";
import path from "path";
const userAPIRouter = require('./routes/userApi');
import { requestLogger, errorLogger } from './middleware/logger'
import cors from 'cors'
import { apiErrorHandler, apiPathErrorHandler } from './middleware/errorhandling/userApiErrorHandler'
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json()) //for post requests https://github.com/github/fetch/issues/323#issuecomment-277510957
app.use("/api/users", userAPIRouter);

app.get("/api/dummy", (req: any, res: any) => {
  res.json({ msg: "Hello" })
})

app.use([
  express.static(path.join(process.cwd(), "public")),
  express.json(),
  requestLogger,
  errorLogger,
  cors(), apiErrorHandler])
//, apiPathErrorHandler


const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;

/*
Other way to implement error handling
https://stackoverflow.com/a/11500298
*/

