import bodyParser = require("body-parser");
import express = require("express");
import session = require("express-session");
import userRouter from "./router/user";
import postRouter from "./router/post";
import contributorRouter from "./router/contributors";
const mongoose = require("mongoose");
import { MONGO_URI } from "./config/config";
import cors from "cors";

const MLAB_URI = process.env.MONGO_DATABASE_URL || MONGO_URI;
mongoose.connect(MLAB_URI, { useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.get("/api", (req, res) => {
  res.send("api test");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/contributors", contributorRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
