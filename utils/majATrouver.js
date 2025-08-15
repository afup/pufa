#!/usr/bin/env node

"use strict";
/**
 * Petit script qui nettoie le fichier des mots à trouver pour le mettre dans le format attendu par le système
 */
var fs = require("fs");
var instanceConfiguration = require("../public/js/instanceConfiguration");

let aujourdhui = new Date().getTime();
let origine = instanceConfiguration.default.dateOrigine.getTime();

let numeroGrille = Math.floor((aujourdhui - origine) / (24 * 3600 * 1000));

// avant on ajoutait juste 1 pour calculer le mot du lendemain
// mais dans le fichier motsATrouve.txt on a parfois des lignes vides
// celles-ci sont ignorées, et on se retrouve donc avec pas suffisament de mots pour calculer les mots nécéssaires
// on augmente un peu la limite de mots autorisés, afin d'éviter ce problème
// (idéalement il aurait fallu enlever le slice, mais ça aurait demandé plus de tests, ici on va déjà faire ce premier fix)
const maxFige = numeroGrille + 25; // inclus

fs.readFile("data_shared/motsATrouve.txt", "UTF8", function (erreur, contenu) {
  //console.log(erreur);
  var dictionnaire = contenu.split("\n");
  let motsFiges = dictionnaire.slice(0, maxFige + 1);

  motsFiges
    .map((mot) =>
      mot
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toUpperCase()
        .trim()
        .replace(/^\s+|\s+$/g, "")
    )
    .filter(function (el) {
      return el.length > 0;
    })
    .forEach((mot, numeroMot) =>
      new Promise((resolve, reject) => {
        let datePartie = new Date(instanceConfiguration.default.dateOrigine);
        datePartie.setDate(datePartie.getDate() + numeroMot);

        let datePartieStr =
          datePartie.getFullYear().toString() +
          "-" +
          (datePartie.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          datePartie.getDate().toString().padStart(2, "0");

        return resolve(Buffer.from(instanceConfiguration.default.idPartieParDefaut + "-" + datePartieStr, "utf-8").toString("base64"));
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
    );
});
