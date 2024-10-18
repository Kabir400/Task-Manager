//this is custom error object for sending the staus code with default error object we can't relly send a status code the next middleware
class ApiError extends Error {
  constructor(status, message, suceess = false, data = null) {
    super(message);
    this.status = status;
    this.suceess = suceess;
    this.data = data;
  }
}

module.exports = ApiError;
