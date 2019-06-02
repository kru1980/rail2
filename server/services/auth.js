const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const NAMESPACE = "http://lacalhost:3000/";

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev--8zsj3hu.auth0.com/.well-known/jwks.json"
  }),
  audience: "oi2I4x9KPMmdwNvzAUqU4XAiY6e0jv1w",
  issuer: "https://dev--8zsj3hu.auth0.com/",
  algorithms: ["RS256"]
});

exports.checkRole = role => (req, res, next) => {
  const user = req.user;
  // console.log("user", user);
  // console.log("role", role);
  // console.log(user["http://localhost:3000/role"], user[`NAMESPACE + /${role}`]);

  if (user && user[NAMESPACE + "/role"] === role) {
    next();
  } else {
    return res.status(401).send({
      title: "Not Authorized",
      detail: "You are not authorized to access this data"
    });
  }
};
