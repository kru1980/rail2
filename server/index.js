const express = require("express");
const next = require("next");
const routes = require("../routes");
const mongoose = require("mongoose");
const config = require("./config/index");

//service
const authService = require("./services/auth"); // мидлвар смотрит авторизован юзер или нет

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handler = routes.getRequestHandler(app);

const secretData = [
  { title: 1, description: "vata" },
  { title: 2, description: "rada" }
];

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("Database Connected!"))
  .catch(err => console.error(err));

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
    // ============= learn mongoose
    server.get("/addRail", (req, res) => {
      var railSchema = new mongoose.Schema({
        name: String,
        age: Number
      });

      var Rail = mongoose.model("rail", railSchema);

      const railFirst = new Rail({ name: "vatan", age: 38 });
      railFirst.save().then(() => console.log("рельс добавлен"));

      return res.json(railFirst);
    });
    server.get("/getRails", async (req, res) => {
      try {
        const cats = await rail.find();
        res.json(cats);
      } catch (error) {
        console.log(error);

        res.send({ error: error.message });
      }
    });

    // ============= learn mongoose end

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
