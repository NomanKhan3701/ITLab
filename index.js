const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
};

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(PORT, async () => {
  try {
    // mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () =>
      console.log(`Server running at port ${PORT}`)
  } catch (e) {
    console.log(e);
  }
});
