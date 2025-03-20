# API Client

A simple, reliable, and retry-capable HTTP client built on top of `axios` with customizable retry logic, integrated logging, and standardized HTTP response handling.

---

## 📦 Features

- **Supports all HTTP methods** (`GET`, `POST`, `PUT`, `DELETE`, etc.)
- **Automatic retries** for both HTTP and network errors (configurable)
- **Exponential backoff** retry delay (optional)
- **Standardized HTTP response handling**
- **Integrated logging** via `custom-logger`

---

## 📂 Project Structure

```
/src
  ├── apiClient.js          # Main API request logic
  └── httpResponseHandler.js # Standardized response handler
```

---

## 🚀 Installation

1. Install dependencies:

```bash
npm install axios
```

2. Make sure your `custom-logger` package is installed and configured.

---

## 🔧 Usage

```javascript
const { apiRequest } = require("./src/apiClient");

(async () => {
  try {
    const result = await apiRequest({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      headers: { "Content-Type": "application/json" },
      maxAttempts: 3, // Optional: Default = 3
      retryDelay: 1000, // Optional: Default = 1000 ms
    });

    console.log("API Response:", result);
  } catch (error) {
    console.error("API Request Failed:", error.message);
  }
})();
```

---

## ⚙️ API

### `apiRequest({ method, url, data, headers, maxAttempts, retryDelay })`

| Parameter     | Type     | Description                                                                | Default      |
| ------------- | -------- | -------------------------------------------------------------------------- | ------------ |
| `method`      | `string` | HTTP method (`get`, `post`, `put`, etc.)                                   | `"get"`      |
| `url`         | `string` | Request URL                                                                | **Required** |
| `data`        | `object` | Request body data (for POST, PUT, etc.)                                    | `{}`         |
| `headers`     | `object` | HTTP headers                                                               | `{}`         |
| `maxAttempts` | `number` | Maximum retry attempts for failures                                        | `3`          |
| `retryDelay`  | `number` | Delay (in ms) between retries; increases per attempt (basic backoff logic) | `1000`       |

---

## 📄 HTTP Response Format

The `handleHttpResponse` function standardizes the output:

```javascript
{
  success: true | false,
  message: "Descriptive Message",
  data: <Response Data>
}
```

### Example:

```javascript
{
  success: false,
  message: "Not Found",
  data: { error: "Resource not found" }
}
```

---

## 🛠️ How Retries Work

- Retries occur on:
  - **HTTP errors** (e.g., `500`, `502`, `503`, `504`, etc.)
  - **Network errors** (`ENOTFOUND`, `ECONNREFUSED`, `ETIMEDOUT`, etc.)
- Exponential backoff is applied: delay increases with each retry.
- After exceeding `maxAttempts`, the error is thrown.

---

## 📑 Example: POST Request with Retry

```javascript
const payload = { title: "foo", body: "bar", userId: 1 };

const response = await apiRequest({
  method: "post",
  url: "https://jsonplaceholder.typicode.com/posts",
  data: payload,
  maxAttempts: 5,
  retryDelay: 2000,
});

console.log(response);
```

---

## 📝 Logging

The client uses `custom-logger`:

- `logInfo()` logs every request attempt and payload
- `logError()` logs HTTP or network errors
- Example logs:
  ```
  Attempt 1 - Url: https://example.com, Method: get, Headers: {...}
  Attempt 1 - Payload: {}
  ❌ Network/Error: getaddrinfo ENOTFOUND
  🚫 Request failed after 3 attempts
  ```

---

## 🔒 Timeout Behavior

- Timeout for each request is **10 seconds** by default.
- Timeout errors are treated as network errors and retried.

---

## 🚧 Roadmap

- Add configurable exponential backoff factor
- Add support for custom error handlers
- Add request/response interceptors
- Write unit tests & mock servers for test coverage

---
