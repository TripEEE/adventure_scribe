const express = require('express');
const router = express.Router();
const scribeDb = require('../db/scribe_db')
const jwt = require('jsonwebtoken');


const JWT_SIGNING_KEY = "sdkfljsldkfjsdlkfj0i234slfj234"

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(403).send("no auth header")
    return
  }

  const [_, token] = authHeader.split(" ")

  try {
    const tokenPayload = jwt.verify(token, JWT_SIGNING_KEY)
    req.requestUserId = tokenPayload.user_id
  } catch (e) {
    res.status(403).send(e)
    return
  }


  next()
}

router.get('/me', async (req, res) => {
  // todo: get userId from JWT token

  const authHeader = req.header("Authorization");
  const [_, token] = authHeader.split(" ")

  const tokenPayload = jwt.verify(token, JWT_SIGNING_KEY)

  try {
    const user = await scribeDb.users.getById(
      tokenPayload.user_id
    )
    res.json(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await scribeDb.users.getByEmail(
      req.body.email
    )

    // decrypt the user email?

    if (user.password !== req.body.password) {
      res.status(403).send("incorrect password")
      return
    }

    const token = jwt.sign({
      user_id: user.id,
      name: user.name,
      email: user.email,
    }, JWT_SIGNING_KEY);

    // issue jwt token and set cookies
    res.cookie("auth_token", token)
    res.json(token)
  }
  catch (err) {
    res.status(500).send(err)
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await scribeDb.users.create(
      {
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
      }
    )
    res.json(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
});


exports.userRoutes = router;
exports.jwtMiddleware = jwtMiddleware

