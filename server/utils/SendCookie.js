const SendCookie = (res, name, token, maxAge) => {
  res.cookie(name, token, {
    httpOnly: true,
    maxAge: maxAge * 24 * 60 * 60 * 1000,
  });
};

module.exports = SendCookie;
