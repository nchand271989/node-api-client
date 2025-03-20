// src/httpResponseHandler.js

function handleHttpResponse(status, data) {
  switch (status) {
    case 200:
    case 201:
      return { success: true, message: "Request Successful", data };
    case 400:
      return { success: false, message: "Bad Request", data };
    case 401:
      return { success: false, message: "Unauthorized", data };
    case 403:
      return { success: false, message: "Forbidden", data };
    case 404:
      return { success: false, message: "Not Found", data };
    case 500:
      return { success: false, message: "Internal Server Error", data };
    case 502:
      return { success: false, message: "Bad Gateway", data };
    case 503:
      return { success: false, message: "Service Unavailable", data };
    case 504:
      return { success: false, message: "Gateway Timeout", data };
    default:
      return { success: false, message: `Unhandled Status: ${status}`, data };
  }
}

module.exports = { handleHttpResponse };
