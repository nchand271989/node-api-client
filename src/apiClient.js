const { logError, logInfo } = require("custom-logger");
const { handleHttpResponse } = require("./httpResponseHandler");
const axios = require("axios");

async function apiRequest({
  method = "get",
  url,
  data = {},
  headers = {},
  maxAttempts = 3,
  retryDelay = 1000,
}) {
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      logInfo(
        `Attempt ${attempt} - Url: ${url}, Method: ${method}, Headers: ${JSON.stringify(
          headers
        )}`
      );
      logInfo(`Attempt ${attempt} - Payload: ${JSON.stringify(data)}`);

      const response = await axios({
        method,
        url,
        data,
        headers,
        timeout: 10000,
      });

      // Successful Response
      return handleHttpResponse(response.status, response.data);
    } catch (error) {
      if (error.response) {
        // HTTP Error (status outside 2xx)
        logError(`❌ Error Status ${error.response.status} - ${error.message}`);
        handleHttpResponse(error.response.status, error.response.data);
      } else {
        // Network Error (timeout, DNS fail, etc.)
        logError(`❌ Network/Error: ${error.message}`);
      }

      if (attempt === maxAttempts) {
        logError(`🚫 Request failed after ${maxAttempts} attempts`);
        throw error;
      }

      attempt++;
      await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt)); // Optional exponential backoff
    }
  }
}

module.exports = { apiRequest };
