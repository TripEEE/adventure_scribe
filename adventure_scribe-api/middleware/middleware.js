const jwt = require('jsonwebtoken');
const scribeDb = require('../db/scribe_db')

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

const authorizeCampaign = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).send("missing campaign id")
    return
  }

  try {
    const isUserInCampaign = await scribeDb.users.getIsInCampaign(
      req.requestUserId,
      req.params.id
    )

    if (!isUserInCampaign) {
      res.status(403).send("you do not have permission to access this resource")
      return
    }
  }
  catch (err) {
    res.status(500).send(err)
    return
  }

  next()
}



exports.jwtMiddleware = jwtMiddleware;
exports.authorizeCampaign = authorizeCampaign;
exports.JWT_SIGNING_KEY = JWT_SIGNING_KEY;
