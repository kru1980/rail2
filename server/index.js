const express = require("express");
const next = require("next");
const routes = require("../routes");

//service
const authService = require("./services/auth"); // мидлвар смотрит авторизован юзер или нет

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handler = routes.getRequestHandler(app);

const secretData = [
  { title: 1, description: "vata" },
  { title: 2, description: "rada" }
];

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
      return res.json(secretData);
      // прежде чем отсылать данные проверит авторизован юзер или нет
    });
    server.get(
      "/api/v1/onlysiteowner",
      authService.checkJWT,
      authService.checkRole("siteowner"),
      (req, res) => {
        return res.json(secretData);
        // прежде чем отсылать данные проверит авторизован юзер или нет
      }
    );

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.use(function(err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res
          .status(401)
          .send({ title: "Unauthorized", detail: "Unauthorized Access!" });
      }
    });

    const PORT = process.env.PORT || 3000;

    server.use(handler).listen(3000, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
