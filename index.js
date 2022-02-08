const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
mongoose
  .connect(config.mongoURL, {
    //   useCreatendex: true,
    //  useFindAndModify: false,
    //  useNewUrlParser: true,
    //  useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", (req, res) => {
  // 회원 가입 정보들을 데이터 베이스에 넣어주는 코드

  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({
        success: true,
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
