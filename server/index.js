//imports
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://taskmanager-client-bice.vercel.app",
  "https://taskmanager-client-git-master-kabir400s-projects.vercel.app",
  "https://taskmanager-client-kln1f4t8f-kabir400s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/api/v1", require("./router/task.router.js"));
app.use("/api/v1", require("./router/board.router.js"));

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
