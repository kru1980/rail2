const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

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
