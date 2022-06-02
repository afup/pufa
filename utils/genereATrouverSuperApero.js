#!/usr/bin/env node

"use strict";
/**
 * Petit script qui nettoie le fichier des mots à trouver pour le mettre dans le format attendu par le système
 */
var fs = require("fs");
var instanceConfiguration = require("../public/js/instanceConfiguration");

let aujourdhui = new Date();

const termsSuperApero = {
  "super-apero-2022-question-1": "POSIX_ACCESS",
  "super-apero-2022-question-2": "POSIX_GETCWD",
  "super-apero-2022-question-3": "POSIX_GETGID",
  "super-apero-2022-question-4": "POSIX_GETPID",
  "super-apero-2022-question-5": "POSIX_GETSID",
  "super-apero-2022-question-6": "POSIX_GETUID",
  "super-apero-2022-question-7": "POSIX_ISATTY",
  "super-apero-2022-question-8": "POSIX_MKFIFO",
  "super-apero-2022-question-9": "POSIX_SETGID",
  "super-apero-2022-question-10": "POSIX_SETUID",
};

for (const [idPartie, mot] of Object.entries(termsSuperApero)) {
  new Promise((resolve, reject) => {
    let datePartie = new Date(aujourdhui);
    datePartie.setDate(datePartie.getDate() + 1);

    let datePartieStr =
      datePartie.getFullYear().toString() +
      "-" +
      (datePartie.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      datePartie.getDate().toString().padStart(2, "0");

    return resolve(Buffer.from(idPartie + "-" + datePartieStr, "utf-8").toString("base64"));
  }).then((nomFichier) =>
    fs.access("public/mots/" + nomFichier + ".txt", fs.constants.F_OK, (err) => {
      if (err) {
        // Dans ce cas, le fichier n'existe pas
        fs.writeFile("public/mots/" + nomFichier + ".txt", mot, (err) => {
          if (err) console.error(err);
        });
      }
    })
  )
}
