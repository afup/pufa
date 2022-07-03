#!/usr/bin/env node

"use strict";

/**
 * Petit script qui nettoie le fichier dictionnaire pour le mettre dans le format attendu par le système
 */
var fs = require("fs");
var instanceConfiguration = require("../public/js/instanceConfiguration");

function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

function ecrireDictionnaire(dictionnaire, suffixeNom) {
  console.log("Écriture du dictionnaire " + (suffixeNom !== undefined ? suffixeNom : "général"));
  let contenu = "export default class ListeMotsProposables {\n";
  contenu += "public static readonly Dictionnaire: Array<string> = [\n";
  contenu += dictionnaire
    .map(function (mot) {
      return '"' + mot.toUpperCase() + '",';
    })
    .join("\n");
  contenu += "\n];";
  contenu += "\n}";
  let nomFichier = "ts/mots/listeMotsProposables";
  if (suffixeNom !== undefined) nomFichier += suffixeNom;
  nomFichier += ".ts";
  fs.writeFile(nomFichier, contenu, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
}

function ecrireListeNettoyee(dictionnaire) {
  let contenu = dictionnaire
    .map(function (mot) {
      return mot.toUpperCase();
    })
    .join("\n");
  let nomFichier = "data/motsNettoyes.txt";
  fs.writeFile(nomFichier, contenu, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
}

fs.readFile("data/mots.txt", "UTF8", function (erreur, contenu) {
  const defaultInstance = instanceConfiguration.default;
  //console.log(erreur);
  var dictionnaire = contenu
    .split("\n")
    .filter((mot) => mot)
    .map((mot) =>
      mot
        .normalize("NFD")
        .replace(/æ/gu, "ae")
        .replace(/œ/gu, "oe")
        .replace(/\p{Diacritic}/gu, "")
    )
    .filter(
      (mot) => {
        return mot.length >= defaultInstance.tailleMin &&
          mot.length <= defaultInstance.tailleMax &&
          undefined === mot.match(/[^A-Za-z_]/g)?.length;
      }
    )
    .filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
  dictionnaire.sort((a, b) => {
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  console.log("Longueur du dictionnaire : " + dictionnaire.length);

  ecrireListeNettoyee(dictionnaire);
  ecrireDictionnaire(dictionnaire);

  let longueurs = range(defaultInstance.tailleMin, defaultInstance.tailleMax);
  let initialesPossibles = ["_", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V"];
  for (let longueur of longueurs) {
    for (let initiale of initialesPossibles) {
      let dicoFiltre = dictionnaire.filter((mot) => mot.length === longueur && mot.toUpperCase().startsWith(initiale));
      console.log("Longueur du dictionnaire : " + dicoFiltre.length);
      ecrireDictionnaire(dicoFiltre, "." + longueur + "." + initiale);
    }
  }
});
