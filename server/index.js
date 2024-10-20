//imports
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT || 8000;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/v1", require("./router/user.router.js"));

//defalut error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const suceess = err.suceess || false;
  const message = err.message || "something went wrong";
  const data = err.data || null;

  res.status(status).json({
    status,
    message,
    suceess,
    data,
  });
});

//connecting to database and listning on a port
connectDB()
  .then(() => {
    //checking for error
    app.on("error", (err) => {
      console.log(`Error: ${err}`);
      process.exit(1);
    });

    //listning to the server
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });
