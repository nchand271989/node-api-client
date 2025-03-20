// test/httpResponseHandler.test.js
const { logInfo, logError } = require("custom-logger");
const { handleHttpResponse } = require("../src/httpResponseHandler");
const assert = require("assert");

function runTests() {
  // Test 200 OK
  let response = handleHttpResponse(200, { key: "value" });
  assert.strictEqual(response.success, true);
  assert.strictEqual(response.message, "Request Successful");
  assert.deepStrictEqual(response.data, { key: "value" });

  // Test 201 Created
  response = handleHttpResponse(201, { created: true });
  assert.strictEqual(response.success, true);
  assert.strictEqual(response.message, "Request Successful");
  assert.deepStrictEqual(response.data, { created: true });

  // Test 400 Bad Request
  response = handleHttpResponse(400, { error: "Invalid data" });
  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, "Bad Request");
  assert.deepStrictEqual(response.data, { error: "Invalid data" });

  // Test 404 Not Found
  response = handleHttpResponse(404, null);
  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, "Not Found");
  assert.strictEqual(response.data, null);

  // Test 500 Internal Server Error
  response = handleHttpResponse(500, {});
  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, "Internal Server Error");

  // Test Unhandled Status
  response = handleHttpResponse(418, { teapot: true }); // HTTP 418 - I'm a teapot
  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, "Unhandled Status: 418");
  assert.deepStrictEqual(response.data, { teapot: true });

  logInfo("✅ All tests passed!");
}

runTests();
