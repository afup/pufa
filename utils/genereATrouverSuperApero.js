#!/usr/bin/env node

"use strict";
/**
 * Petit script qui nettoie le fichier des mots à trouver pour le mettre dans le format attendu par le système
 */
var fs = require("fs");

let aujourdhui = new Date();

const termsSuperApero = {
  "super-apero-2022-question-1": "UCFIRST",
  "super-apero-2022-question-2": "FWRITE",
  "super-apero-2022-question-3": "ARRAY_SPLICE",
  "super-apero-2022-question-4": "OB_END_FLUSH",
  "super-apero-2022-question-5": "IMPLEMENTS",
  "super-apero-2022-question-6": "MB_SPLIT",
  "super-apero-2022-question-7": "PHPVERSION",
  "super-apero-2022-question-8": "STRNCASECMP",
  "super-apero-2022-question-9": "GC_ENABLED",
  "super-apero-2022-question-10": "FINALLY",
};


var increment = 1
if (process.argv.length > 2) {
  increment = parseInt(process.argv[2], 10);
}

for (const [idPartie, mot] of Object.entries(termsSuperApero)) {
  new Promise((resolve, reject) => {
    let datePartie = new Date(aujourdhui);
    datePartie.setDate(datePartie.getDate() + increment);

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
