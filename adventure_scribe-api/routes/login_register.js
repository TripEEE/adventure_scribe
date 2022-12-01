const express = require('express');
const router = express.Router();
const scribeDb = require('../db/scribe_db')
const jwt = require('jsonwebtoken');
const { JWT_SIGNING_KEY } = require('../middleware/middleware')



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
    res.cookie("auth_token", token, { expires: new Date(new Date().getTime() + (20 * 60000)) })
    res.json(token)
  }
  catch (err) {
    console.log(err)
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

