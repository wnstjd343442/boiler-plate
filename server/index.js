const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post("/api/users/login", (req, res) => {
  // email 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당되는 아이디가 없습니다.",
      });

    // 비밀번호 확인

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 로그인 성공 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //쿠키에 토큰 저장

        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});
app.post("/api/users/register", (req, res) => {
  // 회원 가입 정보들을 데이터 베이스에 넣어주는 코드

  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }),
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    };
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
