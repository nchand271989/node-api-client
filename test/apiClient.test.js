// apiClient.test.js
const { logInfo, logError } = require("custom-logger");
const { apiRequest } = require("../src/apiClient");
const assert = require("assert");

async function runTests() {
  // Test 1: Successful GET request
  try {
    const response = await apiRequest({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      maxAttempts: 1,
    });
    assert.strictEqual(response.success, true);
    assert.strictEqual(response.message, "Request Successful");
    logInfo("✅ Test 1 Passed: Successful GET request");
  } catch (error) {
    logError("❌ Test 1 Failed:", error.message);
  }

  // Test 2: 404 Not Found
  try {
    await apiRequest({
      method: "get",
      url: "https://dummyjson.com/http/404/Not_FOUND",
      maxAttempts: 1,
    });
  } catch (error) {
    assert.strictEqual(error.response.status, 404);
    logError("✅ Test 2 Passed: 404 Not Found. Error: " + error);
  }

  // Test 3: Network Error
  try {
    await apiRequest({
      method: "get",
      url: "https://localhost:5000",
      maxAttempts: 1,
    });
  } catch (error) {
    assert.ok(
      error.code === "ENOTFOUND" || error.code === "ECONNREFUSED",
      `Unexpected error code: ${error.code}`
    );
    logError("✅ Test 3 Passed: Network Error");
  }
}

runTests();
