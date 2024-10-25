const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//hashing the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;

  next();
});

//comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generate access token (it is short lived token)
userSchema.methods.generateAccessToken = async function () {
  try {
    let token = jwt.sign(
      { _id: this._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "5d",
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};

//generate refresh token (it's a long lived token)
userSchema.methods.generateRefreshToken = async function () {
  try {
    let token = jwt.sign(
      { _id: this._id },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "15d",
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoose.model("user", userSchema);
