#!/usr/bin/env node

"use strict";

/**
 * Petit script qui permet de remplir rapidement (mais manuellement) la liste des fichiers à trouver.
 */
var fs = require("fs");
var readlineSync = require("readline-sync");
var instanceConfiguration = require("../public/js/instanceConfiguration");

function start() {

  if (!fs.existsSync("data_shared")){
    fs.mkdirSync("data_shared");
  }

  fs.readFile("data/mots.txt", "UTF8", function (erreur, contenu) {
    //console.log(erreur);
    const defaultInstance = instanceConfiguration.default;

    var dictionnaire = contenu.split("\n");
      var motTrouve = false;
      var mot = "";
      do {
        var position = Math.floor(Math.random() * dictionnaire.length);
        mot = dictionnaire[position];
        let motAnalyse = mot.normalize("NFD").replace(/\p{Diacritic}/gu, "");

        motTrouve = mot.length >= defaultInstance.tailleMin &&
          mot.length <= defaultInstance.tailleMax &&
          undefined === mot.match(/[^A-Za-z1-9_]/g)?.length;

      } while (!motTrouve);
      console.log(mot);

    fs.appendFile("data_shared/motsATrouve.txt", mot + "\n", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  });
}

start();
