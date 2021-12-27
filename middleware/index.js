const bunyan = require("bunyan");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config");

function loadLogger(req, res, next) {
  req.log = bunyan.createLogger({
    name: "vt-logger",
    req_id: _.has(req.headers, "X-Amzn-Trace-Id")
      ? req.headers["X-Amzn-Trace-Id"]
      : uuidv4(),
    serializers: { err: bunyan.stdSerializers.err },
  });
  next();
}

function verifyJWTtoken(req, res, next) {
  try {
    let token = req.query.token
      ? req.query.token
      : res
          .status(401)
          .send("No Access Token Provided. Authentication Failed.");
    req.log.info("JWT Token: ", token);
    var tokenClaims = jwt.verify(token, config.get("vt").jwtSecret);
    req.log.info("JWT Token Payload/Claims after Verification: ", tokenClaims);
    req.acct = tokenClaims.userMrn;
    next();
  } catch (err) {
    req.log.info(`Error:${err}`);
    res.status(401).send("Access Token Provided is Invalid.");
  }
}

module.exports = {
  loadLogger: loadLogger,
  verifyJWTtoken: verifyJWTtoken,
};
