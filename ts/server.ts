import express from "express";
import http from "http";
import fs from "fs";
import InstanceConfiguration from "./instanceConfiguration";

const app = express();
const port = parseInt(String(process.env.SUTOM_PORT), 10) || 4000;

(async () => {
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
