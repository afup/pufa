import Configuration from "./entites/configuration";
import PanelManager from "./panelManager";
import Sauvegardeur from "./sauvegardeur";

export default class ReglesPanel {
  private readonly _panelManager: PanelManager;
  private readonly _rulesBouton: HTMLElement;

  public constructor(panelManager: PanelManager) {
    this._panelManager = panelManager;
    this._rulesBouton = document.getElementById("configuration-regles-bouton") as HTMLElement;

    this._rulesBouton.addEventListener(
      "click",
      (() => {
        this.afficher();
      }).bind(this)
    );
  }

  public afficher(): void {
    let titre = "Règles";
    let contenu =
      "<p>" +
      "Vous avez six essais pour deviner le mot du jour, entre 6 et 9 lettres, commun à toutes et à tous.<br />" +
      "Vous ne pouvez proposer que des mots commençant par la même lettre que le mot recherché, et qui se trouvent être des fonctions de PHP ou des mots clefs réservés du langage.<br />" +
      "Le mot change chaque jour. Évitez donc les spoils et privilégiez le bouton de partage.<br />" +
      "</p>" +
      '<div class="grille">' +
      "<table>" +
      "<tr>" +
      '<td class="resultat bien-place">A</td>' +
      '<td class="resultat non-trouve">F</td>' +
      '<td class="resultat non-trouve">U</td>' +
      '<td class="resultat mal-place">P</td>' +
      "</tr>" +
      "</table>" +
      "Les lettres entourées d'un carré rouge sont bien placées,<br />" +
      "les lettres entourées d'un cercle bleu clair sont mal placées (mais présentes dans le mot).<br />" +
      "Les lettres qui restent sur fond bleu foncé ne sont pas dans le mot.<br />" +
      "</div>" +
      "<p>" +
      'En cas de soucis, vous pouvez contacter <a href="https://twitter.com/afup">@afup</a> sur twitter. −' +
      '<a target="_blank" href="https://github.com/afup/pufa">Page du projet</a><br />' +
      'Basé sur l\'excellent <a target="_blank" href="https://sutom.nocle.fr/">SUTOM</a>. Merci à <a href="https://twitter.com/Jonamaths">@Jonamaths</a> pour son travail sur ce projet.<br />' +
      'Gracieusement hébergé sur <a target="_blank" href="https://www.clever-cloud.com/">Clever Cloud</a>.<br />'+
      "</p>";

    this._panelManager.setContenu(titre, contenu);
    this._panelManager.setClasses(["regles-panel"]);
    this._panelManager.setCallbackFermeture(() => {
      Sauvegardeur.sauvegarderConfig({
        ...(Sauvegardeur.chargerConfig() ?? Configuration.Default),
        afficherRegles: false,
      });
    });
    this._panelManager.afficherPanel();
  }
}
