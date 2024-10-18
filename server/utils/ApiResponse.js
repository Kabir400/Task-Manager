//this is a api response class for standardizing the response , so that we don't send response in different format to the client

class ApiResponse {
  constructor(status = 200, message = "success", suceess = true, data = null) {
    this.status = status;
    this.message = message;
    this.suceess = suceess;
    this.data = data;
  }
}

module.exports = ApiResponse;
