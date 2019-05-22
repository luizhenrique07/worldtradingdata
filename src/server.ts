import * as https from "https";
import { IncomingMessage, ClientRequest } from "http";
import { hostname } from "os";

class App {
  public options: https.RequestOptions;
  public agent: https.Agent;

  // Agent keepAlive true to decrease requests response time
  public constructor() {
    this.options = {};
    this.agent = new https.Agent({
      keepAlive: true
    });
  }

  public callAPI() {
    console.log(this.options);

    const req: ClientRequest = https.request(this.options, res => {
      var body: string;

      res.on("data", data => {
        body += data;
        process.stdout.write(data);
      });

      res.on("end", function() {
        console.log("Body :" + body);
      });
    });

    req.on("error", error => {
      console.log(error.message);
    });

    req.end();
  }

  public setOptions(method: string, hostname: string, path: string) {
    this.options = { method, hostname, path };
  }
}

var app = new App();
app.setOptions("GET", "google.com", "/tag");
app.callAPI();
