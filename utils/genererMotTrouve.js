#!/usr/bin/env node

"use strict";

/**
 * Petit script qui permet de remplir rapidement (mais manuellement) la liste des fichiers à trouver.
 */
var fs = require("fs");
var readlineSync = require("readline-sync");

function start() {
  fs.readFile("data/mots.txt", "UTF8", function (erreur, contenu) {
    //console.log(erreur);
    var dictionnaire = contenu.split("\n");
      var motTrouve = false;
      var mot = "";
      do {
        var position = Math.floor(Math.random() * dictionnaire.length);
        mot = dictionnaire[position];
        let motAnalyse = mot.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        motTrouve =
          !(motAnalyse[0] === motAnalyse[0].toUpperCase()) &&
          motAnalyse.length >= 6 &&
          motAnalyse.length <= 9 &&
          !motAnalyse.includes("!") &&
          !motAnalyse.includes(" ") &&
          !motAnalyse.includes("-") &&
          !mot.toUpperCase().startsWith("K") &&
          !mot.toUpperCase().startsWith("Q") &&
          !mot.toUpperCase().startsWith("W") &&
          !mot.toUpperCase().startsWith("X") &&
          !mot.toUpperCase().startsWith("Y") &&
          !mot.toUpperCase().startsWith("Z");
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
