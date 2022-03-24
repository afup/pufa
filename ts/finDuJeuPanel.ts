import PanelManager from "./panelManager";

export default class FinDuJeuPanel {
  private readonly _panelManager: PanelManager;

  public constructor(panelManager: PanelManager) {
    this._panelManager = panelManager;
  }

  public afficher(): void {
    let titre = "SUTOM continue";
    let contenu =
      "<p>" +
      "Suite à la prise de contact de France Télévisions, des discussions ont été entamées, et j'ai le plaisir de vous annoncer que le jeu restera en ligne !<br />" +
      "Merci à toutes et tous pour votre incroyable soutien et tous vos gentils messages :)<br />" +
      "<br />" +
      "Jonathan" +
      "</p>";

    this._panelManager.setContenu(titre, contenu);
    this._panelManager.setClasses(["regles-panel"]);
    this._panelManager.afficherPanel();
  }
}
