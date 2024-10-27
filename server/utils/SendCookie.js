const SendCookie = (res, name, token, maxAge) => {
  res.cookie(name, token, {
    httpOnly: true,
    maxAge: maxAge * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: false, //production true
  });
};

module.exports = SendCookie;
