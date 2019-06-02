const express = require("express");
const next = require("next");
const routes = require("../routes");
const bodyParser = require("body-parser");

const bookRoutes = require("./routes/book");
const portfolioRoutes = require("./routes/portfolio");

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
    server.use(bodyParser.json());
    server.use("/api/v1/books", bookRoutes);
    server.use("/api/v1/portfolios", portfolioRoutes);

    server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
      return res.json(secretData);
      // прежде чем отсылать данные проверит авторизован юзер или нет
    });
    server.get(
      "/api/v1/onlysiteowner",
      authService.checkJWT,
      authService.checkRole("siteOwner"),
      (req, res) => {
        return res.json(secretData);
        // прежде чем отсылать данные проверит авторизован юзер или нет
      }
    );
    // ============= learn mongoose
    // server.post("/api/v1/books", (req, res) => {
    //   const bookData = req.body;

    //   const book = new Book(bookData);

    //   book.save((err, createdBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(createdBook);
    //   });
    // });

    // server.get("/api/v1/books", (req, res) => {
    //   Book.find((err, allBooks) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json(allBooks);
    //   });
    // });

    // server.patch("/api/v1/books/:id", (req, res) => {
    //   const bookId = req.params.id;
    //   const bookData = req.body;

    //   Book.findById(bookId, (err, foundBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }

    //     foundBook.set(bookData);
    //     foundBook.save((err, savedBook) => {
    //       if (err) {
    //         return res.status(422).send(err);
    //       }
    //       // console.log(foundBook, "foundBook");

    //       return res.json(foundBook);
    //     });
    //   });
    // });

    // server.delete("/api/v1/books/:id", (req, res) => {
    //   const bookId = req.params.id;

    //   Book.deleteOne({ _id: bookId }, (err, deletedBook) => {
    //     if (err) {
    //       return res.status(422).send(err);
    //     }
    //     return res.json({ status: "DELETED" });
    //   });
    // });

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
