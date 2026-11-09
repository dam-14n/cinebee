import https from "node:https";

function request(
  options: https.RequestOptions,
  body?: string,
): Promise<{ statusCode: number; response: Record<string, any> }> {
  let output = "";
  return new Promise((resolve, reject) => {
    const startTick = Date.now();
    const req = https.request(options, (res) => {
      console.log(
        `${options.host}: ${res.statusCode} in ${Date.now() - startTick} ms`,
      );
      res.on("data", (chunk) => {
        output += chunk;
      });

      res.on("end", () => {
        try {
          let obj = JSON.parse(output);
          resolve({ statusCode: res.statusCode!, response: obj });
        } catch (err) {
          console.error("Error parsing resonse:", err);
          reject(err);
        }
      });
    });
    req.on("error", (err) => {
      console.error(`Error sending request to ${options.host}: ${err}`);
      reject(err);
    });
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

function getRequest(
  options: https.RequestOptions,
): Promise<{ statusCode: number; response: object }> {
  let output = "";
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`${options.host}: ${res.statusCode}`);
      res.on("data", (chunk) => {
        output += chunk;
      });

      res.on("end", () => {
        try {
          let obj = JSON.parse(output);
          resolve({ statusCode: res.statusCode!, response: obj });
        } catch (err) {
          console.error("Error parsing resonse:", err);
          reject(err);
        }
      });
    });
    req.on("error", (err) => {
      console.error(`Error sending request to ${options.host}: ${err}`);
      reject(err);
    });

    req.end();
  });
}

export default request;
