const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://wnstjd:1234qwer@boilerplate.i1isq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      //   useCreatendex: true,
      //  useFindAndModify: false,
      //  useNewUrlParser: true,
      //  useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
