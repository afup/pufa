import express from "express";
import http from "http";
import fs from "fs";
import InstanceConfiguration from "./instanceConfiguration";
var interceptor = require('express-interceptor');

const app = express();
const port = parseInt(String(process.env.PUFA_PORT), 10) || 4000;

(async () => {
  var changeHeaderLabel = interceptor(function(request: express.Request, response: express.Response){
    return {
      isInterceptable: function() {
        return /text\/html/.test(response.get('Content-Type'));
      },
      intercept: function(body: any, send: Function) {
        const label = process.env.AFUP_GLOBAL_MENU_EVENT_LABEL || "Event";
        body = body.replace("[AFUP_GLOBAL_MENU_EVENT_LABEL]", label)
        send(body)
      }
    };
  })
  app.use(changeHeaderLabel);

  app.use("/", express.static("public/"));
  app.use("/js", express.static("public/js/"));
  app.use("/ts", express.static("ts/"));
  app.use("/mots", express.static("public/mots/"));
  app.use("/node_modules/requirejs/require.js", express.static("node_modules/requirejs/require.js"));

  app.use(express.json());
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Jeu démarré : http://localhost:${port}`);
  });
})();
