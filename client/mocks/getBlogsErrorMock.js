const error = {
  "message": "Request failed with status code 500",
  "response": {
    "data": "Cast to ObjectId failed for value \"123\" at path \"_user\" for model \"blog\"",
    "status": 500,
    "statusText": "Internal Server Error",
    "headers": {
      "vary": "Accept-Encoding",
      "connection": "close",
      "content-length": "72",
      "content-type": "text/html; charset=utf-8",
      "date": "Tue, 29 May 2018 19:54:17 GMT",
      "etag": "W/\"48-DorYLjQe+x5OW8YtG2xGKlXosRw\"",
      "x-powered-by": "Express"
    },
    "config": {
      "transformRequest": {},
      "transformResponse": {},
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "headers": {
        "Accept": "application/json, text/plain, */*"
      },
      "method": "get",
      "url": "/api/blogs"
    }
  },
  
  "request": {}
}

 export default error