const err = {
  config: {
    transformRequest: {},
    transformResponse: {},
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    },
    method: "post",
    url: "/api/blogs",
    data: '{"title":"e","body":"r"}'
  },
  request: {},
  response: {
    data: "blog validation failed: body: Path `body` is required.",
    status: 500,
    statusText: "Internal Server Error",
    headers: {
      vary: "Accept-Encoding",
      connection: "close",
      "content-length": "54",
      "content-type": "text/html; charset=utf-8",
      date: "Thu, 24 May 2018 00:34:29 GMT",
      etag: 'W/"36-A6/1WRTJqLLuV/Nj8nINLUZUbWQ"',
      "x-powered-by": "Express"
    },
    config: {
      transformRequest: {},
      transformResponse: {},
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8"
      },
      method: "post",
      url: "/api/blogs",
      data: '{"title":"e","body":"r"}'
    },
    request: {}
  }
}

export default err
